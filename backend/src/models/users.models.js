import mongoose from 'mongoose';

const User = new mongoose.Schema(
  {
    fullName: {
      type: String,
      default: 'user',
    },
    currentJobRole: {
      type: String,
      default: 'null',
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password:{
        type:String,
        required:true,

        
    }
  },
  { timestamps: true }
);

export default mongoose.model('User', User);
