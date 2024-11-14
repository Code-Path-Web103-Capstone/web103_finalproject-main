import express from 'express';
import uploadController from '../controllers/upload_file.js';

const router = express.Router();

router.post('/add', uploadController.handleUploadPdf);

export default router;