import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { User } from '@modules/users/user.entity';
import { AuthService } from './auth.service';

export class AuthController {
  public async login(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;
    const service = container.resolve(AuthService);
    const { user, token } = await service.login({ email, password } as User);
    delete user.password;
    return res.json({ user, token });
  }
}
