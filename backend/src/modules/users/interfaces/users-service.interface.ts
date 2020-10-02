import { User } from '../user.entity';

export interface IUsersService {
  create({ name, email, password }: User): Promise<User>;
  updateAvatar({ id, avatarFilename }: User): Promise<User>;
  findById({ id }: User, throwErrorIfNotExist?: boolean): Promise<User | undefined>;
  findByEmail({ email }: User, throwErrorIfNotExist?: boolean): Promise<User | undefined>;
}
