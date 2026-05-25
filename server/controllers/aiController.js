import Resume from "../models/Resume.js";
import ai from "../configs/ai.js";

// Enhance Professional Summary
export const enhanceProfessionalSummary = async (req, res) => {

  try {

    const { userContent } = req.body;

    if (!userContent) {

      return res.status(400).json({
        message: "Missing required fields",
      });

    }

    const response =
      await ai.chat.completions.create({

        model: process.env.OPENAI_MODEL,

        messages: [
          {
            role: "system",
            content: `You are an expert in resume writing.
Your task is to enhance the professional summary of a resume.
The summary should be 1-2 sentences while highlighting key skills,
experience, and career objectives.
Make it compelling and ATS-friendly.
Only return the enhanced summary text and nothing else.`,
          },

          {
            role: "user",
            content: userContent,
          },
        ],

      });

    const enhancedContent =
      response.choices[0].message.content;

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

    const response =
      await ai.chat.completions.create({

        model: process.env.OPENAI_MODEL,

        messages: [
          {
            role: "system",
            content: `You are an expert in resume writing.
Your task is to enhance the job description of a resume.
Make it compelling and ATS-friendly.
Only return the text and nothing else.`,
          },

          {
            role: "user",
            content: userContent,
          },
        ],

      });

    const enhancedContent =
      response.choices[0].message.content;

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

        model: process.env.OPENAI_MODEL,

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