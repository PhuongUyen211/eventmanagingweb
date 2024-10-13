const jwt = require('jsonwebtoken');
const JWT_SECRET = 'hello_world_2112205';

const authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res
            .status(401)
            .json({ message: 'Không có quyền truy cập hoặc chưa đăng nhập.' });
    }

    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = { id: decoded.userId }; // Lưu userId vào req.user
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Token không hợp lệ.' });
    }
};

module.exports = authenticate;
