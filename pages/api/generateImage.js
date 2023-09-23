import { getSession, withApiAuthRequired } from "@auth0/nextjs-auth0";
import OpenAI from "openai";
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
  const { topic, keywords, locale = "en", style } = req.body;
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  if (!userProfile?.availableTokens) {
    // user is authorized but he doesn't have the required permissions to process the request
    // They don't have token
    res.status(403);
    return;
  }

  if (!topic || !keywords) {
    res.status(422); //Unprocessable entity because we want a topic and keywords
    return;
  }

  if (topic.length > 150 || keywords.length > 80) {
    res.status(422);
    return;
  }

  const imagePrompt = {
    en: `Create an image that fits the following context: ${topic}. 
        The image can have a ${style} style. Do not include words. Do not include text`,
    es: "Eres un redactor de contenido SEO.",
    it: "Sei un redattore di contenuti SEO.",
  };

  const image = await openai.images.generate({
    prompt: imagePrompt[locale],
    size: "512x512",
  });

  console.log(image.data[0]);
  res.status(200).json({ imageUrl: image.data[0].url });

  // const post = await db.collection("posts").insertOne({
  //   topic,
  //   keywords,
  //   postContent,
  //   title,
  //   slug,
  //   metaDescription,
  //   userId: userProfile._id,
  //   created: new Date(),
  // });

  // res.status(200).json({ postId: post.insertedId });
});
