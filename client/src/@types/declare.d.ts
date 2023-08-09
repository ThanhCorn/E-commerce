export interface IUser {
  _id: string;
  firstName: string;
  lastName: string;
  password: string;
  phone: string;
  email: string;
  token?: string;
  wishlist: IProduct[];
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
  sold?: number;
  images: IImages[];
  color?: string[];
  tags?: string;
  ratings?: Array<{
    star: number;
    postedBy: Types.ObjectId;
    comment?: string;
  }>;
  totalRating?: string;
}
