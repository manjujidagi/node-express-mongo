const { verifyToken, decodeToken } = require('./auth.util');

exports.isAuthenticated = async (req, res, next) => {
    let token = req.headers['token'];
    if (!token) {
        return res.status(401).json({ error: 'Unauthorized', error_code: '|unauthorized|', status: 401 });
    }

    let isTokenValid = verifyToken(token);
    if (!isTokenValid) {
        return res.status(401).json({ error: 'Unauthorized', error_code: '|unauthorized|', status: 401 });
    }

    res.user = await decodeToken(token);

    next();
}
