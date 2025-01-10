import { ApiError} from '../utils/ApiError.util.js';
import { ApiResponse } from '../utils/ApiResponse.util.js';

const errorHandler = (err, res) => {
  if (err instanceof ApiError) {
    const { statusCode, message, errors } = err;
    const response = new ApiResponse(statusCode, null, message);
    response.success = false;
    response.errors = errors;
    return res.status(statusCode).json(response);
  }

  const unexpectedError = new ApiResponse(500, null, 'Internal Server Error');
  unexpectedError.success = false;
  unexpectedError.errors = [err.message];
  return res.status(500).json(unexpectedError);
};

export default errorHandler;
