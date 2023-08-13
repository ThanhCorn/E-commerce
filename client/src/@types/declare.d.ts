export interface IContact {
  _id?: string;
  name: string;
  email: string;
  phone: string;
  comment: string;
  status?: string;
}

export interface IColor {
  _id: string;
  title: string;
}

export interface IBlog {
  _id: string;
  title: string;
  description: string;
  category: string;
  numViews: number;
  isLiked: boolean;
  isDisliked: boolean;
  likes: IUser[];
  dislikes: IUser[];
  author: string;
  images: IImages[];
  createAt: Date;
}

export interface IUser {
  _id?: string;
  firstName?: string;
  lastName?: string;
  password?: string;
  phone?: string;
  email?: string;
  token?: string;
  wishlist?: IProduct[];
}

export interface IImages {
  public_id: string;
  url: string;
}

export interface IProduct {
  _id: string;
  title: string;
  slug: string;
  description: string;
  price: number;
  category: string;
  quantity: number;
  brand: string;
  sold: number;
  images: IImages[];
  color: IColor[];
  tags?: string;
  ratings?: Array<{
    star: number;
    postedBy: Types.ObjectId;
    comment?: string;
  }>;
  totalRating?: string;
}

export interface ICart {
  _id?: string;
  productId?: string | IProduct;
  quantity: number;
  color?: IColor | string;
  price: number;
}

export interface IDataPayment {
  firstName: string;
  lastName: string;
  totalPrice: number;
  totalAfterDiscount?: number;
}

export interface IOrder {
  _id?: string;
  userId: string;
  shippingInfo: {
    address: {
      city: string;
      country: string;
      address: string;
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
  paidAt?: Date;
}
