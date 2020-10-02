import { container } from 'tsyringe';

import { IUsersRepository } from '@modules/users/interfaces/users-repository.interface';
import { UsersRepository } from '@modules/users/users.repository';

import { IAppointmentsRepository } from '@modules/appointments/interfaces/appointments-repository.interface';
import { AppointmentsRepository } from '@modules/appointments/appointments.repository';

container.registerSingleton<IUsersRepository>('UsersRepository', UsersRepository);

container.registerSingleton<IAppointmentsRepository>(
  'AppointmentsRepository',
  AppointmentsRepository,
);
