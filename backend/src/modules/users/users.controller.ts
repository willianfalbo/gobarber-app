import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { UsersService } from './users.service';
import { User } from './user.entity';

export class UsersController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { name, email, password } = req.body;
    const service = container.resolve(UsersService);
    const user = await service.create({ name, email, password } as User);
    delete user.password;
    return res.json(user);
  }

  public async updateAvatar(req: Request, res: Response): Promise<Response> {
    const service = container.resolve(UsersService);
    const user = await service.updateAvatar({
      id: req.userId,
      avatarFilename: req.file.filename,
    } as User);
    delete user.password;
    return res.json(user);
  }
}
