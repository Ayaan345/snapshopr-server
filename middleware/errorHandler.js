exports.notFound = (req, res, next) => {
  res.status(404).json({ error: "Route not found" });
};


exports.errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    error: err.message || "Server Error"
  });
};
