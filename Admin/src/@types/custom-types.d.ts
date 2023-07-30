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
