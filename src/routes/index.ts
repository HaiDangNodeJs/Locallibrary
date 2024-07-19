import { Router, NextFunction, Request, Response } from 'express';
import bookRoutes from './book.route';
import { index } from '../controllers/book.controller';
import authorRoutes from './author.route';
import genreRoutes from './genre.route';
import bookInstanceRoutes from './bookinstance.route';

const router: Router = Router();

router.get('/', index);
router.use("/books", bookRoutes);
router.use("/authors", authorRoutes);
router.use("/genres", genreRoutes);
router.use("/bookInstances", bookInstanceRoutes);


export default router;
