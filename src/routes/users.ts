import { Router } from 'express';
import * as users from '../controllers/user';
import applications from './applications';
import interviews from './interviews';

export const router = Router();
router.post('/', users.create);
router.get('/', users.findAll);
router.get('/:userId', users.findOne);
router.put('/:userId', users.update);
router.delete('/:userId', users.deleteOne);
router.use('/:userId/applications', applications);
router.use('/:userId/interviews', interviews);

export default router;
