export const removeHeader = (req, res, next) => {
  res.removeHeader("X-Powered-By");
  next();
};
