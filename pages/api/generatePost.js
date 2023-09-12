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
  const { topic, keywords, length, locale = "en", style } = req.body;
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

  const allowedHTMLTags = "p, h1, h2, h3, h4, h5, h6, strong, li, ol, ul, i";

  const content = {
    system: {
      en: "You are a SEO content writer.",
      es: "Eres un redactor de contenido SEO.",
      it: "Sei un redattore di contenuti SEO.",
    },
    user: {
      en: `Write a long and detailed ${style} SEO-friendly blog post about ${topic}. 
      The blog post should contain about ${length} words.
      The blog post should target the following comma-separated keywords ${keywords}. 
      The content should be ${style} and formatted in SEO-friendly HTML.
      It should be limited to the following comma-separated HTML tags: ${allowedHTMLTags}
      The response must also include appropriate HTML title and meta description content.`,
      es: `Escribe una entrada de blog SEO amigable ${style} larga y detallada sobre ${topic}.
      La entrada de blog debe contener aproximadamente ${length} palabras.
      La entrada de blog debe dirigirse a las siguientes palabras clave separadas por comas ${keywords}.
      El contenido debe ser ${style} y estar formateado en HTML amigable para SEO.
      Debe estar limitado a las siguientes etiquetas HTML separadas por comas: ${allowedHTMLTags}
      La respuesta también debe incluir contenido de título HTML y descripción meta apropiados.`,
      it: `Scrivi un lungo e dettagliato articolo di blog SEO-friendly ${style} su ${topic}.
      L'articolo di blog deve contenere circa ${length} parole.
      L'articolo di blog deve usare le seguenti parole chiave separate da virgole ${keywords}.
      Il contenuto dovrebbe essere ${style} e formattato in HTML per SEO.
      Dovrebbe essere limitato ai seguenti tag HTML separati da virgole: ${allowedHTMLTags}
      La risposta deve anche includere un titolo HTML e una descrizione meta appropriati.`,
    },
  };

  const titleContent = {
    system: {
      en: "You are a SEO content writer.",
      es: "Eres un redactor de contenido SEO.",
      it: "Sei un redattore di contenuti SEO.",
    },
    user: {
      en: "Generate an appropriate title for the above blog post",
      es: "Crear un título apropiado para la entrada de blog anterior",
      it: "Generare un titolo appropriato per il post del blog di cui sopra",
    },
  };

  const slugContent = {
    system: {
      en: `You are a URL slug generator. 
      A URL slug is a composed of multiple dash-separated words.
      A URL slug must include the words from a keyword.
      `,
      es: `Eres un generador de URL simplificadas.
      Una URL simplificada se compone de varias palabras separadas por guiones.
      Una URL simplificada debe incluir las palabras clave.`,
      it: `Sei un generatore di slug URL.
      Uno slug URL è composto da diverse parole separate da trattini.
      Uno slug URL deve includere le parole chiave.`,
    },
    assistant: {
      en: `Title: ${title}`,
      es: `Titulo: ${title}`,
      it: `Titolo: ${title}`,
    },
    user: {
      en: `Generate an appropriate URL slug given the above title.
      The URL slug must include the following keyword ${keywords[0]}.
      Keep the URL slug short.`,
      es: `Genera una URL simplificada apropiada dado el título anterior.
      La URL simplificada debe incluir la siguiente palabra clave ${keywords[0]}.
      Mantén la URL simplificada corta.`,
      it: `Genera uno slug URL appropriato dato il titolo sopra indicato.
      Lo slug URL deve includere la seguente parola chiave ${keywords[0]}.
      Mantieni lo slug URL corto.`,
    },
  };

  const metaContent = {
    system: {
      en: "You are a SEO content writer.",
      es: "Eres un redactor de contenido SEO.",
      it: "Sei un redattore di contenuti SEO.",
    },
    user: {
      en: "Generate SEO friendly meta description content for the above blog post",
      es: "Generar contenido de meta descripción SEO amigable para la entrada de blog anterior",
      it: "Generare contenuti di meta descrizione SEO friendly per il post del blog di cui sopra.",
    },
  };

  const postContentResponse = await openai.createChatCompletion({
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

  const postContent =
    postContentResponse.data.choices[0]?.message?.content || "";

  const titleResponse = await openai.createChatCompletion({
    model: "gpt-4",
    temperature: 0.3,
    messages: [
      {
        role: "system",
        content: titleContent.system[locale],
      },
      {
        role: "assistant",
        content: `${postContent}`,
      },
      {
        role: "user",
        content: titleContent.user[locale],
      },
    ],
  });

  const title = titleResponse.data.choices[0]?.message?.content || "";

  const slugResponse = await openai.createChatCompletion({
    model: "gpt-4",
    temperature: 0.3,
    messages: [
      {
        role: "system",
        content: slugContent.system[locale],
      },
      {
        role: "assistant",
        content: slugContent.assistant[locale],
      },
      {
        role: "user",
        content: slugContent.user[locale],
      },
    ],
  });
  const slug = slugResponse.data.choices[0]?.message?.content || "";

  const metaDescriptionResponse = await openai.createChatCompletion({
    model: "gpt-4",
    temperature: 0.3,
    messages: [
      {
        role: "system",
        content: metaContent.system[locale],
      },
      {
        role: "assistant",
        content: `${postContent}`,
      },
      {
        role: "user",
        content: metaContent.user[locale],
      },
    ],
  });

  const metaDescription =
    metaDescriptionResponse.data.choices[0]?.message?.content || "";

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
    slug,
    metaDescription,
    userId: userProfile._id,
    created: new Date(),
  });

  res.status(200).json({ postId: post.insertedId });
});
