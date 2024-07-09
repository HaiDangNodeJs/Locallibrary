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
router.use('/api', authorRoutes);
router.use('/api', bookRoutes);
router.use('/api', bookinstanceRoutes);
router.use('/api', genreRoutes);


export default router;
