import express from 'express';
import {
    getAllAuthors,
    getAuthorDetail,
    createAuthorForm,
    createAuthor,
    deleteAuthorForm,
    deleteAuthor,
    updateAuthorForm,
    updateAuthor
} from '../controllers/author.controller';

const router = express.Router();

router.get('/authors', getAllAuthors);
router.get('/author/:id', getAuthorDetail);
router.get('/author/create', createAuthorForm);
router.post('/author/create', createAuthor);
router.get('/author/:id/delete', deleteAuthorForm);
router.post('/author/:id/delete', deleteAuthor);
router.get('/author/:id/update', updateAuthorForm);
router.post('/author/:id/update', updateAuthor);

export default router;