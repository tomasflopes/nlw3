import { ErrorRequestHandler } from 'express';

const errorHandler: ErrorRequestHandler = (error, request, response, next) => {
  console.error(error);

  return response.status(500).json({ Message: 'Internal Server Error' });
};

export default errorHandler;
