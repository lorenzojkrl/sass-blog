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

  if (!userProfile?.availableTokens) {
    // user is authorized but he doesn't have the required permissions to process the request
    // They don't have token
    res.status(403);
    return;
  }

  const config = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(config);
  const { topic, keywords } = req.body;
  const allowedHTMLTags = "p, h1, h2, h3, h4, h5, h6, strong, li, ol, ul, i";

  // const response = await openai.createCompletion({
  //   model: 'text-davinci-003',
  //   temperature: 0.2,
  //   max_tokens: 1600,
  //   prompt: `
  //     Write a long and detailed SEO-friendly blog post about ${topic}, that target the following comma-separated keywords ${keywords}.
  //     The content should be formatted in SEO-friendly HTML.
  //     The response must also include appropriate HTML title and meta description content.
  //     The return format must be stringified JSON in the following format:
  //     {
  //       "postContent": post content goes here,
  //       "title": title goes here,
  //       "metaDescription": meta description goes here
  //     }
  //     `
  // })

  const postContentResponse = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    temperature: 0.3,
    messages: [
      {
        role: "system",
        content: `You are a blog post generator.`,
      },
      {
        role: "user",
        content: `Write a long and detailed SEO-friendly blog post about ${topic}, that target the following comma-separated keywords ${keywords}. 
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
        content: "Generate appropriate title tag text for the above blog post",
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

  console.log(postContent);
  console.log(title);
  console.log(metaDescription);

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

  // res.status(200).json({ post: JSON.parse(response.data.choices[0].text) })
  res.status(200).json({ post: { postContent, title, metaDescription } });
});
