import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import customerReducer from "../features/customers/customerSlice";
import productReducer from "../features/product/productSlice";
import brandReducer from "../features/brand/brandSlice";
import pCategoryReducer from "../features/pCategory/pcategorySlice";
import bCategoryReducer from "../features/bCategory/bcategorySlice";
import colorReducer from "../features/color/colorSlice";
import blogReducer from "../features/blogs/blogSlice";
import contactReducer from "../features/contact/contactSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    customer: customerReducer,
    product: productReducer,
    brand: brandReducer,
    pCategories: pCategoryReducer,
    color: colorReducer,
    blogs: blogReducer,
    bCategories: bCategoryReducer,
    contacts: contactReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
