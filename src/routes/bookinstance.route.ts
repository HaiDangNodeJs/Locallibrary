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

router.get('/bookinstances', getAllBookInstances);
router.get('/bookinstance/:id', getBookInstanceDetail);
router.get('/bookinstance/create', createBookInstanceForm);
router.post('/bookinstance/create', createBookInstance);
router.get('/bookinstance/:id/delete', deleteBookInstanceForm);
router.post('/bookinstance/:id/delete', deleteBookInstance);
router.get('/bookinstance/:id/update', updateBookInstanceForm);
router.post('/bookinstance/:id/update', updateBookInstance);

export default router;
