import Resume from "../models/Resume.js";
import {
  generateQuestions
} from "../services/interviewService.js";
const convertResumeToText = (resume) => {
  return `
Name: ${resume.personal_info?.full_name || ""}

Summary:
${resume.professional_summary || ""}

Skills:
${resume.skills?.join(", ") || ""}

Experience:
${resume.experience
  ?.map(
    (exp) => `
${exp.position} at ${exp.company}
${exp.description || ""}
`
  )
  .join("\n") || ""}

Projects:
${resume.project
  ?.map(
    (proj) => `
${proj.name}
${proj.description || ""}
`
  )
  .join("\n") || ""}

Education:
${resume.education
  ?.map(
    (edu) => `
${edu.degree}
${edu.field}
${edu.institution}
`
  )
  .join("\n") || ""}
`;
};

export const generateInterviewQuestions = async (
  req,
  res
) => {

  try {

    const {
      resumeId,
      jobDescription
    } = req.body;

    if (!resumeId) {

      return res.status(400).json({
        message: "Resume ID is required"
      });

    }

    const resume =
      await Resume.findById(resumeId);

    if (!resume) {

      return res.status(404).json({
        message: "Resume not found"
      });

    }

    const resumeText =
      convertResumeToText(resume);

    const result =
      await generateQuestions(
        resumeText,
        jobDescription
      );

    return res.status(200).json(result);

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      message: error.message
    });

  }

};