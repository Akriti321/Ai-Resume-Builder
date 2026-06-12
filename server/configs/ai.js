import OpenAI from "openai";

const apiKey = process.env.OPENAI_API_KEY ? process.env.OPENAI_API_KEY.replace(/['"]/g, '').trim() : '';
const baseURL = process.env.OPENAI_BASE_URL ? process.env.OPENAI_BASE_URL.replace(/['"]/g, '').trim() : undefined;
console.log("API KEY EXISTS:", !!apiKey);
console.log("BASE URL:", baseURL);
console.log("MODEL:", process.env.OPENAI_MODEL);
console.log("API KEY:", apiKey?.slice(0,10));

const ai = new OpenAI({
  apiKey: apiKey,
  baseURL: baseURL,
});

export default ai;