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

let lastWorkingModel = null;

export const callAIWithRetry = async (messages, options = {}, retries = 3, delay = 1000) => {
  const configuredModel = process.env.OPENAI_MODEL ? process.env.OPENAI_MODEL.replace(/['"]/g, '').trim() : 'gemini-2.5-flash';
  const models = [
    configuredModel,
    'gemini-2.0-flash',
    'gemini-flash-latest'
  ];

  // Prioritize the last known working model to bypass rate-limited models immediately
  if (lastWorkingModel && models.includes(lastWorkingModel)) {
    const idx = models.indexOf(lastWorkingModel);
    models.splice(idx, 1);
    models.unshift(lastWorkingModel);
  }

  let lastError;
  for (const model of models) {
    console.log(`Attempting completion with model: ${model}`);
    let modelDelay = delay;
    for (let i = 0; i < retries; i++) {
      try {
        const response = await ai.chat.completions.create({
          model: model,
          messages: messages,
          ...options,
        });
        console.log(`Successfully generated content using model: ${model}`);
        lastWorkingModel = model; // Cache the successful model
        return response;
      } catch (error) {
        lastError = error;
        const status = error.status || (error.response && error.response.status);
        
        if (status === 429) {
          console.warn(`Rate limit (429) hit on model ${model}. Falling back to next model immediately...`);
          break; // Break the retry loop for this model, fall back to next model in the outer loop
        }

        const isTransient = status === 503 || status === 502 || status === 504 || status === 500;
        if (isTransient && i < retries - 1) {
          console.warn(`Transient error ${status || error.message} on model ${model}. Retrying in ${modelDelay}ms... (Attempt ${i + 1}/${retries})`);
          await new Promise(resolve => setTimeout(resolve, modelDelay));
          modelDelay *= 2; // Exponential backoff
          continue;
        }
        break; // Non-transient error, try next model
      }
    }
  }
  throw lastError;
};

export default ai;