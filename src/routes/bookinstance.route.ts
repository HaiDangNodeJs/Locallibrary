import express from 'express';
import {
    getAllBookInstances,
    getBookInstanceDetail,
    createBookInstanceForm,
    createBookInstance,
    deleteBookInstanceForm,
    deleteBookInstance,
    updateBookInstanceForm,
    updateBookInstance
} from '../controllers/bookinstance.controller';

const router = express.Router();

router.get('/', getAllBookInstances);
router.get('/:id', getBookInstanceDetail);
router.get('/create', createBookInstanceForm);
router.post('/create', createBookInstance);
router.get('/:id/delete', deleteBookInstanceForm);
router.post('/:id/delete', deleteBookInstance);
router.get('/:id/update', updateBookInstanceForm);
router.post('/:id/update', updateBookInstance);

export default router;
