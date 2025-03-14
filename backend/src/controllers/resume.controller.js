import apiResponse from '../utils/apiResponse.js';
import logger from '../utils/logger.js';
import { uploadFileToS3, extractTextFromResume } from '../utils/s3.js';
import asyncHandler from '../utils/asyncHandler.js';
import fs from 'fs';
import parseJSON from '../utils/parseJSON.js';
import { GoogleGenerativeAI } from '@google/generative-ai';

import resumeModels from '../models/resume.models.js';
import userResumeModels from '../models/userResume.models.js';
import checkResumeValid from '../utils/checkResumeValid.js';

const uploadToServer = asyncHandler(async (req, res) => {
  console.log('inside upload funtion..')
  try {
    if (!req.file) {
      return res
        .status(400)
        .json(new apiResponse(400, 'No file uploaded', null));
    }

    

    const filePath = req.file.path; // Temporary file storage path
    const fileName = req.file.originalname; // Original file name
    const fileType = req.file.mimetype.split('/')[1].toLowerCase(); // Extract file type from MIME type

    // if(fileType !== 'pdf'){
    //   return res
    //     .status(400)
    //     .json(new apiResponse(400, 'Only PDF files are allowed', null));
    // }

    

    // ✅ Upload file to S3
    const s3URL = await uploadFileToS3(filePath, fileName);
    logger.info(`File uploaded to S3: ${s3URL}`);

    if (!s3URL) {
      return res
        .status(500)
        .json(new apiResponse(500, 'Failed to upload file to S3', null));
    }

    logger.info(`File uploaded to S3: ${s3URL}`);

    // ✅ Delete local file after successful upload
    fs.unlink(filePath, (err) => {
      if (err) logger.error(`Error deleting local file: ${err}`);
    });

    // ✅ Extract text from the uploaded resume using AWS Textract
    let extractedText = '';
    try {
      extractedText = await extractTextFromResume(s3URL);
      logger.info('Text extraction successful');
    } catch (error) {
      logger.error('Text extraction failed:', error);
    }

    // ✅ Save resume details in the database
    const resumeCreated = new resumeModels({
      resumeURL: s3URL,
      fileType: fileType,
      fileSize: req.file.size,
    });

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

    const genAI = new GoogleGenerativeAI(process.env.GEMMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    // const prompt = 'Analyse this text from a resume and tell me its strenght, weaknesses';
    const prompt = `
    You are a career guidance advisor. Analyze the resume text below and provide structured career feedback in a refined JSON format with the following keys:
    {
      "personal_feedback": {
        "strengths": <string>,
        "weaknesses": <string>
      },
      "next_steps": [ 
        { 
          "action": <string>, 
          "details": <string> 
        } 
      ],
      "specific_advice": {
        "resume_structure": <string>,
        "experience_section": <string>,
        "education_section": <string>,
        "skills_section": <string>,
        "projects_section": <string>,
        "portfolio": <string>
      },
      "career_growth_next_steps": [
        {
          "action": <string>,
          "details": <string>
        }
      ],
      "career_navigation_advice": {
        <string key-value pairs>
      }
    }
    Output only valid JSON without any extra text, escape sequences, or comments.
    Example:
    {
      "personal_feedback": {
        "strengths": "Strong technical skills and measurable achievements.",
        "weaknesses": "Resume structure is cluttered and lacks a clear summary."
      },
      "next_steps": [
        {
          "action": "Improve Structure",
          "details": "Add a professional summary and reorganize sections for clarity."
        }
      ],
      "specific_advice": {
        "resume_structure": "Introduce a concise summary and clearly separate sections.",
        "experience_section": "Group similar tasks and emphasize quantifiable results.",
        "education_section": "Include relevant academic achievements and coursework.",
        "skills_section": "Categorize technical and soft skills with examples.",
        "projects_section": "Explain project challenges, technologies used, and outcomes.",
        "portfolio": "Ensure your online portfolio is updated and linked."
      },
      "career_growth_next_steps": [
        {
          "action": "Expand Technical Expertise",
          "details": "Consider learning emerging technologies and obtaining relevant certifications."
        }
      ],
      "career_navigation_advice": 
        [
      {
        "strategy": "Network actively, seek mentorship, and attend industry events to navigate your career path effectively.",
         "networking": "include he networking data here if any."
         }
        ]
      
    }
    
    Resume Text:
    ${extractedText}
    `;

    // const isResume = checkResumeValid(extractedText);

    // if(!isResume){
    //   return res.status(400).json(new apiResponse(400, 'Resume is not valid', null));
    // }

    const result = await model.generateContent(prompt);
    

    const resulted_json = parseJSON(result.response.text());

    return res.status(200).json(
      new apiResponse(200, 'File uploaded & text extracted', {
        filename: req.file.filename,
        s3Path: s3URL,
        textAnalysis: resulted_json || 'Text extraction failed',
        textExtracted: extractedText,
      })
    );
  } catch (error) {
    logger.error('Error in file upload:', error);
    return res
      .status(500)
      .json(new apiResponse(500, 'Internal Server Error', null));
  }
});

export { uploadToServer };
