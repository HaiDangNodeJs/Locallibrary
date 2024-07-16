import { Router, NextFunction, Request, Response } from 'express';
import authorRoutes from './author.route';
import bookRoutes from './book.route';
import bookinstanceRoutes from './bookinstance.route';
import genreRoutes from './genre.route';


const router: Router = Router();

router.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.render('index', { title: 'Express' })
});


// Sử dụng các route
router.use('/', authorRoutes);
router.use('/', bookRoutes);
router.use('/', bookinstanceRoutes);
router.use('/', genreRoutes);


export default router;
