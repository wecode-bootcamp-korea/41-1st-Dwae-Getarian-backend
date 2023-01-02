function globalErrorHandler (error, req, res, next) {
    
    const statusCode = 500 || error.statusCode;
    
    res.status(statusCode).json({ message: error.message });
}


module.exports = {
    globalErrorHandler: globalErrorHandler
}