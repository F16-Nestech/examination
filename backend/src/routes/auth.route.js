import express from 'express';
import { login } from '../controllers/auth.controller.js';

const authRoute = express.Router();

// API
authRoute.post('/login', login);

export default authRoute;
