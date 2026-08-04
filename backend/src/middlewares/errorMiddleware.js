export const notFoundHandler = (req, res, next) => {
  res.status(404).json({
    success: false,
    message: `API Route Not Found: [${req.method}] ${req.originalUrl}`,
    timestamp: new Date().toISOString()
  });
};

export const errorHandler = (err, req, res, next) => {
  console.error('Unhandled Exception:', err);
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  res.status(statusCode).json({
    success: false,
    message: err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' ? { stack: err.stack } : {}),
    timestamp: new Date().toISOString()
  });
};
