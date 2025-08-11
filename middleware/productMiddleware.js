const jwt = require('jsonwebtoken');

const verify = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer'))
        return res.status(401).json({ success: false, message: 'Unauthorized: Missing or invalid token format ' });
    const token = authHeader.split(" ")[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
      console.error("Jwt verification error", err.message);
      if (err instanceof jwt.TokenExpiredError) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized: Token has expired",
        });
      } else if (err instanceof jwt.JsonWebTokenError) {
          return res
            .status(401)
            .json({
              success: false,
              message: "Unauthorized: Invalid token signature",
            });
      }
      res
        .status(401)
        .json({
          success: true,
          message: "unauthorized Authentication failed",
          error: err.message,
        });
    }

}
    
module.exports = verify;
