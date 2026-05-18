import { Router } from 'express';
import bcrypt from 'bcrypt';
import { User } from '../models/Users';
import jwt from 'jsonwebtoken';
import { validate } from '../middleware/validateMiddleware';
import { registerSchema, loginSchema } from '@atlasscale/shared';
import { catchAsync } from '../utils/catchAsync';
import { AppError } from '../utils/AppError';
import { Request, Response, NextFunction } from 'express';

const router = Router();

router.post('/register', validate(registerSchema), catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return next(new AppError("Questa email è già registrata", 400));
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newUser = new User({
        email,
        password: hashedPassword
    });

    await newUser.save();

    res.status(201).json({ message: "Utente creato con successo!" });
}));


router.post('/login', validate(loginSchema), catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    
    if (!user) {
        return next(new AppError("Credenziali non valide", 401));
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return next(new AppError("Credenziali non valide", 401));
    }

    const token = jwt.sign(
        { userId: user._id, email: user.email },
        process.env.JWT_SECRET as string,
        { expiresIn: '8h' }
    );

    res.json({
        token,
        user: { 
            id: user._id, 
            email: user.email,
            role: user.role 
        }
    });
}));

export default router;