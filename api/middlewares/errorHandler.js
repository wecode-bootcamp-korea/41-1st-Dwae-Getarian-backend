function asyncErrorHandler(func) {
	return async(req, res, next) => {
		func(req, res).catch((err) => next(err));
	}
}

function globalErrorHandler (err, req, res, next) {
    
    const statusCode = 500 || err.statusCode;
    
    res.status(statusCode).json({ message: err.message });
}


module.exports = {
	asyncErrorHandler,
  globalErrorHandler
}