import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoute from './routes/auth.route.js';


dotenv.config()

const app = express();

app.use(express.json());


app.listen(3000, () => {
    console.log('Server listening on port 3000');
})

mongoose.connect(process.env.MONGO).then(() => {
    console.log('Mongoose connected')
}).catch(error => console.log('Error connecting to database: ' + error));

// app.use('/api/users', userRoute)
app.use('/api/auth', authRoute)

// middleware for error

app.use((err, req, res, next,) => {
    const statuscode =err.statusCode || 500;
    const message = err.message || 'Internal Server error';
    res.status(statuscode).json({
        message, 
        success: false,
        statuscode
    });
})