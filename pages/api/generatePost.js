import { getSession, withApiAuthRequired } from "@auth0/nextjs-auth0";
import { Configuration, OpenAIApi } from "openai";
import clientPromise from "../../lib/mongodb";

// withApiAuthRequired ensures user is authenticated
export default withApiAuthRequired(async function handler(req, res) {
  const { user } = await getSession(req, res);
  const client = await clientPromise;
  const db = client.db("SassBlog");
  // findOne returns a single document from the users collection
  const userProfile = await db.collection("users").findOne({
    auth0Id: user.sub,
  });
  const { topic, keywords, wordsNumber } = req.body;
  const config = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(config);

  if (!userProfile?.availableTokens) {
    // user is authorized but he doesn't have the required permissions to process the request
    // They don't have token
    res.status(403);
    return;
  }

  if (
    typeof wordsNumber !== "number" ||
    wordsNumber < 200 ||
    wordsNumber > 2000
  ) {
    console.log("Wrong");
    res.status(422); //Unprocessable entity because we want a topic and keywords
    return {
      redirect: {
        destination: "/post/new",
        permanent: false,
      },
    };
  }

  if (!topic || !keywords) {
    res.status(422); //Unprocessable entity because we want a topic and keywords
    return;
  }

  if (topic.length > 150 || keywords.length > 80) {
    res.status(422);
    return;
  }

  const allowedHTMLTags = "p, h1, h2, h3, h4, h5, h6, strong, li, ol, ul, i";

  const postContentResponse = await openai.createChatCompletion({
    model: "gpt-4",
    temperature: 0.3,
    messages: [
      {
        role: "system",
        content: `You are a blog post generator.`,
      },
      {
        role: "user",
        content: `Write a long and detailed SEO-friendly blog post about ${topic}. 
        The blog post should contain about ${wordsNumber} words.
        The blog post should target the following comma-separated keywords ${keywords}. 
        The content should be formatted in SEO-friendly HTML.
        It should be limited to the following comma-separated HTML tags: ${allowedHTMLTags}
        The response must also include appropriate HTML title and meta description content.`,
      },
    ],
  });

  const postContent =
    postContentResponse.data.choices[0]?.message?.content || "";

  const titleResponse = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    temperature: 0.3,
    messages: [
      {
        role: "system",
        content: `You are a blog post generator.`,
      },
      {
        role: "assistant",
        content: `${postContent}`,
      },
      {
        role: "user",
        content: "Generate an appropriate title for the above blog post",
      },
    ],
  });

  const metaDescriptionResponse = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    temperature: 0.3,
    messages: [
      {
        role: "system",
        content: `You are a blog post generator.`,
      },
      {
        role: "assistant",
        content: `${postContent}`,
      },
      {
        role: "user",
        content:
          "Generate SEO friendly meta description content for the above blog post",
      },
    ],
  });

  const title = titleResponse.data.choices[0]?.message?.content || "";
  const metaDescription =
    metaDescriptionResponse.data.choices[0]?.message?.content || "";

  // console.log(postContent);
  // console.log(title);
  // console.log(metaDescription);

  await db.collection("users").updateOne(
    {
      auth0Id: user.sub,
    },
    {
      $inc: {
        availableTokens: -1,
      },
    }
  );

  const post = await db.collection("posts").insertOne({
    topic,
    keywords,
    postContent,
    title,
    metaDescription,
    userId: userProfile._id,
    created: new Date(),
  });

  // console.log("post", post);

  res.status(200).json({ postId: post.insertedId });
});
