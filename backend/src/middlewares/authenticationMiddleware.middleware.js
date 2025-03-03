import passport from "passport";
import asyncHandler from "../utils/asyncHandler.js";


const authenticateUserCheck = asyncHandler(async(req, res, next) => {
  console.log("Inside authenticateUserCheck middleware");
  
  passport.authenticate("jwt", { session: false }, (err, user, info) => {
    console.log('user', user)
    if (err) {
      console.error("Error during authentication:", err);
      return res.status(500).json({ message: "Internal server error" });
    }

    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    req.user = user; // Attach user to request
    console.log('user from authmiddleware', req.user)
    next(); // Move to next middleware/controller
  })(req, res, next); // Execute the middleware function
})

export default authenticateUserCheck;
