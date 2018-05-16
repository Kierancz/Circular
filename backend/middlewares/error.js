const errorHandler = (error, request, response, next) => {
  if (error === 'unique') {
    return response.status(error.status || 500).json({
      error: {
        message: 'That email is already taken, please use another email'
      }
    });
  }
  return response.status(error.status || 500).json({
    error: {
      message: error.message || 'oops, somthing went wrong'
    }
  });
};

module.exports = errorHandler;
