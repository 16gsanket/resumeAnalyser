import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import User from '../models/users.models.js'; // Adjust path to your User model

// Load environment variables
import dotenv from 'dotenv';
dotenv.config();

/**
 * This function receives the `passport` instance and configures the JWT strategy.
 */
export default function passportJWTConfig(passport) {
  const opts = {
    // Extract the token from the Authorization header as a Bearer token
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    // Use the secret key from your .env file
    secretOrKey: process.env.JWT_SECRET,
  };

  passport.use(
    new JwtStrategy(opts, async (jwt_payload, done) => {
      try {
        // jwt_payload is the decoded token, e.g. { id: <USER_ID>, iat, exp }
        const user = await User.findById(jwt_payload.id);
        if (user) {
          // If the user is found, return it
          return done(null, user);
        }
        // If user not found, return false
        return done(null, false);
      } catch (error) {
        return done(error, false);
      }
    })
  );
}
