import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '@config/upload.config';
import jwtAuth from '../auth/auth.middleware';
import { UsersController } from './users.controller';

const router = Router();
const controller = new UsersController();
const upload = multer(uploadConfig);

// POST /users
router.post('/', controller.create);

// PATCH /users/avatar
router.patch('/avatar', jwtAuth, upload.single('file'), controller.updateAvatar);

export default router;
