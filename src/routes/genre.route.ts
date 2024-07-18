import express from 'express';
import {
    getAllGenres,
    getGenreDetail,
    createGenreForm,
    createGenre,
    deleteGenreForm,
    deleteGenre,
    updateGenreForm,
    updateGenre
} from '../controllers/genre.controller';

const router = express.Router();

router.get('/', getAllGenres);
router.get('/:id', getGenreDetail);
router.get('/create', createGenreForm);
router.post('/create', createGenre);
router.get('/:id/delete', deleteGenreForm);
router.post('/:id/delete', deleteGenre);
router.get('/:id/update', updateGenreForm);
router.post('/:id/update', updateGenre);

export default router;
