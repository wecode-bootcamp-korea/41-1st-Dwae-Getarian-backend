require("dotenv").config();

const jwt = require("jsonwebtoken");

async function jwtVerify (req, res, next) {
    try {
        const token = req.headers.authorization;
				console.log(token)

        if (!token) {
            const err = new Error("Invalid Token (AUTH.JS)");
            err.statusCode(401);
    
            throw err;
        }
    
        const decoded = await jwt.verify(token, process.env.SECRET_KEY);
    
        if (!decoded) {
            const err = new Error("Decoding Failed!!! (AUTH.JS)");
            err.statusCode(401);
    
            throw err;
        }
    
        req.id = decoded.userId;
        
    } catch(err) {
        next(err);
    }
}

module.exports = {
    jwtVerify
}