require("dotenv").config();

const jwt = require("jsonwebtoken");

async function jwtVerify (req, res, next) {
    try {
        const token = req.headers.authorization;

        if (!token) {
            const err = new Error({ message: "Invalid Token (AUTH.JS)" });
            err.status(401);
    
            throw new err;
        }
    
        const decoded = await jwt.verify(token, process.env.SECRET_KEY);
    
        if (!decoded) {
            const err = new Error({ message: "Decoding Failed!!! (AUTH.JS)" });
            err.status(401);
    
            throw new err;
        }
    
        req.userId = decoded.userId;
        req.cartId = decoded.cartId;
        
    } catch(err) {
        next(err);
    }
}

module.exports = {
    jwtVerify
}