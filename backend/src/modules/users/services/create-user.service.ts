import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import HttpException from '@shared/http-exception.model';
import User from '../user.entity';

interface Request {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  public async execute({ name, email, password }: Request): Promise<User> {
    const repository = getRepository(User);

    const userExists = await repository.findOne({ where: { email } });
    if (userExists) {
      throw new HttpException('Email address already exists.');
    }

    const hashedPassword = await hash(password, 8);

    const user = repository.create({
      name,
      email,
      password: hashedPassword,
    });

    await repository.save(user);

    return user;
  }
}

export default CreateUserService;
