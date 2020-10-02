import { container } from 'tsyringe';

import { IUsersRepository } from '../users/users.interface';
import { UsersRepository } from '../users/users.repository';

container.registerSingleton<IUsersRepository>('UsersRepository', UsersRepository);
