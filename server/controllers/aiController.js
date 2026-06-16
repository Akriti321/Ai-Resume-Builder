import Resume from "../models/Resume.js";
import ai, { callAIWithRetry } from "../configs/ai.js";

const aiModel = process.env.OPENAI_MODEL ? process.env.OPENAI_MODEL.replace(/['"]/g, '').trim() : 'gemini-2.5-flash';

const sanitizeAIContent = (text) => {
  if (!text) return '';
  return text
    .replace(/\*\*/g, '') // Strip markdown bold double-asterisks
    .replace(/__/g, '')   // Strip markdown bold double-underscores
    .replace(/^\s*\*\s*/gm, '') // Strip leading bullet asterisks from start of lines
    .trim();
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

// Enhance Project Description (with bullet point preservation)
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
        content: `You are an expert in resume writing and ATS optimization.
Your task is to enhance resume project bullet points while preserving their structure.
CRITICAL RULES:
1. Keep the exact same number of bullet points as the input.
2. Never merge bullet points.
3. Never create additional bullet points.
4. Return exactly one enhanced bullet for each input bullet, in the same order.
5. Make each bullet ATS-friendly, impact-oriented, and concise (under 25 words).
6. Use strong action verbs and technical language.
7. Return ONLY the bullet points, one per line, without any numbering or markers (no -, •, *).
8. Preserve the technical specificity and achievements mentioned in the original bullets.`,
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