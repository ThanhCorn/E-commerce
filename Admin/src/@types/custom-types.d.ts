import { IBlogCategory } from "./../../../server/src/models/blogCategory.Model";
export interface IUser {
  _id?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  email?: string;
  token?: string;
}

export interface ICustomer {
  _id?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  email?: string;
  token?: string;
  role: string;
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
  description: string;
  images: IImages[];
}

export interface IBlogCategory {
  _id?: string;
  title: string;
}

export interface IContact {
  _id?: string;
  name?: string;
  email?: string;
  phone?: string;
  comment?: string;
  status?: string;
}

// Order interface
export interface OrderProduct {
  product: IProduct; // The product's MongoDB _id (string type)
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
  orderedBy: IUser; // The user's MongoDB _id (string type)
  createdAt: Date;
  updatedAt: Date;
}

export interface IOrder {
  _id: string;
  userId: IUser;
  shippingInfo: {
    address: {
      city: string;
      country: string;
      state: string;
      postal_code: string;
      line1: string;
      line2: string;
    };
  };
  paymentIntentId: string;
  orderItems: [
    {
      productId: IProduct;
      color: IColor;
      quantity: number;
      price: number;
    }
  ];
  totalPrice: number;
  orderStatus: string;
  paymentStatus: string;
  paidAt: Date;
}

// Images

export interface IImages {
  public_id?: string;
  url?: string;
}

export interface IProduct {
  _id?: string;
  title: string;
  slug?: string;
  description: string;
  price: number;
  category: string;
  quantity: number;
  brand: string;
  sold?: number;
  images: IImages[];
  color: string[];
  tags?: string;
  ratings?: Array<{
    star: number;
    postedBy: Types.ObjectId;
    comment?: string;
  }>;
  totalRating?: string;
}

// coupon
export interface ICoupon {
  _id?: string;
  name: string;
  discount: number;
  expiry: Date;
}

export interface IMonthIncome {
  _id: {
    month: number;
  };
  amount: number;
}
export interface IMonthOrderCount {
  _id: {
    month: number;
  };
  count: number;
}
export interface IYearIncome {
  _id: null;
  count: number;
  amount: number;
}
export interface IYearOrderCount {
  _id: null;
  count: number;
}
