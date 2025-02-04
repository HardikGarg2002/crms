import express from 'express';
import  CandidateController from './controller';
import multer from 'multer';

const router = express.Router();
const candidateController = new CandidateController();
const upload = multer({ dest: 'uploads/' });

router.post('/', upload.single('resume'), candidateController.create);
router.get('/', candidateController.get);
router.patch('/:id', candidateController.patch);
router.patch('/:id/status', candidateController.updateStatus);
router.delete('/:id', candidateController.delete);

export default router;