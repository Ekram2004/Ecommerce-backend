const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    const header = req.headers.authorization;
    if (!header || !header.startsWith('Bearer'))
        return res.status(401).json({ message: 'unauthorized' });

    const token = header.split(' ')[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ message: "Invalid token" });
    }
}

const isAdmin = (req, res, next) => {
    if (!req.user)
        return res.status(401).json({ message: "Not authenticated" });
    if (req.user.role !== 'admin')
        return res.status(403).json({ message: "Admins only" });
    next();
};

module.exports = {auth, isAdmin};