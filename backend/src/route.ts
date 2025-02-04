import express from 'express';
import  CandidateController from './controller';

const router = express.Router();
const candidateController = new CandidateController();

router.post('/', candidateController.create);
router.get('/', candidateController.get);
router.patch('/:id', candidateController.patch);
router.patch('/:id/status', candidateController.updateStatus);
router.delete('/:id', candidateController.delete);

export default router;