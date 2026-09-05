import User from '../models/user.model.js';

export const requireRole = (roles) => {
    return async (req, res, next) => {
        try {
            if (!req.userId) {
                return res.status(401).json({ message: 'Unauthorized' });
            }
            const user = await User.findById(req.userId);
            if (!user) {
                return res.status(401).json({ message: 'User not found' });
            }
            if (!roles.includes(user.role)) {
                return res.status(403).json({ message: 'Forbidden: insufficient role' });
            }
            req.userRole = user.role;
            next();
        } catch (error) {
            return res.status(500).json({ message: `Role check error: ${error.message || error}` });
        }
    };
};
