import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config();

// Initialize S3 Client
const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

// Upload file to S3
export const uploadFileToS3 = async (filePath, fileName) => {
  try {
    const fileContent = fs.readFileSync(filePath);

    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: `uploads/${fileName}`,
      Body: fileContent,
      ContentType: "application/pdf", // Adjust as needed
    };

    const command = new PutObjectCommand(params);
    await s3.send(command); // Upload to S3

    const fileURL = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/uploads/${fileName}`;

    console.log("File uploaded successfully:", fileURL);
    return fileURL; // Return the S3 URL
  } catch (error) {
    console.error("Error uploading to S3:", error);
    throw new Error("S3 Upload Failed");
  }
};
