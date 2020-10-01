import { Router } from 'express';
import appointmentsRoute from './modules/appointments/appointments.route';
import usersRoute from './modules/users/users.route';
import authRoute from './modules/auth/auth.route';

const routes = Router();

routes.use('/appointments', appointmentsRoute);
routes.use('/users', usersRoute);
routes.use('/auth', authRoute);

export default routes;
