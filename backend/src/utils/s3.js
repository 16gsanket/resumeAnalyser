import AWS from "aws-sdk";
import dotenv from "dotenv";
import fs from "fs"; // File system module to read files

dotenv.config();

// Configure AWS S3
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

export const uploadFileToS3 = async (filePath, fileName) => {
  try {
    const fileContent = fs.readFileSync(filePath); // Read the file from server storage

    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: `uploads/${fileName}`, // Path in S3
      Body: fileContent, // Actual file content
      ContentType: "application/pdf", // Change if uploading other file types
    };

    // Upload the file
    const data = await s3.upload(params).promise();
    
    console.log('data from uploading to aws bucket: ' ,data)
    console.log("File uploaded successfully:", data.Location);
    
    return data.Location; // Return the file URL from S3
  } catch (error) {
    console.error("Error uploading to S3:", error);
    throw new Error("S3 Upload Failed");
  }
};
