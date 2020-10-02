import { getRepository, Repository } from 'typeorm';
import { User } from './user.entity';
import { IUsersRepository } from './interfaces/users-repository.interface';

export class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  public async findById({ id }: User): Promise<User | undefined> {
    return this.repository.findOne(id);
  }

  public async findByEmail({ email }: User): Promise<User | undefined> {
    return this.repository.findOne({ where: { email } });
  }

  public async save(user: User): Promise<User> {
    return this.repository.save(user);
  }
}
