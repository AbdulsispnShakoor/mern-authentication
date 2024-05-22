import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/dbConfig.js';
import { globalError } from './middlewares/globalError.js';
import CustomError from './utils/customeError.js';
import userRouter from './routes/auth.routes.js'
import cors from 'cors'

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
connectDB()


// app routes
app.use('/api/auth', userRouter)

app.get('/', (req, res) => {
    res.send('Hello World');
});
app.all('*', (req, res, next) => {
    // res.status(404).json({
    //     status: 'fail',
    //     message: `Can't find ${req.originalUrl} on the server!`
    // });
    // const err = new Error(`Can't find ${req.originalUrl} on the server!`);
    // err.status = 'fail';
    // err.statusCode = 404;
    const err = new CustomError(`Can't find ${req.originalUrl} on the server!`, 404);
    next(err);
});

app.use(globalError)
app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});