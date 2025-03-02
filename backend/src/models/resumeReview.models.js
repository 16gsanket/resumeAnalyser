import mongoose from "mongoose";

const resumeReview = new mongoose.Schema(
    {
        review:String,
        resumeId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Resume"
        }
    }
)

export default mongoose.model("ResumeReview",resumeReview)