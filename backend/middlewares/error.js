const errorHandler = (error, req, res, next) => {
  if (error === 'unique') {
    return res.status(error.status || 500).json({
      error: {
        message: 'That email is already taken, please use another email'
      }
    });
  }
  return res.status(error.status || 500).json({
    error: {
      message: error.message || 'oops, somthing went wrong'
    }
  });
};

module.exports = errorHandler;
