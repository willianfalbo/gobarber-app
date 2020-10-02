import { User } from '../user.entity';

export interface IUsersRepository {
  findById({ id }: User): Promise<User | undefined>;
  save(user: User): Promise<User>;
  findByEmail({ email }: User): Promise<User | undefined>;
}
