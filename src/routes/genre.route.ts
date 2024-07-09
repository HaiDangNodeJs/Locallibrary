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

router.get('/genres', getAllGenres);
router.get('/genre/:id', getGenreDetail);
router.get('/genre/create', createGenreForm);
router.post('/genre/create', createGenre);
router.get('/genre/:id/delete', deleteGenreForm);
router.post('/genre/:id/delete', deleteGenre);
router.get('/genre/:id/update', updateGenreForm);
router.post('/genre/:id/update', updateGenre);

export default router;
