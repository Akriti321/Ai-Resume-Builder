import Resume from "../models/Resume.js";
import { normalizeSkills }
  from "../utils/normalizeSkills.js";
import { calculateATSScore }
from "../utils/calculateATSScore.js";
import {
  analyzeResumeAgainstJD
}
from "../services/jdAnalysisService.js";

const convertResumeToText = (resume) => {

  let text = "";

  text += resume.professional_summary || "";

  text += "\nSkills:\n";
  text += resume.skills?.join(", ") || "";

  text += "\nExperience:\n";

  resume.experience?.forEach((exp) => {

    text += `
${exp.position}
${exp.company}
${exp.description}
`;
  });

  text += "\nProjects:\n";

  resume.project?.forEach((project) => {

    text += `
${project.name}
${project.type}
${project.description}
`;
  });

  text += "\nEducation:\n";

  resume.education?.forEach((edu) => {

    text += `
${edu.degree}
${edu.field}
${edu.institution}
`;
  });

  return text;
};

export const analyzeJD = async (
  req,
  res
) => {

  try {

    const {
      resumeId,
      jobDescription
    } = req.body;

    if (!resumeId || !jobDescription) {

      return res.status(400).json({
        message:
          "Resume ID and Job Description required"
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

    const normalizedResume =
      normalizeSkills(resumeText);

    const normalizedJD =
      normalizeSkills(jobDescription);

    const analysis =
      await analyzeResumeAgainstJD(
        normalizedResume,
        normalizedJD
      );

    // ==========================
    // Deterministic ATS Score
    // ==========================

    const matchedSkills =
      analysis.matchedSkills || [];

    const missingSkills =
      analysis.missingSkills || [];

    const totalSkills =
      matchedSkills.length +
      missingSkills.length;

    let score = 0;

    if (totalSkills > 0) {

      score = Math.round(
        (
          matchedSkills.length /
          totalSkills
        ) * 100
      );

    }

    analysis.score = score;

    // ==========================
    // Job Fit Category
    // ==========================

    if (score >= 90) {

      analysis.jobFitCategory =
        "Excellent Match";

    } else if (score >= 75) {

      analysis.jobFitCategory =
        "Strong Match";

    } else if (score >= 60) {

      analysis.jobFitCategory =
        "Moderate Match";

    } else if (score >= 40) {

      analysis.jobFitCategory =
        "Weak Match";

    } else {

      analysis.jobFitCategory =
        "Poor Match";

    }

    return res.status(200).json(
      analysis
    );

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      message: error.message
    });

  }

};