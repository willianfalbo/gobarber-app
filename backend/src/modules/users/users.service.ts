import { hash } from 'bcryptjs';
import path from 'path';
import fs from 'fs';
import { StatusCodes } from 'http-status-codes';
import { injectable, inject } from 'tsyringe';
import HttpException from '@shared/http-exception.model';
import uploadConfig from '@config/upload.config';
import { User } from './user.entity';
import { IUsersRepository } from './interfaces/users-repository.interface';
import { IUsersService } from './interfaces/users-service.interface';

@injectable()
export class UsersService implements IUsersService {
  constructor(
    @inject('UsersRepository')
    private repository: IUsersRepository,
  ) { }

  public async create({ name, email, password }: User): Promise<User> {
    const userExists = await this.repository.findByEmail({ email } as User);
    if (userExists) {
      throw new HttpException('Email address already exists.');
    }

    const hashedPassword = await hash(password, 8);

    const user = this.repository.save({
      name,
      email,
      password: hashedPassword,
    } as User);

    return user;
  }

  public async updateAvatar({ id, avatarFilename }: User): Promise<User> {
    const user = await this.repository.findById({ id } as User);
    if (!user) {
      throw new HttpException('User not found.', StatusCodes.NOT_FOUND);
    }

    if (user.avatarFilename) {
      const avatarUri = path.join(uploadConfig.directory, user.avatarFilename);
      const avatarFileExists = await fs.promises.stat(avatarUri);

      if (avatarFileExists) {
        await fs.promises.unlink(avatarUri);
      }
    }

    user.avatarFilename = avatarFilename;
    await this.repository.save(user);

    return user;
  }

  public async findById({ id }: User, throwErrorIfNotExist = true): Promise<User | undefined> {
    const user = await this.repository.findById({ id } as User);
    if (!user && throwErrorIfNotExist) {
      throw new HttpException('User not found.', StatusCodes.NOT_FOUND);
    }
    return user;
  }

  public async findByEmail(
    { email }: User,
    throwErrorIfNotExist = true,
  ): Promise<User | undefined> {
    const user = await this.repository.findByEmail({ email } as User);
    if (!user && throwErrorIfNotExist) {
      throw new HttpException('Email not found.', StatusCodes.NOT_FOUND);
    }
    return user;
  }
}
