// send json response after controller file
export const globalResponce = (err, req, res, next) => {
  if (err) {
    return res.status(err['cause'] || 500).json({
      message: "Something went wrong",
      errorMessage: err.message,
      errorLocation: err.stack,
    });
  }
};
