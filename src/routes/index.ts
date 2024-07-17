import { Router, NextFunction, Request, Response } from 'express';
import bookRoutes from './book.route';
import { index } from '../controllers/book.controller';


const router: Router = Router();


router.get('/', index);
router.use("/books", bookRoutes);


export default router;
