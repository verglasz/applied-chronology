import { Router } from 'express';
import * as interviews from '../controllers/interview';

export const router = Router({ mergeParams: true });
router.post('/', interviews.create);
router.get('/', interviews.findAll);
router.get('/:interviewId', interviews.findOne);
router.put('/:interviewId', interviews.update);
router.delete('/:interviewId', interviews.deleteOne);

export default router;
