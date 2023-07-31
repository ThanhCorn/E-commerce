import { IBlogCategory } from "./../../../server/src/models/blogCategory.Model";
export interface IUser {
  _id?: string;
  firstname?: string;
  lastname?: string;
  phone?: string;
  email?: string;
  token?: string;
}

export interface ICustomer {
  _id?: string;
  firstname?: string;
  lastname?: string;
  phone?: string;
  email?: string;
  token?: string;
  role: string;
}

export interface IProduct {
  _id?: string;
  title?: string;
  price?: number;
  slug?: string;
  description?: string;
  category?: string;
  quantity?: number;
  brand?: string;
  sold?: number;
  images?: string[];
  tag?: string[];
  color?: string[];
  totalRating?: number;
  ratings?: [];
}

export interface IBrand {
  _id?: string;
  title?: string;
}

export interface IProductCategory {
  _id?: string;
  title?: string;
}

export interface IColor {
  _id?: string;
  title?: string;
}

export interface IBlog {
  _id?: string;
  title: string;
  category: string;
}

export interface IBlogCategory {
  _id?: string;
  title: string;
}

export interface IContact {
  _id?: string;
  name: string;
  email: string;
  phone: string;
  comment: string;
  status: string;
}

// Order interface
interface OrderProduct {
  product: string; // The product's MongoDB _id (string type)
  count: number;
  color: string;
}

// Interface for the payment intent
interface PaymentIntent {
  id: string;
  method: string;
  amount: number;
  status: string;
  created: Date;
  currency: string;
}

// Interface for the order document
interface OrderDoc {
  products: OrderProduct[];
  paymentIntent: PaymentIntent;
  orderStatus: string;
  orderedBy: string; // The user's MongoDB _id (string type)
  createdAt: Date;
  updatedAt: Date;
}

export interface IOrder {
  products: OrderProduct[];
  paymentIntent: PaymentIntent;
  orderStatus: string;
  orderedBy: string; // The user's MongoDB _id (string type)
  createdAt: Date;
  updatedAt: Date;
}
