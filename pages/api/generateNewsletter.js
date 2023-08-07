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
  const { topic, keywords, charsNumber } = req.body;
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

  if (typeof charsNumber !== "number" || charsNumber > 2000) {
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

  const newsLetterResponse = await openai.createChatCompletion({
    model: "gpt-4",
    temperature: 0.3,
    messages: [
      {
        role: "system",
        content: `You are a newsletters writer.`,
      },
      {
        role: "user",
        content: `Write a SEO-friendly newsletter about ${topic}. 
        Keep the newsletter about ${charsNumber} characters long.
        The newsletter should include the following comma-separated keywords ${keywords}. `,
      },
    ],
  });

  const newsLetter = newsLetterResponse.data.choices[0]?.message?.content || "";

  const titleResponse = await openai.createChatCompletion({
    model: "gpt-4",
    temperature: 0.3,
    messages: [
      {
        role: "system",
        content: `You are a newsletters writer.`,
      },
      {
        role: "assistant",
        content: `${newsLetter}`,
      },
      {
        role: "user",
        content: "Generate an appropriate title for the above newsLetter",
      },
    ],
  });

  const title = titleResponse.data.choices[0]?.message?.content || "";

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
    postContent: newsLetter,
    title,
    slug: "",
    metaDescription: "",
    userId: userProfile._id,
    created: new Date(),
  });

  res.status(200).json({ postId: post.insertedId });
});
