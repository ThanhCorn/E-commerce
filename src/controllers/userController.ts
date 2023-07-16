import { generateToken } from '../utils/jwtToken';
import { generateRefreshToken } from '../utils/refreshToken';
import { Request, Response } from 'express';
import UserModel, { IUser } from '../models/userModel';
import 'dotenv/config';
import jwt from 'jsonwebtoken';

// POST register
export const registerUser = async (req: Request, res: Response) => {
  const email = req.body.email;
  try {
    const existingEmail = await UserModel.findOne({ email });

    if (existingEmail) {
      return res.status(409).json({ message: 'Email already exists' });
    }

    const newUser: IUser = await UserModel.create(req.body)
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
    if (!user) {
      return res.status(404).json({ message: 'invalid email or password' });
    }

    if (user && (await user.isPasswordMatch(password))) {
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
      maxAge: 72 * 60 * 60 * 1000,
    });
    res.status(200).json({
      _id: user?._id,
      firstname: user?.firstname,
      lastname: user?.lastname,
      email: user?.email,
      phone: user?.phone,
      token: generateToken(user?._id),
    });
  }
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

// POST Logout
export const logoutUser = async (req: Request, res: Response) => {
  res.clearCookie('refreshToken');
  return res.status(200).json({ message: 'Logged out' });
}


//GET RefreshToken
export const handleRefreshToken = async (req: Request, res: Response) => {
  const refreshToken = await req.cookies.refreshToken;
  console.log(refreshToken);

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
      process.env.JWT_SECRET || 'mysecretkey',
      // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
       (err: any, decoded: any) => {
        if (err || user.id !== decoded.id) {
          return res.status(403).json({ message: 'There is something wrong with the refresh token' });
        }
        const accessToken = generateToken(user._id);
        res.json({ accessToken });
      }
    );
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// GET all users
export const getUsers = async (req: Request, res: Response) => {
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
