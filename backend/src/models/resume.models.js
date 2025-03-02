import e from "express";
import mongoose from "mongoose";

const Resume = new mongoose.Schema(
    {
        resumeURL :{
            type:String
        },
        fileType:{
            enum:['pdf','doc','docx'],
            required:true 
        },
        fileSize :{
            type:Number
        },

    },{timestamps:true}
)

export default mongoose.model("Resume",Resume)