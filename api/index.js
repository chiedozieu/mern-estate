import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';


dotenv.config()

const app = express();



app.listen(3000, () => {
    console.log('Server listening on port 3000');
})

mongoose.connect(process.env.MONGO).then(() => {
    console.log('Mongoose connected')
}).catch(error => console.log('Error connecting to database: ' + error));
