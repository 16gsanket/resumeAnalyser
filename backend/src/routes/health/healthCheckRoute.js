import express from 'express'

const healthCheckRoute = express.Router();

healthCheckRoute.get('/health-check', (req, res) => {
    res.status(200).json({ message: 'OK' });
});

export default healthCheckRoute