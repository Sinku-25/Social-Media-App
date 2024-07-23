const globalError = (err, req, res, next) => {
    res.status(err.statusCode).json({ err: err.message });
  }
  export default globalError;