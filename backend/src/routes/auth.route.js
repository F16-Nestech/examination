import express from 'express';
import { login, refreshToken, logout } from '../controllers/auth.controller.js';

const authRoute = express.Router();

// API
authRoute.post('/login', login);
authRoute.post('/refresh', refreshToken);
authRoute.post('/logout', logout);

export default authRoute;
