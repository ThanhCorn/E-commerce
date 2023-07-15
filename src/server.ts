import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import userRouter from './routes/userRoutes';
import { notFound, errorHandler } from './middleware/errorMiddleware';
import { connectDB } from './config/database';
import cookieParser = require('cookie-parser');

const app = express();

connectDB();

app.use(morgan('dev'));
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api/user', userRouter);

app.use(notFound);
app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
