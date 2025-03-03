import express from 'express'
import authenticateUserCheck from '../../middlewares/authenticationMiddleware.middleware.js'
import upload from '../../middlewares/multer.js'
import { uploadToServer } from '../../controllers/resume.controller.js'

const resumeRoute = express.Router()

resumeRoute.post('/upload-file-resume',authenticateUserCheck,upload.single('file') , uploadToServer)

export default resumeRoute;