import HTTP_STATUS_CODES from 'http-status-codes';
import { CustomError } from './helpers/CustomErrors';
import { Request, Response } from 'express';

interface ErrorHandle {
  status: number;
  error: CustomError;
}

const getResponse = (
  type: string,
  message: string,
  status?: number
): ErrorHandle => ({
  status,
  error: new CustomError(type, message),
});

const mongooseError = (type: string, message: string): ErrorHandle => {
  /**
   * Handle mongoose error response by type
   */
  const errorResponseHandlers = {
    CastError: () => getResponse(type, message, HTTP_STATUS_CODES.BAD_REQUEST),
    ValidationError: () =>
      getResponse(type, message, HTTP_STATUS_CODES.BAD_REQUEST),
    default: () => getResponse(type, message),
  };

  const handle = errorResponseHandlers[type] || errorResponseHandlers.default;
  return handle();
};

const evalueError = (err: Error): ErrorHandle => {
  /**
   * Prevent sending infrasctructure errors to the client
   */
  const instance = err.constructor.name;
  const type = err.name;
  const { message, code = 'Error' } = <CustomError>err;

  const errorResponseHandlers = {
    MongooseError: () => mongooseError(type, message),
    MongoError: () => mongooseError(type, message),
    ValidationError: () =>
      getResponse(type, `${code}: ${message}`, HTTP_STATUS_CODES.BAD_REQUEST),
    default: () =>
      getResponse(
        type,
        'Error en servidor',
        HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR
      ),
  };
  const handle =
    errorResponseHandlers[instance] || errorResponseHandlers.default;
  return handle();
};

const globalErrors = (err: Error, req: Request, res: Response) => {
  const errorHandle: ErrorHandle = evalueError(err);
  return res.status(errorHandle.status).json({ errors: [errorHandle.error] });
};

export default globalErrors;
