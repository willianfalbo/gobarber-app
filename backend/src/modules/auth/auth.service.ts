import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { StatusCodes } from 'http-status-codes';
import { container, injectable } from 'tsyringe';
import authConfig from '@config/auth.config';
import HttpException from '@shared/http-exception.model';
import { User } from '@modules/users/user.entity';
import { UsersService } from '@modules/users/users.service';

@injectable()
export class AuthService {
  public async login({ email, password }: User): Promise<{ user: User; token: string }> {
    const usersService = container.resolve(UsersService);

    const user = await usersService.findByEmail({ email } as User, false);
    if (!user) {
      throw new HttpException('Invalid credentials', StatusCodes.UNAUTHORIZED);
    }

    const passwordMatches = await compare(password, user.password);
    if (!passwordMatches) {
      throw new HttpException('Invalid credentials', StatusCodes.UNAUTHORIZED);
    }

    const token = sign({}, authConfig.secret, {
      subject: user.id,
      expiresIn: authConfig.expiresIn,
    });

    return { user, token };
  }
}
