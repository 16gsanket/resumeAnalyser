import app from "./app.js";
import logger from "./utils/logger.js";
import connectDB from "./db/index.js";

const port = process.env.PORT || 8000;

connectDB()
  .then(
    app.listen(process.env.PORT, () => {
      logger.info(`Server is running on port ${process.env.PORT}`);
      console.log(`Server is running on port ${process.env.PORT}`);
    })
  )
  .catch((error) => console.log(error));
