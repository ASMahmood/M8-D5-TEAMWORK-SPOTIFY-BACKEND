const catchAllHandler = (err, req, res, next) => {
  if (!res.headersSent) {
    res.status(500).send(err);
  }
};

module.exports = catchAllHandler;
