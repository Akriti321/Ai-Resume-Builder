import OpenAI from "openai";

const apiKey = process.env.OPENAI_API_KEY ? process.env.OPENAI_API_KEY.replace(/['"]/g, '').trim() : '';
const baseURL = process.env.OPENAI_BASE_URL ? process.env.OPENAI_BASE_URL.replace(/['"]/g, '').trim() : undefined;

const ai = new OpenAI({
  apiKey: apiKey,
  baseURL: baseURL,
});

export default ai;