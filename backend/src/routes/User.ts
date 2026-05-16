import { authMiddleware, AuthRequest } from '../middleware/authMiddleware';
import { Router } from "express";
import { User } from "../models/Users";
import { catchAsync } from '../utils/catchAsync';
import { AppError } from '../utils/AppError';

const router = Router();

router.get('/me', authMiddleware, catchAsync(async (req: AuthRequest, res, next) => {
    const userId = req.user?.userId;
    const user = await User.findById(userId).select('-password');
    
    if (!user) {
        return next(new AppError("Utente non trovato", 404));
    }
    
    res.json({
        id: user._id,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt
    });
}));

export default router;