import express from 'express';
import handleRequest from '../controllers/statement_parser.js';

const router = express.Router();

router.post('/execute', handleRequest);

export default router;