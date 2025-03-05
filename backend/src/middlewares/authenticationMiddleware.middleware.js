import passport from "passport";
import asyncHandler from "../utils/asyncHandler.js";
import logger from "../utils/logger.js";


const authenticateUserCheck = asyncHandler(async(req, res, next) => {
 
  passport.authenticate("jwt", { session: false }, (err, user, info) => {
    if (err) {
      logger.error("Error during authentication:", err);
      return res.status(500).json({ message: "Internal server error" });
    }
    if (!user) {
      
      logger.info('user not found');
      return res.status(401).json({ message: "Unauthorized" });
    }
    req.user = user; // Attach user to request
    logger.info(`user success authenticated ${user._id}`)
    next(); // Move to next middleware/controller
  })(req, res, next); // Execute the middleware function
})

export default authenticateUserCheck;
