import mongoose from "mongoose";

const Resume = new mongoose.Schema(
    {
        resumeURL :{
            type:String
        },
        fileType:{
            type:String,
            required:true 
            
        },
        fileSize :{
            type:Number
        },

    },{timestamps:true}
)

export default mongoose.model("Resume",Resume)