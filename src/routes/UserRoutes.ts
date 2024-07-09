import HttpStatusCodes from '@src/common/HttpStatusCodes';

import UserService from '@src/services/UserService';
import { IUser } from '@src/models/User';
import { IReq, IRes } from './types/express/misc';
import express, { Request, Response } from 'express';

const userController = {
  getAll: async (_: IReq<void>, res: IRes) => {
    return res;
  },
  add: async (req: IReq<{ user: IUser; }>, res: IRes) => {
    return res;
  },
  update: async (req: IReq<{ user: IUser; }>, res: IRes) => {
    return res;
  },
  delete: async (req: IReq<{ id: string; }>, res: IRes) => {
    return res;
  }
};

const router = express.Router();

router.get('/', (req: Request, res: Response) => {
  res.send('respond with a resource');
});
router.post('/users', async (req: Request, res: Response) => userController.add(req, res));
router.put('/users/:id', async (req: Request, res: Response) => userController.update(req, res));
router.delete('/users/:id', async (req: Request, res: Response) => userController.delete(req, res));

export default router;