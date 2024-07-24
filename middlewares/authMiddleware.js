import jwt from 'jsonwebtoken';

export default function (req, res, next) {
    const token = req.header('Authorization');
    console.log('Authorization Header:', token);
    if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });

    try {
        const decoded = jwt.verify(token.split(' ')[1], 'secret');
        console.log('Decoded Token:', decoded);
        req.user = decoded.user;
        next();
    } catch (err) {
        console.error('Token Error:', err);
        res.status(401).json({ msg: 'Token is not valid' });
    }
};
