import bcryptjs from 'bcryptjs';
import UserModel from '../models/user.model.js';
import { errorHandler } from '../utils/errorHandler.js';
import ListingModel from '../models/listing.model.js';

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


export const deleteUser = async (req, res, next) => {
    if (req.user.id !== req.params.id) return next(errorHandler(401, 'You can only delete your account'));
    try {
        await UserModel.findByIdAndDelete(req.params.id)
        res.clearCookie('access_token')
        
        res.status(200).json({success: true, message:'User deleted'})
    } catch (error) {
       next(error) 
    }
};

export const getUserListings = async (req, res, next) => {
    if(req.user.id === req.params.id){
        try {
            const listings = await ListingModel.find({ userRef: req.params.id})
            res.status(200).json(listings)
        } catch (error) {
            
        }
    } else {
        next(errorHandler(401, 'You can only view your listing'))
    }
};


export const getOwner = async (req, res, next) => {
    try {
        const user = await UserModel.findById(req.params.id)
        if (!user) return next(errorHandler(404, 'User not found'))
    
            const { password: pass, ...rest } = user._doc
            res.status(200).json(rest)     
    } catch (error) {
       next(error) 
    }
};