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
