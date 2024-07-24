import express from 'express';
import {
    getAllAuthors,
    getAuthorDetail,
    createAuthorGet,
    createAuthorPost,
    deleteAuthorForm,
    deleteAuthor,
    updateAuthorForm,
    updateAuthor
} from '../controllers/author.controller';

const router = express.Router();

router.get('/create', createAuthorGet);
router.post('/create', createAuthorPost);
router.get('/', getAllAuthors);
router.get('/:id', getAuthorDetail);
router.get('/:id/delete', deleteAuthorForm);
router.post('/:id/delete', deleteAuthor);
router.get('/:id/update', updateAuthorForm);
router.post('/:id/update', updateAuthor);

export default router;
