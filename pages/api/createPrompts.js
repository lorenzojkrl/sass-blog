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

  const { topic, keywords, length, locale = "en", style } = req.body;
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  if (!userProfile?.availableTokens) {
    // user is authorized but he doesn't have the required permissions to process the request
    // They don't have token
    res.status(403);
    return;
  }

  if (typeof length !== "number" || length < 200 || length > 2000) {
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

  console.log(topic, keywords, length, locale, style);

  const content = {
    system: {
      en: "You are a SEO content writer.",
      es: "Eres un redactor de contenido SEO.",
      it: "Sei un redattore di contenuti SEO.",
    },
    user: {
      en: `Given this topic: ${topic}. Create three subtitles to expand on it. 
        Answer by filling the following JSON {0: "", 1:"", 2:""}`,
      es: `Given this topic: ${topic}. Create three subtitles to expand on it`,
      it: `Given this topic: ${topic}. Create three subtitles to expand on it`,
    },
  };

  console.log("Creating jsonPrompts");

  const contentResponse = await openai.chat.completions.create({
    model: "gpt-4",
    temperature: 0.3,
    messages: [
      {
        role: "system",
        content: content.system[locale],
      },
      {
        role: "user",
        content: content.user[locale],
      },
    ],
  });

  console.log(contentResponse.choices[0]);
  let jsonPrompts = contentResponse.choices[0]?.message?.content || "";
  jsonPrompts = jsonPrompts.slice(1, jsonPrompts.length - 1);
  res.status(200).json({ jsonPrompts });

  // res.status(200).json({ postId: post.insertedId });
});
