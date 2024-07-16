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

router.get('/books', getAllBooks);
router.get('/book/:id', getBookDetail);
router.get('/book/create', createBookForm);
router.post('/book/create', createBook);
router.get('/book/:id/delete', deleteBookForm);
router.post('/book/:id/delete', deleteBook);
router.get('/book/:id/update', updateBookForm);
router.post('/book/:id/update', updateBook);

export default router;
