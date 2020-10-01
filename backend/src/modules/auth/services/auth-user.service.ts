import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { StatusCodes } from 'http-status-codes';
import authConfig from '@config/auth.config';
import HttpException from '@shared/http-exception.model';
import User from '../../users/user.entity';

interface Request {
  email: string;
  password: string;
}

interface Response {
  user: User;
  token: string;
}

class AuthenticateUserService {
  public async execute({ email, password }: Request): Promise<Response> {
    const repository = getRepository(User);

    const user = await repository.findOne({ where: { email } });
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

export default AuthenticateUserService;
