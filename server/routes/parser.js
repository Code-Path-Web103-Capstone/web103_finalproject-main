import express from 'express';
import ParserController from '../controllers/statement_parser.js';

const router = express.Router();

router.post('/hello', ParserController.handleHelloRequest);
router.get('/parserpdf', ParserController.handleExecuteParserRequest);
router.post('/parserjson', ParserController.handleExecuteParserStatement);
// Delete the data of expecetd folder
router.delete("/deletedatafolder", ParserController.DeleteDataExpected);

export default router;