/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import CouponModel from '../models/coupon.Model';

export const createCoupon = async (req: Request, res: Response) => {
  try {
    const newCoupon = await CouponModel.create(req.body);
    return res.status(201).json(newCoupon);
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const getAllCoupon = async (req: Request, res: Response) => {
  try {
    const allCoupon = await CouponModel.find();
    return res.status(200).json(allCoupon);
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const updateCoupon = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const findCoupon = await CouponModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    return res.status(200).json(findCoupon);
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const deleteCoupon = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const findCoupon = await CouponModel.findByIdAndDelete(id);
    return res.status(200).json({
      message: 'Delete coupon successfully',
    });
  } catch (error: any) {
    throw new Error(error.message);
  }
};
