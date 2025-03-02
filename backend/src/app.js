import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import healthCheckRoute from './routes/health/healthCheckRoute.js';
import authRoute from './routes/authRoute.route.js';

import passportJWTConfig from './middlewares/passport-jwt.js';
import passport from 'passport';


const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

// app configuration
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));

// inintialize the passport
app.use(passport.initialize())

// configure the passport with out JWT strategy
passportJWTConfig(passport)

//app route consfiguration

app.use('/api/v1/health', healthCheckRoute)
app.use('/api/v1/auth',authRoute)



export default app;
