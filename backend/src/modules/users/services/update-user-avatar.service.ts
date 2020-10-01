import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';
import { StatusCodes } from 'http-status-codes';
import uploadConfig from '@config/upload.config';
import HttpException from '@shared/http-exception.model';
import User from '../user.entity';

interface Request {
  userId: string;
  avatarFilename: string;
}

class UpdateUserAvatarService {
  public async execute({ userId, avatarFilename }: Request): Promise<User> {
    const repository = getRepository(User);

    const user = await repository.findOne(userId);
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
    await repository.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;
