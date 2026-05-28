import Resume from "../models/Resume.js";
import imageKit from "../configs/imageKit.js";  
import fs from 'fs';
// POST : /api/resumes/create
export const createResume = async (req, res) => {

    try {

        const userId = req.userId;

        const { title } = req.body;

        // Create New Resume
        const newResume = await Resume.create({
            userId,
            title
        });

        // Return Success Response
        return res.status(201).json({
            message: "Resume created successfully",
            resume: newResume
        });

    } catch (error) {

        return res.status(400).json({
            message: error.message
        });

    }
};

//controller for deleting a resume
// DELETE : /api/resumes/delete/:resumeId

export const deleteResume = async (req, res) => {

    try {

        const userId = req.userId;

        const { resumeId } = req.params;

        // Delete Resume
        await Resume.findOneAndDelete({
            userId,
            _id: resumeId
        });

        // Return Success Message
        return res.status(200).json({
            message: "Resume deleted successfully"
        });

    } catch (error) {

        return res.status(400).json({
            message: error.message
        });

    }
};

//get user resume by id
// GET : /api/resumes/:resumeId
export const getResumeById = async (req, res) => {

    try {

        const userId = req.userId;
        const { resumeId } = req.params;

        // Find Resume
        const resume = await Resume.findOne({
            userId,
            _id: resumeId
        });

        if (!resume) {
            return res.status(404).json({
                message: "Resume not found"
            });
        }

        const safeResume = resume.toObject();

        delete safeResume.__v;
        delete safeResume.createdAt;
        delete safeResume.updatedAt;

        return res.status(200).json({
            message: "Resume fetched successfully",
            resume: safeResume
        });

    } catch (error) {

        return res.status(400).json({
            message: error.message
        });

    }
};
//get resume by id public
export const getPublicResumeById = async (req, res) => {

    try {

        const { resumeId } = req.params;

        const resume = await Resume.findOne({
            public: true,
            _id: resumeId
        });

        if (!resume) {
            return res.status(404).json({
                message: "Resume not found"
            });
        }

        return res.status(200).json({
            message: "Resume fetched successfully",
            resume
        });

    } catch (error) {

        return res.status(400).json({
            message: error.message
        });

    }
};

//controller for updating rwsume
// PUT : /api/resumes/update/:resumeId
// PUT : /api/resumes/update

export const updateResume = async (req, res) => {

  try {

    const resumeId = req.body.resumeId

    const resumeData =
      JSON.parse(req.body.resumeData)

    // Handle profile image upload if present
    if (req.file) {
      const fileBuffer = fs.readFileSync(req.file.path);
      const uploadResponse = await imageKit.files.upload({
        file: fileBuffer.toString("base64"),
        fileName: req.file.originalname || `image-${Date.now()}`
      });

      if (!resumeData.personal_info) {
        resumeData.personal_info = {};
      }
      resumeData.personal_info.image = uploadResponse.url;

      // Clean up the temp file
      try {
        fs.unlinkSync(req.file.path);
      } catch (err) {
        console.error("Error deleting temp file:", err);
      }
    }

    // Ensure personal_info.image is not an object (e.g. {}) to prevent Mongoose casting errors
    if (resumeData.personal_info) {
      if (typeof resumeData.personal_info.image === 'object') {
        resumeData.personal_info.image = "";
      }
    }

    const updatedResume =
      await Resume.findByIdAndUpdate(

        resumeId,

        resumeData,

        { new: true }

      )

    return res.status(200).json({

      message: "Resume updated successfully",

      resume: updatedResume

    })

  } catch (error) {

    return res.status(400).json({

      message: error.message

    })

  }

};