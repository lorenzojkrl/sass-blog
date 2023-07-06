import { Configuration, OpenAIApi } from "openai"

export default async function handler(req, res) {
  const config = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  })
  const openai = new OpenAIApi(config)

  const topic = "Top 10 tips for giraffa owners"
  const keywords = "first-time giraffa owner, competion giraffas"

  const response = await openai.createCompletion({
    model: 'text-davinci-003',
    temperature: 0.2,
    max_tokens: 1600,
    prompt: `
      Write a long and detailed SEO-friendly blog post about ${topic}, that target the following comma-separated keywords ${keywords}. 
      The content should be formatted in SEO-friendly HTML.
      The response must also include appropriate HTML title and meta description content.
      The return format must be stringified JSON in the following format: 
      {
        "postContent": post content goes here,
        "title": title goes here,
        "metaDescription": meta description goes here
      } 
      `
  })

  console.log(response);
  res.status(200).json({ post: JSON.parse(response.data.choices[0].text) })
}
