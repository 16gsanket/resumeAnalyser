import apiResponse from "../utils/apiResponse.js";
import logger from "../utils/logger.js";
import { uploadFileToS3, extractTextFromResume } from "../utils/s3.js";
import asyncHandler from "../utils/asyncHandler.js";
import fs from "fs";
import axios from "axios";
import resumeModels from "../models/resume.models.js";
import userResumeModels from "../models/userResume.models.js";

const uploadToServer = asyncHandler(async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json(new apiResponse(400, "No file uploaded", null));
    }

    console.log("User uploading file:", req.user);

    const filePath = req.file.path; // Temporary file storage path
    const fileName = req.file.originalname; // Original file name
    const fileType = req.file.mimetype.split("/")[1]; // Extract file type from MIME type

    // ✅ Upload file to S3
    const s3URL = await uploadFileToS3(filePath, fileName);
    logger.info(`File uploaded to S3: ${s3URL}`);

    if (!s3URL) {
      return res.status(500).json(new apiResponse(500, "Failed to upload file to S3", null));
    }

    // ✅ Delete local file after successful upload
    fs.unlink(filePath, (err) => {
      if (err) logger.error(`Error deleting local file: ${err}`);
    });

    // ✅ Extract text from the uploaded resume using AWS Textract
    let extractedText = "";
    try {
      extractedText = await extractTextFromResume(s3URL);
      logger.info("Text extraction successful");
    } catch (error) {
      logger.error("Text extraction failed:", error);
    }

    // ✅ Save resume details in the database
    const resumeCreated = new resumeModels({
      resumeURL: s3URL,
      fileType: fileType,
      fileSize: req.file.size,
    });
    { /*extractedText: extractedText || "Text extraction failed", */}
    
    await resumeCreated.save();

    // ✅ Associate the resume with the user
    let userResumes = await userResumeModels.findOne({ owner: req.user.id });

    if (!userResumes) {
      userResumes = new userResumeModels({
        owner: req.user.id,
        currentResumeId: resumeCreated._id,
        resumes: [resumeCreated._id],
      });
    } else {
      userResumes.resumes.push(resumeCreated._id);
    }

    await userResumes.save();

    const options = {
      method: "POST",
      url: "https://api.edenai.run/v2/text/entity_sentiment",
      headers: {
        authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMmM0MmY2YzMtMTBmYy00Yzg0LWI0ZjQtNDYwZTEyODJjMDY0IiwidHlwZSI6ImFwaV90b2tlbiJ9.w1KGJLZ3RzOWCTROrH1S5il7hc00HZXJD7aWTCc-qiA",
      },
      data: {
        providers: "amazon",
        text: extractedText,
        language: "en",
      },
    };
    


    return res.status(200).json(
      new apiResponse(200, "File uploaded & text extracted", {
        filename: req.file.filename,
        s3Path: s3URL,
        textAnalysis: extractedText || "Text extraction failed",
      })
    );


   



  } catch (error) {
    logger.error("Error in file upload:", error);
    return res.status(500).json(new apiResponse(500, "Internal Server Error", null));
  }
});

export { uploadToServer };
