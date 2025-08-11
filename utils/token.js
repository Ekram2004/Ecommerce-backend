const jwt = require('jsonwebtoken');

function signAccessToken(userId) {
    return jwt.sign({ sub: userId }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN || "15M",
    });
}

function signRefreshToken(userId) {
    return jwt.sign({ sub: userId }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN || '7d' });
}

module.exports = { signAccessToken, signRefreshToken };