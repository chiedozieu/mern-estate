import bcryptjs from 'bcryptjs';
import UserModel from '../models/user.model.js';
import { errorHandler } from '../utils/errorHandler.js';

export const updateUser = async (req, res, next) => {
    if (req.user.id !== req.params.id) return next(errorHandler(401, 'You can only update your account'));

    try {
        const updates = {};
        if (req.body.username) {
            updates.username = req.body.username;
        }
        if (req.body.email) {
            updates.email = req.body.email;
        }
        if (req.body.password) {
            updates.password = bcryptjs.hashSync(req.body.password, 10);
        }
        if (req.body.avatar) {
            updates.avatar = req.body.avatar;
        }

        const updatedUser = await UserModel.findByIdAndUpdate(req.params.id, {
            $set: updates
        }, { new: true });

        const { password, ...rest } = updatedUser._doc;

        res.status(200).json({
            rest,
            message: 'User updated successfully',
            success: true,
            error: false
        });

    } catch (error) {
        next(error);
    }
};
