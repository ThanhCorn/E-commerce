import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import userRouter from './routes/user.Routes';
import productRouter from './routes/product.Routes';
import blogRouter from './routes/blog.Routes';
import categoryRouter from './routes/productCategory.Routes';
import { notFound, errorHandler } from './middleware/errorMiddleware';
import { connectDB } from './config/database';
import cookieParser from 'cookie-parser';

const app = express();

// Connect to the database
connectDB();

// Middleware
app.use(morgan('dev'));
app.use(
  cors({
    origin: 'http://localhost:5000',
    credentials: true,
  }),
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/user', userRouter);
app.use('/api/product', productRouter);
app.use('/api/blog', blogRouter);
app.use('/api/category', categoryRouter);

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

// Start the server
app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
