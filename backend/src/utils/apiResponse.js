export const sendSuccess = (res, message = 'Operation successful', data = null, statusCode = 200, meta = {}) => {
  return res.status(statusCode).json({
    success: true,
    message,
    ...(data !== null ? { data } : {}),
    ...(Object.keys(meta).length > 0 ? { meta } : {}),
    timestamp: new Date().toISOString()
  });
};

export const sendError = (res, message = 'Internal Server Error', statusCode = 500, errors = null) => {
  return res.status(statusCode).json({
    success: false,
    message,
    ...(errors ? { errors } : {}),
    timestamp: new Date().toISOString()
  });
};

export const sendPaginated = (res, message, data, page, limit, totalDocs) => {
  const totalPages = Math.ceil(totalDocs / limit);
  return res.status(200).json({
    success: true,
    message,
    data,
    meta: {
      currentPage: Number(page),
      limit: Number(limit),
      totalDocs,
      totalPages,
      hasNextPage: Number(page) < totalPages,
      hasPrevPage: Number(page) > 1
    },
    timestamp: new Date().toISOString()
  });
};
