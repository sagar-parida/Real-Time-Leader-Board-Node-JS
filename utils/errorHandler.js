class errorHandler extends Error {
  constructor(message, statusCode) {
    super(message);
    console.log(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith(4) ? "Failed" : "Error";
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = errorHandler;
