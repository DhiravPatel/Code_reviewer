export const successResponse = (data: any, message = 'Success') => {
  return {
    success: true,
    message,
    data,
  };
};

export const errorResponse = (message = 'An error occurred', statusCode = 500, errors: any = null) => {
  return {
    success: false,
    message,
    ...(errors && { errors }),
  };
};
