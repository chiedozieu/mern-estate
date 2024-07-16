import UserModel from "../models/user.model.js";
import bcryptjs from 'bcryptjs'
import { errorHandler } from "../utils/errorHandler.js";
import jwt from 'jsonwebtoken'

export const SignUp = async (req, res, next) =>{
try {
    const {username, email, password} = req.body

    if(!username || !password || !username){
        throw new Error('Provide all required parameters')
    }
    const userExist = await UserModel.findOne({email})
    if(userExist){
        throw new Error('User already exists')  // We can use the error handler we created here instead
    }
    const hashedPassword = bcryptjs.hashSync(password, 10)

    const newUser = new UserModel({username, email, password: hashedPassword})


        await newUser.save()
        res.json({
            message: 'User created successfully',
            data: newUser,
            error: false,
            success: true
        })
} catch (error) {
      next(error)
    }
    
}



export const SignIn = async (req, res, next) => {
    try {
        const { email, password } = req.body  
        const validUser = await UserModel.findOne({email})
        if(!validUser) return next(errorHandler(404, 'User not found'));
        const validPassword = bcryptjs.compareSync(password, validUser.password)
        if(!validPassword) return next(errorHandler(401, 'Wrong credentials'));

        const token = jwt.sign({id: validUser._id}, process.env.JWT_SECRET_KEY);

//Important to remove the password field before sending the json
        const { password: passW, ...rest } = validUser._doc
        res.cookie('access_token', token, {httpOnly: true, secure: true}).json({
            rest,
            message: 'Login successful',
            success: true,
            error: false
        });

    } catch (error) {
         next(error)
    }

   
}

export const Google = async (req, res, next) => {
    try {
 // signing in the user if the user exists, otherwise register the user
        const validUser = await UserModel.findOne({email: req.body.email})
        if (validUser) {
            const token = jwt.sign({id: validUser._id}, process.env.JWT_SECRET_KEY);
            const { password: passW, ...rest } = validUser._doc
            res.cookie('access_token', token, {httpOnly: true, secure: true}).status(200).json({ rest,
                message: 'Login successful',
                success: true,
                error: false})
        }else{
// register user, first create a new password for them since password is 
//required and google auth don't request for password
            const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8) 
            const hashedPassword = bcryptjs.hashSync(generatedPassword, 10)
            const newUser = new UserModel({username: req.body.name.split(' ').join('').toLowerCase() + Math.random().toString(36).slice(-3), email: req.body.email, password: hashedPassword, avatar: req.body.photo})
            await newUser.save();
            const token = jwt.sign({id: newUser._id}, process.env.JWT_SECRET_KEY);
            const { password: passW, ...rest } = newUser._doc
            res.cookie('access_token', token, {httpOnly: true, secure: true}).status(200).json({ rest,
                message: 'Login successful',
                success: true,
                error: false})
        }
    } catch (error) {
        next(error)
    } 
};