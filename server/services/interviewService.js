import ai from "../configs/ai.js";

const aiModel =
  process.env.OPENAI_MODEL?.replace(/['"]/g, "").trim() ||
  "gemini-2.5-flash";

export const generateQuestions = async (
  resumeText,
  jobDescription
) => {

  const response =
    await ai.chat.completions.create({

      model: aiModel,
      temperature: 0,

      messages: [
        {
          role: "system",
          content: `
You are a senior software engineering interviewer.

Generate interview questions using BOTH:

1. Candidate Resume
2. Job Description

Rules:

- If a JD is provided, prioritize skills, technologies, and responsibilities from the JD.
- Use the resume to personalize questions around projects and experience.
- If a skill appears in the JD but not the resume, generate learning-oriented questions.
- Questions should resemble real internship and placement interviews.

Return ONLY valid JSON.

Format:

{
  "technicalQuestions": [],
  "projectQuestions": [],
  "hrQuestions": []
}

Generate:

- 5 Technical Questions
- 5 Project Questions
- 5 HR Questions

`
        },
        {
          role: "user",
          content: `
RESUME:
${resumeText}

JOB DESCRIPTION:
${jobDescription || "Not Provided"}
`
        }
      ],

      response_format: {
        type: "json_object"
      }

    });

  return JSON.parse(
    response.choices[0].message.content
  );

};