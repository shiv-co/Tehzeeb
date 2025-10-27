// This middleware handles 404 errors (Not Found)
const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error); // Pass the error to the next middleware
};

// This is the general error handler
// It catches any error that occurs in your routes
const errorHandler = (err, req, res, next) => {
  // Sometimes an error might come in with a 200 OK status,
  // set it to 500 (Internal Server Error) if so.
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message;

  // Specific check for Mongoose 'CastError' (e.g., a bad ObjectId)
  if (err.name === 'CastError' && err.kind === 'ObjectId') {
    statusCode = 404;
    message = 'Resource not found';
  }

  res.status(statusCode).json({
    message: message,
    // Show the stack trace only if we are not in 'production' mode
    stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack,
  });
};

export { notFound, errorHandler };
