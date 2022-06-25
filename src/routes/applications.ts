import { Router } from 'express';
import * as applications from '../controllers/application';

export const router = Router({ mergeParams: true });
router.post('/', applications.create);
router.get('/', applications.findAll);
router.get('/:applicationId', applications.findOne);
router.put('/:applicationId', applications.update);
router.delete('/:applicationId', applications.deleteOne);

export default router;
