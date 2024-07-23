import express from 'express';
import {
    getAllBooks,
    getBookDetail,
    createBookForm,
    createBook,
    deleteBookForm,
    deleteBook,
    updateBookForm,
    updateBook
} from '../controllers/book.controller';

const router = express.Router();

router.get('/create', createBookForm);
router.post('/create', createBook);
router.get('/', getAllBooks);
router.get('/:id', getBookDetail);
router.get('/:id/delete', deleteBookForm);
router.post('/:id/delete', deleteBook);
router.get('/:id/update', updateBookForm);
router.post('/:id/update', updateBook);

export default router;
