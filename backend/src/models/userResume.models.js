import mongoose from "mongoose";

const userResume = new mongoose.Schema(
    {
        owner:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        },
        currentResumeId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Resume"
        },
        resumes:[
            {
                type:mongoose.Schema.Types.ObjectId,
                ref:"Resume"
            }
        ]
    },{timestamps:true}
)

export default mongoose.model("UserResume",userResume)