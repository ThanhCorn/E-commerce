import { generateToken } from '../utils/jwtToken';
import { generateRefreshToken } from '../utils/refreshToken';
import { Request, Response } from 'express';
import UserModel, { IUser } from '../models/user.Model';
import CartModel, { ICart } from '../models/cart.Model';
import 'dotenv/config';
import jwt from 'jsonwebtoken';
import { EmailData, sendEmail } from './email.Controller';
import crypto from 'crypto';
import ProductModel from '../models/product.Model';
import CouponModel from '../models/coupon.Model';

// POST register
export const registerUser = async (req: Request, res: Response) => {
  const email = req.body.email;
  try {
    const existingEmail = await UserModel.findOne({ email });

    if (existingEmail) {
      return res.status(409).json({ message: 'Email already exists' });
    }

    const newUser: IUser = await UserModel.create(req.body);
    return res.status(201).json(newUser);
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// POST Login
export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });
    if (!user || !(await user.isPasswordMatch(password))) {
      return res.status(404).json({ message: 'invalid email or password' });
    }
    const refreshToken = await generateRefreshToken(user?._id);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const updateuser = await UserModel.findByIdAndUpdate(
      user.id,
      {
        refreshToken: refreshToken,
      },
      { new: true },
    );
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      maxAge: 3 * 24 * 60 * 60 * 1000,
    });
    res.status(200).json({
      _id: user?._id,
      firstname: user?.firstname,
      lastname: user?.lastname,
      email: user?.email,
      phone: user?.phone,
      token: generateToken(user?._id),
    });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

//Admin Login
export const loginAdmin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const findAdmin = await UserModel.findOne({ email });
    if (findAdmin?.role !== 'admin') {
      return res.status(404).json({ message: 'Not Authorized' });
    }
    if (!findAdmin || !(await findAdmin.isPasswordMatch(password))) {
      return res.status(404).json({ message: 'invalid email or password' });
    }
    const refreshToken = await generateRefreshToken(findAdmin?._id);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const updateuser = await UserModel.findByIdAndUpdate(
      findAdmin.id,
      {
        refreshToken: refreshToken,
      },
      { new: true },
    );
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      maxAge: 3 * 24 * 60 * 60 * 1000,
    });
    res.status(200).json({
      _id: findAdmin?._id,
      firstname: findAdmin?.firstname,
      lastname: findAdmin?.lastname,
      email: findAdmin?.email,
      phone: findAdmin?.phone,
      token: generateToken(findAdmin?._id),
    });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

// POST Logout
export const logoutUser = async (req: Request, res: Response) => {
  res.clearCookie('refreshToken');
  return res.status(200).json({ message: 'Logged out' });
};

// Save User Address
export const saveAddress = async (req: Request, res: Response) => {
  const { _id } = req.user;
  try {
    const findUser = await UserModel.findByIdAndUpdate(
      _id,
      {
        address: req?.body?.address,
      },
      { new: true },
    );
    return res.status(200).json(findUser);
  } catch (error) {
    throw new Error('Internal server error');
  }
};
//GET RefreshToken
export const handleRefreshToken = async (req: Request, res: Response) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res.status(401).json({ message: 'No Refresh token in Cookies' });
  }

  try {
    const user = await UserModel.findOne({ refreshToken });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    jwt.verify(
      refreshToken,
      process.env.JWT_SECRET as string,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
      (err: any, decoded: any) => {
        if (err || user.id !== decoded.id) {
          return res.status(403).json({
            message: 'There is something wrong with the refresh token',
          });
        }
        const accessToken = generateToken(user._id);
        res.json({ accessToken });
      },
    );
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(error.message);
  }
};

// GET all users
export const getAllUser = async (req: Request, res: Response) => {
  try {
    const getUsers = await UserModel.find();
    return res.status(200).json(getUsers);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

// GET user by id
export const getUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const getUser = await UserModel.findById(id);
    return res.status(200).json(getUser);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

// DELETE user by id
export const deletedUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const deleteUser = await UserModel.findByIdAndDelete(id);
    if (deleteUser) {
      return res.status(200).json({
        message: 'User deleted successfully',
      });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

// PUT update user by id
export const updatedUser = async (req: Request, res: Response) => {
  const { _id } = req.user;
  try {
    const updateUser = await UserModel.findByIdAndUpdate(
      _id,
      {
        firstname: req.body?.firstname,
        lastname: req.body?.lastname,
        phone: req.body?.phone,
        email: req.body?.email,
        role: req.body?.role,
      },
      { new: true },
    );
    return res.status(200).json(updateUser);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

// get Blocked users
export const blockUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const blockuser = await UserModel.findByIdAndUpdate(
      id,
      {
        isBlocked: true,
      },
      {
        new: true,
      },
    );
    res.json(blockuser);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const unblockUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const unblock = await UserModel.findByIdAndUpdate(
      id,
      {
        isBlocked: false,
      },
      {
        new: true,
      },
    );
    res.json({
      message: 'User UnBlocked',
    });
  } catch (error) {
    throw new Error('Internal server error');
  }
};

// Update Password
export const updatedPassword = async (req: Request, res: Response) => {
  const { _id } = req.user;
  const { oldPassword, newPassword } = req.body;
  try {
    const user = await UserModel.findById(_id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user && (await user.isPasswordMatch(oldPassword))) {
      user.password = newPassword;
      await user.save();
      return res.status(200).json({ message: 'Password Updated' });
    }
    return res.status(401).json({ message: 'Invalid Password' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

// POST forgot Password
export const forgotPassword = async (req: Request, res: Response) => {
  const { email } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      res.status(404).json({ message: 'Email not found' });
    }
    const token = await user?.createPasswordResetToken();
    await user?.save();
    const resetUrl = `Hi, please click on the link to reset your password. This link is valid for 10 minutes only. 
    <a href="http://localhost:5000/api/user/reset-password/${token}">Reset Password</a>`;
    const data: EmailData = {
      to: email,
      text: 'Hey User',
      subject: 'Reset Password',
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
  const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
  const user = await UserModel.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });
  if (!user) {
    return res.status(400).json({ message: 'Token is invalid or has expired' });
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
    const findUser = await UserModel.findById(_id).populate('wishlist');
    res.status(200).json(findUser?.wishlist);
  } catch (error) {
    throw new Error('Internal server error');
  }
};

export const userCart = async (req: Request, res: Response) => {
  const { _id } = req.user;
  const { cart } = req.body;
  try {
    const products = [];
    const user = await UserModel.findById(_id);
    const alreadyAdded = await CartModel.findOne({ orderedBy: user?._id });
    if (alreadyAdded) {
      const removeCart = await CartModel.findOneAndRemove({
        orderedBy: user?._id,
      });
      res.status(200).json(removeCart);
    }
    let cartTotal = 0;
    for (let i = 0; i < cart.length; i++) {
      const product = await ProductModel.findById(cart[i]._id);

      products.push({
        product: product?._id,
        count: cart[i].count,
        color: cart[i].color,
        price: product?.price,
      });
      cartTotal = cartTotal + product!.price * cart[i].count;
    }
    const newCart = await CartModel.create({
      products,
      cartTotal,
      orderedBy: user?._id,
    });
    res.status(200).json(newCart);
    console.log(products);
  } catch (error) {
    throw new Error('Internal server error');
  }
};

export const getUserCart = async (req: Request, res: Response) => {
  const { _id } = req.user;
  try {
    const cart = await CartModel.find({ orderedBy: _id }).populate(
      'products.product',
    );
    res.status(200).json(cart);
  } catch (error) {
    throw new Error('Internal server error');
  }
};

export const emptyCart = async (req: Request, res: Response) => {
  const { _id } = req.user;
  try {
    const user = await UserModel.findOne(_id);
    const cart = await CartModel.findOneAndRemove({ orderedBy: user?._id });
    res.status(200).json(cart);
  } catch (error) {
    throw new Error('Internal server error');
  }
};

export const applyCoupon = async (req: Request, res: Response) => {
  const { coupon } = req.body;
  const { _id } = req.user;
  try {
    const validCoupon = await CouponModel.findOne({ name: coupon });
    if (!validCoupon) {
      return res.status(400).json({ message: 'Invalid Coupon' });
    }
    const user = await UserModel.findById(_id);
    const cart = await CartModel.findOne<ICart>({
      orderedBy: user?._id,
    });
    if (!cart) {
      return res.status(400).json({ message: 'Cart not found' });
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { products, cartTotal } = cart;

    if (cartTotal === undefined) {
      return res.status(400).json({ message: 'Cart total is undefined' });
    }

    const totalAfterDiscount = (
      cartTotal -
      (cartTotal * validCoupon?.discount) / 100
    ).toFixed(2);
    const updatedCart = await CartModel.findOneAndUpdate(
      { orderedBy: user?._id },
      { totalAfterDiscount },
      { new: true },
    );

    res.status(200).json(updatedCart);
  } catch (error) {
    throw new Error('Internal server error');
  }
};
