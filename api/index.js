import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoute from './routes/auth.route.js';
import userRoute from './routes/user.route.js'
import listingRoute from './routes/listing.route.js'
import cookieParser from 'cookie-parser';


dotenv.config()

const app = express();
app.use(cookieParser())
app.use(express.json());




app.listen(3000, () => {
    console.log('Server listening on port 3000');
})

mongoose.connect(process.env.MONGO).then(() => {
    console.log('Mongoose connected')
}).catch(error => console.log('Error connecting to database: ' + error));


app.use('/api/auth', authRoute)
app.use('/api/user', userRoute)
app.use('/api/listing', listingRoute)

// middleware for error

app.use((error, req, res, next,) => { 
    const statuscode =error.statusCode || 500;
    const message = error.message || 'Internal Server error';
    res.status(statuscode).json({
        message, 
        success: false,
        statuscode
    });
})