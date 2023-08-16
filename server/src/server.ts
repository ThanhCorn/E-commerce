import "dotenv/config";
import path from "path";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import userRouter from "./routes/user.Routes";
import productRouter from "./routes/product.Routes";
import blogRouter from "./routes/blog.Routes";
import categoryRouter from "./routes/productCategory.Routes";
import blogCategoryRouter from "./routes/blogCategory.Routes";
import brandRouter from "./routes/brand.Routes";
import couponRouter from "./routes/coupon.Routes";
import contactRouter from "./routes/contact.Routes";
import colorRouter from "./routes/color.Routes";
import uploadRouter from "./routes/upload.Routes";
import stripeRouter from "./routes/stripe.Routes";
import { notFound, errorHandler } from "./middleware/errorMiddleware";
import { connectDB } from "./config/database";
import cookieParser from "cookie-parser";

const app = express();

// Connect to the database
connectDB();

// Middleware

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());

// Serve static files
app.use(express.static(path.join(__dirname, "..", "public")));

const apiURL = "https://e-commerce-api-thanhcorn.vercel.app";

// Routes
app.use(`${apiURL}/api/user`, userRouter);
app.use(`${apiURL}/api/product`, productRouter);
app.use(`${apiURL}/api/blog`, blogRouter);
app.use(`${apiURL}/api/category`, categoryRouter);
app.use(`${apiURL}/api/blog-category`, blogCategoryRouter);
app.use(`${apiURL}/api/brand`, brandRouter);
app.use(`${apiURL}/api/coupon`, couponRouter);
app.use(`${apiURL}/api/color`, colorRouter);
app.use(`${apiURL}/api/contact`, contactRouter);
app.use(`${apiURL}/api/upload`, uploadRouter);
app.use(`${apiURL}/api/stripe`, stripeRouter);
// Error handling middleware
app.use(notFound);
app.use(errorHandler);

// Start the server
app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
