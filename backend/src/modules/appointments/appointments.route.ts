import { Router } from 'express';
import jwtAuth from '../auth/auth.middleware';
import { AppointmentsController } from './appointments.controller';

const router = Router();
const controller = new AppointmentsController();

// placing this line on top adds this middleware for all routes in this file
router.use(jwtAuth);

// GET /appointments
router.get('/', controller.list);

// POST /appointments
router.post('/', controller.create);

export default router;
