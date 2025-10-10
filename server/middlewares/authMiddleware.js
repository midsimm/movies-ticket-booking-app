const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];

        if (!token) {
            res.json({
                success: false,
                message: "No token provided, kindly login to get access",
            })
        }

        const isValidToken = jwt.verify(token, `${process.env.SECRET_KEY}`);

        if (isValidToken) {
            req.body.userId = isValidToken.userId;
            next();
        } else {
            res.json({
                success: false,
                message: "Token is expired, kindly login again",
            })
        }
        next();
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}