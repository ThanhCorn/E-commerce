/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import couponModel from "../models/coupon.Model";

export const createCoupon = async (req: Request, res: Response) => {
  try {
    const newCoupon = await couponModel.create(req.body);
    return res.status(201).json(newCoupon);
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const getAllCoupon = async (req: Request, res: Response) => {
  try {
    const allCoupon = await couponModel.find();
    return res.status(200).json(allCoupon);
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const getCoupon = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const coupon = await couponModel.findById(id);
    return res.status(200).json(coupon);
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const updateCoupon = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const findCoupon = await couponModel.findByIdAndUpdate(id, req.body, {
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
    const findCoupon = await couponModel.findByIdAndDelete(id);
    return res.status(200).json({
      message: "Delete coupon successfully",
    });
  } catch (error: any) {
    throw new Error(error.message);
  }
};
