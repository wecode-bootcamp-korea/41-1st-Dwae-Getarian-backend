function globalErrorHandler (err, req, res, next) {
    
    const statusCode = 500 || err.statusCode;
    
    res.status(statusCode).json({ message: err.message });
}


module.exports = {
    globalErrorHandler
}
