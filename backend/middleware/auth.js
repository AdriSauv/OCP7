const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
        const userId = decodedToken.userId;
        req.auth = {
            userId: userId
        };
        if (req.params.userId && req.params.userId !== req.userId) {
            throw new Error('Unauthorized request')
        }
        next();
    } catch (error) {
        res.status(403).json({ error: error.message });
    }
};