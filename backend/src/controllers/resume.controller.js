import apiResponse from "../utils/apiResponse.js";
import logger from "../utils/logger.js";
import { uploadFileToS3 } from "../utils/s3.js";
import asyncHandler from "../utils/asyncHandler.js";

const uploadToServer = asyncHandler(async(req, res) =>{
  if (!req.file) {
    return res.status(400).json(new apiResponse(400, "No file uploaded", null));
  }

  logger.info("File uploaded successfully by ", req.user);
  console.log(req.file);

  const filePath = req.file.path; // Path where the file is temporarily stored
  const fileName = req.file.originalname;// Original file name

  const s3URL = await uploadFileToS3(filePath, fileName);

  return res.status(200).json(
    new apiResponse(200, "File uploaded successfully", {
      filename: req.file.filename,
      path: `${s3URL}` // ✅ Ensure correct path is returned
    })
  );
})

export { uploadToServer };
