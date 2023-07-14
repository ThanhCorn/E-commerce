import { generateToken } from './../utils/jwtToken';
import { Request, Response } from 'express';
import UserModel, { IUser } from '../models/user.model';
import bcrypt from 'bcrypt';

// POST register
export const registerUser = async (req: Request, res: Response) => {
  const { firstname, lastname, phone, email, password } = req.body;
  try {
    const existingEmail = await UserModel.findOne({ email });

    if (existingEmail) {
      return res.status(409).json({ message: 'Email already exists' });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const newUser: IUser = await UserModel.create({
      firstname,
      lastname,
      phone,
      email,
      password: passwordHash,
    });
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
      return res.status(404).json({ message: 'User not found' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    const token = generateToken(user._id);

    return res.status(200).json({
      _id: user._id,
      firstname: user.firstname,
      lastname: user.lastname,
      phone: user.phone,
      email: user.email,
      token: token,
    });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
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
  const { id } = req.params;
  try {
    const updateUser = await UserModel.findByIdAndUpdate(
      id,
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
