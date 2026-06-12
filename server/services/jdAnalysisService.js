import ai from "../configs/ai.js";

const aiModel =
  process.env.OPENAI_MODEL?.replace(/['"]/g, "").trim() ||
  "gemini-2.5-flash";

export const analyzeResumeAgainstJD = async (
  resumeText,
  jobDescription,
  matchedSkills,
  missingSkills
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

We have already performed a deterministic keyword match to identify the candidate's matched and missing skills:
- Matched Skills: ${JSON.stringify(matchedSkills)}
- Missing Skills: ${JSON.stringify(missingSkills)}

Your task is to provide career guidance, strengths, suggestions, roadmap, next steps, and readiness scores based on the resume, job description, and the pre-calculated skill lists above.

Use simple language suitable for college students.

Rules:
- Accept the pre-calculated matchedSkills and missingSkills arrays, and return them exactly as provided in the JSON response output.
- Do not encourage lying or keyword stuffing.
- Keep all insights short.
- Suggest learning resources or priorities based on the Missing Skills.
- Do not estimate ATS scores.
- Do not estimate match percentages.
- Do not generate jobFitCategory.

Return ONLY valid JSON.

JSON Format:

{
  "matchedSkills": ${JSON.stringify(matchedSkills)},
  "missingSkills": ${JSON.stringify(missingSkills)},
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
      "priority": "High|Medium|Low",
      "reason": ""
    }
  ]
}

Requirements:

1. Use the pre-calculated matchedSkills and missingSkills.
2. Give exactly 3 strengths based on matchedSkills and projects.
3. Give exactly 3 suggestions.
4. Give exactly 3 careerInsights.

Career insights:
- Under 10 words.
- Example:
  - Strong MERN foundation.
  - Need cloud experience.
  - Good project portfolio.

5. Create a 4-week learning roadmap prioritizing the missingSkills.

6. Evaluate:
- overall
- technicalSkills
- projects
- resumeQuality
- interviewReadiness

All scores must be between 0 and 100.

7. Give improvementAreas.
Each under 8 words.

8. Give exactly 3 nextSteps based on missingSkills.

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