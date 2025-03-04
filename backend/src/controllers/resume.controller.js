import apiResponse from "../utils/apiResponse.js";
import logger from "../utils/logger.js";
import { uploadFileToS3 } from "../utils/s3.js";
import asyncHandler from "../utils/asyncHandler.js";
import fs from "fs";

import resumeModels from "../models/resume.models.js";
import userResumeModels from "../models/userResume.models.js";

const uploadToServer = asyncHandler(async(req, res) =>{
  if (!req.file) {
    return res.status(400).json(new apiResponse(400, "No file uploaded", null));
  }

  console.log(req.user);

  

  const filePath = req.file.path; // Path where the file is temporarily stored
  const fileName = req.file.originalname;// Original file name
  const fileType = req.file.mimetype.split('/')[1]; // Extract file type from mime type

  const s3URL = await uploadFileToS3(filePath, fileName);

  logger.info(`File uploaded to S3: ${s3URL}`);

  if(s3URL){
    fs.unlinkSync(filePath, (err) => {
      if (err) {
        logger.error(`Error deleting local file: ${err}`);
      }
    });

    const resumeCreated = new resumeModels({
      resumeURL:s3URL,
      fileType:fileType,
      fileSize: req.file.size
    })
    await resumeCreated.save();



    let userResumes = await userResumeModels.findOne({owner: req.user.id});
    if(!userResumes){
      userResumes = new userResumeModels({
        owner: req.user.id,
        currentResumeId: resumeCreated._id,
        resumes: [resumeCreated._id]
      })
      await userResumes.save();
    }else{
      userResumes.resumes.push(resumeCreated._id);
      await userResumes.save();  
    }

    // const userResumes= new userResumeModels({
    //   owner: req.user.id,
    //   currentResumeId: resumeCreated._id,
    //   resumes: [resumeCreated._id]
    // })
    // await userResumes.save();

  }

  return res.status(200).json(
    new apiResponse(200, "File uploaded successfully", {
      filename: req.file.filename,
      path: `${s3URL}` // ✅ Ensure correct path is returned
    })
  );
})

export { uploadToServer };
