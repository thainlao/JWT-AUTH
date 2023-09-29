const ApiError = require('../exeptions/api-error');

const errorMiddleware = (err, req, res, next) => {
  console.error(err);

  if (err instanceof ApiError) {
    return res.status(err.status).json({ message: err.message });
  }

  return res.status(500).json({ message: 'Что-то пошло не так' });
};

module.exports = errorMiddleware;