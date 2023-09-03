import { getSession, withApiAuthRequired } from "@auth0/nextjs-auth0";
import { Configuration, OpenAIApi } from "openai";
import clientPromise from "../../lib/mongodb";
import getT from "next-translate/getT";

// withApiAuthRequired ensures user is authenticated
export default withApiAuthRequired(async function handler(req, res) {
  const { user } = await getSession(req, res);
  const client = await clientPromise;
  const db = client.db("SassBlog");
  // findOne returns a single document from the users collection
  const userProfile = await db.collection("users").findOne({
    auth0Id: user.sub,
  });
  const { topic, keywords, length, locale = "en" } = req.body;
  const config = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(config);

  const t = await getT(locale, "prompts");

  if (!userProfile?.availableTokens) {
    // user is authorized but he doesn't have the required permissions to process the request
    // They don't have token
    res.status(403);
    return;
  }

  if (typeof length !== "number" || length > 2000) {
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
        content: t("newsletterWriter"),
      },
      {
        role: "user",
        content: t("writeNewsletter", { topic, length, keywords }),
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
        content: t("newsletterWriter"),
      },
      {
        role: "assistant",
        content: `${newsLetter}`,
      },
      {
        role: "user",
        content: t("writeNewsletterTitle"),
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
