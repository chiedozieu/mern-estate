import UserModel from "../models/user.model.js";
import bcryptjs from 'bcryptjs'

export const SignUp = async (req, res, next) =>{
try {
    const {username, email, password} = req.body

    if(!username || !password || !username){
        throw new Error('Provide all required parameters')
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