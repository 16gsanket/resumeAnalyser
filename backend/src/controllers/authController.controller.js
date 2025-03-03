import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import asyncHandler from "../utils/asyncHandler.js"
import User from "../models/users.models.js";
import apiResponse from "../utils/apiResponse.js";
import logger from "../utils/logger.js";


const loginUser = asyncHandler(async (req, res, next) => {
    try {
        const { email, password } = req.body;
    
        // 1) Check if user exists by email
        let user = await User.findOne({ email });
        console.log(user);
        
        
        if (!user) {
          // 2) If no user, create a new one (auto-registration)
          const hashedPassword = await bcrypt.hash(password, 10);
          user = new User({
            email,
            password: hashedPassword,
            fullName: email.split('@')[0],


            // Any other fields you want to default, e.g., fullName: "New User"
          });
          await user.save();
          console.log('user after saving ',user)
        } else {
          // 3) If user exists, verify the password
          const isMatch = await bcrypt.compare(password, user.password);
          console.log('password is match',isMatch)
          if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
          }
        }
    
        // 4) Generate a JWT token for either a new or existing user
        const payload = { id: user._id };
        console.log(payload);
        
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
        console.log(token);
        
    
        // 5) Respond with the token and some user info
    
        logger.info('Login successful');
        return res.status(200).json(new apiResponse(200, 'Login successful', { token, user: { id: user._id, email: user.email } }));

      } catch (error) {
       
        logger.error('Server error');
        return res.status(500).json({ message: 'Server error' });
      }
})
const logoutUser = asyncHandler(async (req, res, next) => {

  return res.status(200).json(new apiResponse(200, 'Logout successful',{}));
})

export { loginUser , logoutUser}