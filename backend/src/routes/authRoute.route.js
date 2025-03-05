import { Router } from 'express';
import {
  loginUser,
  logoutUser,
} from '../controllers/authController.controller.js';
import authenticateUserCheck from '../middlewares/authenticationMiddleware.middleware.js';
import apiResponse from '../utils/apiResponse.js';
import passport from 'passport';
import jwt from 'jsonwebtoken';

const authRoute = Router();

authRoute.post('/login-user', loginUser);
authRoute.post('/logout-user', authenticateUserCheck, logoutUser);
authRoute.get('/google' ,  passport.authenticate('google', { scope: ['profile', 'email'], session: false }));
authRoute.get(
    '/google/callback',
    passport.authenticate('google', { failureRedirect: '/login', session: false }),
    (req, res) => {
      // After successful authentication, generate a JWT token for the user
      
      const payload = { id: req.user._id };
      const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });
      const {email , _id:userId} = req.user
      // Redirect to your frontend with the token as a query parameter (or send as JSON)
    //   res.redirect(`https://your-frontend-domain.com/dashboard?token=${token}`);
      // return res.status(200).json(new apiResponse(200, 'Login successful', { token, user: { id: req.user._id, email: req.user.email } }));
      res.redirect(`http://localhost:5173/?token=${token}&email=${email}&userId=${userId}`);
    }
  );
  

export default authRoute;
