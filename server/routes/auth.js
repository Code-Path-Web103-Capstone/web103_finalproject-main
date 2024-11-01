import express from 'express';
import signupRouter from './signup.js';
import loginRouter from './login.js';

const router = express.Router();

router.use('/signup', signupRouter);
//router.use('/login', loginRouter);

export default router;