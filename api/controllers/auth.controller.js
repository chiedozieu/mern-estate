import UserModel from "../models/user.model.js";
import bcryptjs from 'bcryptjs'

export const SignUp = async (req, res) =>{
 try {
    const {username, email, password} = req.body

    if(!username || !password || !username){
        throw new Error('Provide all required parameters')
    }
    const userExist = await UserModel.findOne({email})

    if (userExist){
        throw new Error('User already exists')
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
        res.status(400).json({
            message: error?.message || error,
            error: true,
            success: false
        })
    }
    
}