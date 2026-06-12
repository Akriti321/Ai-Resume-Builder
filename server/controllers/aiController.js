import Resume from "../models/Resume.js";
import ai from "../configs/ai.js";

const aiModel = process.env.OPENAI_MODEL ? process.env.OPENAI_MODEL.replace(/['"]/g, '').trim() : 'gemini-2.5-flash';

const sanitizeAIContent = (text) => {
  if (!text) return '';
  return text
    .replace(/\*\*/g, '') // Strip markdown bold double-asterisks
    .replace(/__/g, '')   // Strip markdown bold double-underscores
    .replace(/^\s*\*\s*/gm, '') // Strip leading bullet asterisks from start of lines
    .trim();
};

let lastWorkingModel = null;

const callAIWithRetry = async (messages, retries = 3, delay = 1000) => {
  const configuredModel = process.env.OPENAI_MODEL ? process.env.OPENAI_MODEL.replace(/['"]/g, '').trim() : 'gemini-2.5-flash';
  const models = [
    configuredModel,
    'gemini-2.0-flash',
    'gemini-1.5-flash',
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

// Enhance Professional Summary
export const enhanceProfessionalSummary = async (req, res) => {

  try {

    const { userContent } = req.body;

    if (!userContent) {

      return res.status(400).json({
        message: "Missing required fields",
      });

    }

    const response = await callAIWithRetry([
      {
        role: "system",
        content: `You are an expert in resume writing.
Your task is to enhance the professional summary of a resume.
The summary should be highly concise, strictly 1-2 sentences, punchy, and direct, highlighting key skills, experience, and career objectives.
Make it compelling and ATS-friendly. Avoid overly verbose or excessively long descriptions.
Only return the enhanced summary text and nothing else.`,
      },
      {
        role: "user",
        content: userContent,
      },
    ]);

    const enhancedContent = sanitizeAIContent(
      response.choices[0].message.content
    );

    return res.status(200).json({
      enhancedContent,
    });

  } catch (error) {

    console.error(
      "Error enhancing professional summary:",
      error
    );

    return res.status(400).json({
      message: error.message,
    });

  }

};

// Enhance Job Description
export const enhanceJobDescription = async (req, res) => {

  try {

    const { userContent } = req.body;

    if (!userContent) {

      return res.status(400).json({
        message: "Missing required fields",
      });

    }

    const response = await callAIWithRetry([
      {
        role: "system",
        content: `You are an expert in resume writing.
Your task is to enhance the job description of a resume.
Make it concise, compelling, direct, and ATS-friendly.
Rewrite the input into 2-3 high-impact, punchy statements focusing on results and action verbs. Avoid overly verbose descriptions or excessive detail.
Only return the text and nothing else.`,
      },
      {
        role: "user",
        content: userContent,
      },
    ]);

    const enhancedContent = sanitizeAIContent(
      response.choices[0].message.content
    );

    return res.status(200).json({
      enhancedContent,
    });

  } catch (error) {

    console.error(
      "Error enhancing job description:",
      error
    );

    return res.status(500).json({
      message: error.message,
    });

  }

};

// Enhance Project Description
export const enhanceProjectDescription = async (req, res) => {
  try {
    const { userContent } = req.body;
    if (!userContent) {
      return res.status(400).json({
        message: "Missing required fields",
      });
    }

    const response = await callAIWithRetry([
      {
        role: "system",
        content: `You are an expert in resume writing.
Your task is to enhance the project description of a resume.
Make it concise, compelling, technical, and ATS-friendly.
Rewrite the input into 1-2 high-impact, punchy statements focusing on key technical tasks and results, avoiding excessive detail or over-elaboration.
Only return the enhanced project description text and nothing else.`,
      },
      {
        role: "user",
        content: userContent,
      },
    ]);

    const enhancedContent = sanitizeAIContent(response.choices[0].message.content);
    return res.status(200).json({
      enhancedContent,
    });
  } catch (error) {
    console.error("Error enhancing project description:", error);
    return res.status(500).json({
      message: error.message,
    });
  }
};

// Upload Resume
// POST: /api/ai/upload-resume

export const uploadResume = async (req, res) => {

  try {

    const { resumeText, title } = req.body;

    const userId = req.userId;

    if (!resumeText) {

      return res.status(400).json({
        message: "Missing required fields",
      });

    }

    const systemPrompt =
      "You are an expert AI Agent to extract data from resume.";

    const userPrompt = `
Extract data from the following resume and return ONLY valid JSON.

Resume:
${resumeText}
`;

    const response =
      await ai.chat.completions.create({

        model: aiModel,

        messages: [
          {
            role: "system",
            content: systemPrompt,
          },

          {
            role: "user",
            content: userPrompt,
          },
        ],

        response_format: {
          type: "json_object"
        }

      });

    const extractedData =
      response.choices[0].message.content;

    const parsedData =
      JSON.parse(extractedData);

    const newResume =
      await Resume.create({

        userId,
        title,
        ...parsedData

      });

    res.status(200).json({

      message:
        "Resume uploaded successfully",

      resume: newResume,

    });

  } catch (error) {

    console.error(
      "Error extracting resume data:",
      error
    );

    return res.status(400).json({
      message: error.message,
    });

  }

};