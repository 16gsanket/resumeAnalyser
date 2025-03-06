import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import User from "../models/users.models.js"; // Adjust the path as needed
import dotenv from 'dotenv';
dotenv.config();

export default function passportGoogleConfig(passport) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,        // Google Client ID from your .env
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,  // Google Client Secret from your .env
        callbackURL: `${process.env.SERVER_URL}/api/v1/auth/google/callback`,            // Must match your Google API Console settings
      },
      async (profile, done) => {
        try {
          // Check if a user with this Google ID already exists
          let user = await User.findOne({ 
            $or: [{ googleId: profile.id }, { email: profile.emails[0].value }],
          
          });
          if (user) {
            if(user.googleId !== profile.id){
              user.googleId = profile.id;
              await user.save();
            }
            return done(null, user);
          }
          // If not, create a new user with info from the Google profile
          const newUser = new User({
            googleId: profile.id,
            fullName: profile.emails[0].value.split('@')[0],
            email: profile.emails[0].value,
          });
          await newUser.save();

          user = await User.findOne({ googleId: profile.id });
          console.log('user from google miffleware' , user)
          return done(null, user);
        } catch (err) {
          console.error("Google Strategy Error:", err);
          return done(err, null);
        }
      }
    )
  );
}
