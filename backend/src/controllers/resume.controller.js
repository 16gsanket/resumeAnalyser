import apiResponse from "../utils/apiResponse.js";
import logger from "../utils/logger.js";

function uploadToServer(req, res) {
  if (!req.file) {
    return res.status(400).json(new apiResponse(400, "No file uploaded", null));
  }

//   logger.info("File uploaded successfully by ", req.user);
//   console.log(req.file);

  return res.status(200).json(
    new apiResponse(200, "File uploaded successfully", {
      filename: req.file.filename,
      path: `/uploads/${req.file.filename}` // ✅ Ensure correct path is returned
    })
  );
}

export { uploadToServer };
