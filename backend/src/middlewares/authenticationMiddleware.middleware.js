import passport from "passport";
import asyncHandler from "../utils/asyncHandler.js";


const authenticateUserCheck = asyncHandler(async(req, res, next) => {
 
  
  passport.authenticate("jwt", { session: false }, (err, user, info) => {
  
    if (err) {
      console.error("Error during authentication:", err);
      return res.status(500).json({ message: "Internal server error" });
    }

    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    req.user = user; // Attach user to request
    next(); // Move to next middleware/controller
  })(req, res, next); // Execute the middleware function
})

export default authenticateUserCheck;
