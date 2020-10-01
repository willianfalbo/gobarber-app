import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { StatusCodes } from 'http-status-codes';
import authConfig from '@config/auth.config';
import HttpException from '@shared/http-exception.model';

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

function jwtAuth(req: Request, res: Response, next: NextFunction): void {
  const { authorization } = req.headers;

  if (!authorization) {
    throw new HttpException('Missing JWT Token', StatusCodes.UNAUTHORIZED);
  }

  const [, token] = authorization.split(' ');

  try {
    const decodedToken = verify(token, authConfig.secret);
    const { sub } = decodedToken as TokenPayload;

    req.userId = sub;

    return next();
  } catch {
    throw new HttpException('Invalid JWT token', StatusCodes.UNAUTHORIZED);
  }
}

export default jwtAuth;
