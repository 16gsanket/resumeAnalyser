import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { TextractClient, AnalyzeDocumentCommand } from "@aws-sdk/client-textract";
import dotenv from "dotenv";
import fs from "fs";
import logger from "./logger.js";

dotenv.config();

// ✅ S3 Client
const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

// ✅ Textract Client
const textract = new TextractClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

// ✅ Upload File to S3
export const uploadFileToS3 = async (filePath, fileName) => {
  try {
    const fileContent = fs.readFileSync(filePath);
    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: `uploads/${fileName}`,
      Body: fileContent,
      ContentType: "application/pdf",
    };

    await s3.send(new PutObjectCommand(params));

    // console.log("File uploaded successfully:", fileName);
    logger.info(`File uploaded successfully: ${fileName}`);
    return `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/uploads/${fileName}`; // Return full S3 URL
  } catch (error) {
    // console.error("Error uploading to S3:", error);
    logger.error(`Error uploading to S3: ${error}`);
    throw new Error("S3 Upload Failed");
  }
};

// ✅ Extract Text from Resume (Synchronous Textract)
export const extractTextFromResume = async (s3URL) => {
  try {
    const params = {
      Document: {
        S3Object: {
          Bucket: process.env.AWS_BUCKET_NAME,
          Name: s3URL.split(".com/")[1], // Extract file key from URL
        },
      },
      FeatureTypes: ["TABLES", "FORMS"], // Extracts structured data if available
    };

    const command = new AnalyzeDocumentCommand(params);
    const response = await textract.send(command);

    if (!response || !response.Blocks) {
      console.log("No text detected");
      return "No text detected";
    }

    let extractedText = response.Blocks
      .filter((block) => block.BlockType === "LINE")
      .map((block) => block.Text)
      .join(" ");

    console.log("Extracted Text:", extractedText);
    return extractedText || "No text extracted";
  } catch (error) {
    console.error("Error extracting text from Textract:", error);
    return "Text extraction failed";
  }
};
