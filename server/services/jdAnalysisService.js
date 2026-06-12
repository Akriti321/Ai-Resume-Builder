import ai from "../configs/ai.js";

const aiModel =
  process.env.OPENAI_MODEL?.replace(/['"]/g, "").trim() ||
  "gemini-2.5-flash";

export const analyzeResumeAgainstJD = async (
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
You are an ATS skill extraction and career guidance assistant.

Compare the resume with the job description.

Use simple language suitable for college students.

Rules:

- Consider abbreviations and full forms equivalent.
- Do not encourage lying or keyword stuffing.
- Only recommend skills genuinely missing.
- Keep all insights short.
- Do not estimate ATS scores.
- Do not estimate match percentages.
- Do not generate jobFitCategory.

Treat these as equivalent:

DBMS = Database Management Systems
OOP = Object Oriented Programming
OOPS = Object Oriented Programming
CN = Computer Networks
OS = Operating Systems
JS = JavaScript

Return ONLY valid JSON.

JSON Format:

{
  "matchedSkills": [],
  "missingSkills": [],
  "strengths": [],
  "suggestions": [],
  "careerInsights": [],
  "learningRoadmap": [
    {
      "week": 1,
      "topic": ""
    }
  ],
  "careerReadiness": {
    "overall": 0,
    "technicalSkills": 0,
    "projects": 0,
    "resumeQuality": 0,
    "interviewReadiness": 0
  },
  "improvementAreas": [],
  "nextSteps": [
    {
      "skill": "",
      "priority": "High",
      "reason": ""
    }
  ]
}

Requirements:

1. Identify matchedSkills.
2. Identify missingSkills.
3. Give exactly 3 strengths.
4. Give exactly 3 suggestions.
5. Give exactly 3 careerInsights.

Career insights:
- Under 10 words.
- Example:
  - Strong MERN foundation.
  - Need cloud experience.
  - Good project portfolio.

6. Create a 4-week learning roadmap.

7. Evaluate:
- overall
- technicalSkills
- projects
- resumeQuality
- interviewReadiness

All scores must be between 0 and 100.

8. Give improvementAreas.
Each under 8 words.

9. Give exactly 3 nextSteps.

Format:

{
  "skill": "",
  "priority": "High|Medium|Low",
  "reason": ""
}

Reason must be under 5 words.

Keep everything concise and easy to understand.
`

        },

        {
          role: "user",
          content: `
RESUME:

${resumeText}

JOB DESCRIPTION:

${jobDescription}
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