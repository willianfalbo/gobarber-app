import { Request, Response, NextFunction } from 'express';
import HttpException from '../modules/shared/http-exception.model';

function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
): any {
  console.error(err);

  if (err instanceof HttpException) {
    return res.status(err.statusCode).json({
      status: 'Error',
      message: err.message,
    });
  }

  return res.status(500).json({
    status: 'Error',
    message: 'Internal server error',
  });
}

export default errorHandler;
