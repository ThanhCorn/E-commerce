import "dotenv/config";
import cartModel from "../models/cart.Model";
import userModel, { IUser } from "../models/user.Model";
import orderModel from "../models/order.Model";
import { Request, Response } from "express";
import { EmailData, sendEmail } from "./email.Controller";
import { generateRefreshToken } from "../utils/refreshToken";
import { generateToken } from "../utils/jwtToken";
import jwt from "jsonwebtoken";
import crypto from "crypto";
// import productModel from "../models/product.Model";
// import CouponModel from "../models/coupon.Model";
// import { v4 as uuidv4 } from "uuid";

// POST register
export const registerUser = async (req: Request, res: Response) => {
  const email = req.body.email;
  try {
    const existingEmail = await userModel.findOne({ email });

    if (existingEmail) {
      return res.status(409).json({ message: "Email already exists" });
    }

    const newUser: IUser = await userModel.create(req.body);
    return res.status(201).json(newUser);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

// POST Login
export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });
    if (!user || !(await user.isPasswordMatch(password))) {
      return res.status(404).json({ message: "invalid email or password" });
    }
    const refreshToken = await generateRefreshToken(user?._id);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const updateuser = await userModel.findByIdAndUpdate(
      user.id,
      {
        refreshToken: refreshToken,
      },
      { new: true }
    );
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 3 * 24 * 60 * 60 * 1000,
    });
    res.status(200).json({
      _id: user?._id,
      firstname: user?.firstName,
      lastname: user?.lastName,
      email: user?.email,
      phone: user?.phone,
      token: generateToken(user?._id),
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

//Admin Login
export const loginAdmin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const findAdmin = await userModel.findOne({ email });
    if (findAdmin?.role !== "admin") {
      return res.status(404).json({ message: "Not Authorized" });
    }
    if (!findAdmin || !(await findAdmin.isPasswordMatch(password))) {
      return res.status(404).json({ message: "invalid email or password" });
    }
    const refreshToken = await generateRefreshToken(findAdmin?._id);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const updateuser = await userModel.findByIdAndUpdate(
      findAdmin.id,
      {
        refreshToken: refreshToken,
      },
      { new: true }
    );
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 3 * 24 * 60 * 60 * 1000,
    });
    res.status(200).json({
      _id: findAdmin?._id,
      firstname: findAdmin?.firstName,
      lastname: findAdmin?.lastName,
      email: findAdmin?.email,
      phone: findAdmin?.phone,
      token: generateToken(findAdmin?._id),
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// POST Logout
export const logoutUser = async (req: Request, res: Response) => {
  res.clearCookie("refreshToken");
  return res.status(200).json({ message: "Logged out" });
};

// Save User Address
export const saveAddress = async (req: Request, res: Response) => {
  const { _id } = req.user;
  try {
    const findUser = await userModel.findByIdAndUpdate(
      _id,
      {
        address: req?.body?.address,
      },
      { new: true }
    );
    return res.status(200).json(findUser);
  } catch (error) {
    throw new Error("Internal server error");
  }
};
//GET RefreshToken
export const handleRefreshToken = async (req: Request, res: Response) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res.status(401).json({ message: "No Refresh token in Cookies" });
  }

  try {
    const user = await userModel.findOne({ refreshToken });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    jwt.verify(
      refreshToken,
      process.env.JWT_SECRET as string,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
      (err: any, decoded: any) => {
        if (err || user.id !== decoded.id) {
          return res.status(403).json({
            message: "There is something wrong with the refresh token",
          });
        }
        const accessToken = generateToken(user._id);
        res.json({ accessToken });
      }
    );
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(error.message);
  }
};

// GET all users
export const getAllUser = async (req: Request, res: Response) => {
  try {
    const getUsers = await userModel.find();
    return res.status(200).json(getUsers);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// GET user by id
export const getUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const getUser = await userModel.findById(id);
    return res.status(200).json(getUser);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// DELETE user by id
export const deletedUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const deleteUser = await userModel.findByIdAndDelete(id);
    if (deleteUser) {
      return res.status(200).json({
        message: "User deleted successfully",
      });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// PUT update user by id
export const updatedUser = async (req: Request, res: Response) => {
  const { _id } = req.user;
  try {
    const updateUser = await userModel.findByIdAndUpdate(
      _id,
      {
        firstname: req.body?.firstname,
        lastname: req.body?.lastname,
        phone: req.body?.phone,
        email: req.body?.email,
        role: req.body?.role,
      },
      { new: true }
    );
    return res.status(200).json(updateUser);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// get Blocked users
export const blockUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const blockuser = await userModel.findByIdAndUpdate(
      id,
      {
        isBlocked: true,
      },
      {
        new: true,
      }
    );
    res.json(blockuser);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const unblockUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const unblock = await userModel.findByIdAndUpdate(
      id,
      {
        isBlocked: false,
      },
      {
        new: true,
      }
    );
    res.json({
      message: "User UnBlocked",
    });
  } catch (error) {
    throw new Error("Internal server error");
  }
};

// Update Password
export const updatedPassword = async (req: Request, res: Response) => {
  const { _id } = req.user;
  const { oldPassword, newPassword } = req.body;
  try {
    const user = await userModel.findById(_id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user && (await user.isPasswordMatch(oldPassword))) {
      user.password = newPassword;
      await user.save();
      return res.status(200).json({ message: "Password Updated" });
    }
    return res.status(401).json({ message: "Password incorrect" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// POST forgot Password
export const forgotPassword = async (req: Request, res: Response) => {
  const { email } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      res.status(404).json({ message: "Email not found" });
    }
    const token = await user?.createPasswordResetToken();
    await user?.save();
    const resetUrl = `Hi, please click on the link to reset your password. This link is valid for 10 minutes only. 
    <a href="http://localhost:5000/api/user/reset-password/${token}">Reset Password</a>`;
    const data: EmailData = {
      to: email,
      text: "Hey User",
      subject: "Reset Password",
      html: resetUrl,
    };
    sendEmail(data, req, res);
    res.json(token);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).json(error.message);
  }
};

export const resetPassword = async (req: Request, res: Response) => {
  const { token } = req.params;
  const { password } = req.body;
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
  const user = await userModel.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });
  if (!user) {
    return res.status(400).json({ message: "Token is invalid or has expired" });
  }
  user.password = password;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();
  res.status(200).json(user);
};

export const getWishlist = async (req: Request, res: Response) => {
  const { _id } = req.user;
  try {
    const findUser = await userModel.findById(_id).populate("wishlist");
    res.status(200).json(findUser?.wishlist);
  } catch (error) {
    throw new Error("Internal server error");
  }
};

export const userCart = async (req: Request, res: Response) => {
  const { _id } = req.user;
  const { productId, color, quantity, price } = req.body;
  try {
    const newCart = await cartModel.create({
      userId: _id,
      productId,
      color,
      quantity,
      price,
    });
    res.status(200).json(newCart);
  } catch (error) {
    throw new Error("Internal server error");
  }
};

export const removeItemFromCart = async (req: Request, res: Response) => {
  const { _id } = req.user;
  const { cartItemId } = req.params;
  try {
    const cartItem = await cartModel.findOneAndRemove({
      userId: _id,
      _id: cartItemId,
    });
    res.status(200).json(cartItem);
  } catch (error) {
    throw new Error("Internal server error");
  }
};

export const updateQuantityItem = async (req: Request, res: Response) => {
  const { _id } = req.user;
  const { cartItemId, newQuantity } = req.params;
  try {
    const updatedItem = await cartModel.findOne({
      userId: _id,
      _id: cartItemId,
    });
    if (updatedItem) {
      updatedItem.quantity = Number(newQuantity);
      await updatedItem.save();
    }

    res.status(200).json(updatedItem);
  } catch (error) {
    throw new Error("Internal server error");
  }
};

export const getUserCart = async (req: Request, res: Response) => {
  const { _id } = req.user;
  try {
    const cart = await cartModel
      .find({ userId: _id })
      .populate("productId")
      .populate("color");
    res.status(200).json(cart);
  } catch (error) {
    throw new Error("Internal server error");
  }
};

export const createOrder = async (req: Request, res: Response) => {
  const { _id } = req.user;
  const {
    shippingInfo,
    orderItems,
    totalPrice,
    totalAfterDiscount,
    paymentInfo,
  } = req.body;
  try {
    const newOrder = await orderModel.create({
      user: _id,
      shippingInfo,
      orderItems,
      totalPrice,
      totalAfterDiscount,
      paymentInfo,
    });
    res.status(200).json({
      order: newOrder,
      success: true,
    });
  } catch (error) {
    throw new Error("Internal server error");
  }
};

export const getOrders = async (req: Request, res: Response) => {
  const { _id } = req.user;
  try {
    const userOrders = await orderModel
      .find({ orderedBy: _id })
      .populate("orderedBy");
    res.status(200).json(userOrders);
  } catch (error) {
    throw new Error("Internal server error");
  }
};

export const getAllOrders = async (req: Request, res: Response) => {
  try {
    const allOrders = await orderModel
      .find()
      .populate("orderedBy")
      .populate("products.product");
    res.status(200).json(allOrders);
  } catch (error) {
    throw new Error("Internal server error");
  }
};

export const getOrderId = async (req: Request, res: Response) => {
  const { id } = req.params;
  console.log(id);
  try {
    const findOrder = await orderModel
      .findById(id)
      .populate("orderedBy")
      .populate("products.product");
    res.status(200).json(findOrder);
  } catch (error) {
    throw new Error("Internal server error");
  }
};

export const updateOrderStatus = async (req: Request, res: Response) => {
  const { status } = req.body;
  const { id } = req.params;
  try {
    const findOrder = await orderModel.findByIdAndUpdate(
      id,
      {
        orderStatus: status,
        paymentIntent: {
          status: status,
        },
      },
      { new: true }
    );
    res.status(200).json(findOrder);
  } catch (error) {
    throw new Error("Internal server error");
  }
};
