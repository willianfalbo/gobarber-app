import { container } from 'tsyringe';

import { IUsersRepository } from '../users/interfaces/users-repository.interface';
import { UsersRepository } from '../users/users.repository';

import { IAppointmentsRepository } from '../appointments/interfaces/appointments-repository.interface';
import { AppointmentsRepository } from '../appointments/appointments.repository';

container.registerSingleton<IUsersRepository>('UsersRepository', UsersRepository);

container.registerSingleton<IAppointmentsRepository>(
  'AppointmentsRepository',
  AppointmentsRepository,
);
