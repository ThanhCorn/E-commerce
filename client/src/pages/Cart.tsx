import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import { AppDispatch, RootState } from "../app/store";
import { useDispatch, useSelector } from "react-redux";
import {
  getCart,
  removeItemCart,
  updateQuantityItem,
} from "../features/user/userSlice";
import { useEffect, useState } from "react";
import axios from "axios";
import { base_url } from "../utils/base_url";

const Cart = () => {
  const userCart = useSelector((state: RootState) => state.auth.userCart);
  const userLogin = useSelector((state: RootState) => state.auth.userLogin);
  const [productUpdateDetail, setProductUpdateDetail] = useState({
    cartItemId: "",
    newQuantity: 0,
  });
  const [total, setTotal] = useState(0);

  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(getCart());
  }, []);

  useEffect(() => {
    if (productUpdateDetail.newQuantity > 0) {
      dispatch(updateQuantityItem(productUpdateDetail));
      setTimeout(() => {
        dispatch(getCart());
      }, 300);
    }
  }, [productUpdateDetail]);

  const deleteCartItem = (id: string) => {
    console.log(id);
    dispatch(removeItemCart(id));

    setTimeout(() => {
      dispatch(getCart());
    }, 300);
  };

  useEffect(() => {
    if (userCart) {
      let sum = 0;
      for (let i = 0; i < userCart?.length; i++) {
        sum += userCart[i].price * userCart[i].quantity;
      }
      setTotal(sum);
    }
  }, [userCart]);

  const handleCheckout = async () => {
    const res = await axios.post(`${base_url}/stripe/create-checkout-session`, {
      cartItems: userCart,
      userId: userLogin?._id,
    });
    if (res) {
      window.location.href = res.data.url;
    }
  };

  return (
    <div>
      <Meta title="Cart" />
      <BreadCrumb title="Cart" />
      <div className="cart-wrapper w-full max-h-full bg-[#f5f5f7] pb-52">
        <div className="max-w-screen-2xl mx-auto">
          <div className="mx-10 pt-10 grid grid-flow-col grid-cols-6 gap-5">
            <h4 className="col-span-3 font-semibold text-gray-400">Product</h4>
            <h4 className="col-span-1 font-semibold text-gray-400 text-end">
              Price
            </h4>
            <h4 className="col-span-1 font-semibold text-gray-400 text-end">
              Quantity
            </h4>
            <h4 className="col-span-1 font-semibold text-gray-400 text-end">
              Total
            </h4>
          </div>
          <div className="product-cart mb-7">
            {Array.isArray(userCart) && userCart.length > 0 ? (
              userCart.map((item, index) => {
                return (
                  <div key={index}>
                    <div className="mx-10 border border-gray-300 mt-3"></div>
                    <div className="mx-10 pt-10 grid grid-flow-col grid-cols-6 gap-5">
                      <div className="col-span-3 flex gap-5 items-center ">
                        <div className="w-[25%]">
                          <img
                            src={item?.productId?.images[0]?.url}
                            alt="product  image"
                          />
                        </div>
                        <div className="w-[75%]">
                          <p className="text-gray-500 font-normal mb-2">
                            {item?.productId?.title}
                          </p>
                          <div className="flex items-center gap-3">
                            <p className="text-gray-500 font-normal flex ">
                              Color:{" "}
                            </p>
                            <ul className="flex items-center">
                              <li className="inline-block mr-2">
                                <div
                                  className="w-4 h-4 rounded-full"
                                  style={{
                                    backgroundColor: item?.color?.title || "",
                                  }}
                                ></div>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div className="col-span-1 flex items-center justify-end">
                        <h5 className="price ">${item.price}</h5>
                      </div>
                      <div className="col-span-1 flex items-center justify-end gap-3">
                        <div className="w-[50%]">
                          {" "}
                          <input
                            type="number"
                            name=""
                            value={
                              productUpdateDetail.cartItemId === item?._id
                                ? productUpdateDetail.newQuantity
                                : item?.quantity
                            }
                            onChange={(e) =>
                              setProductUpdateDetail({
                                cartItemId: item?._id || "",
                                newQuantity: Number(e.target.value),
                              })
                            }
                            min={1}
                            max={10}
                            className="w-full h-[40px] px-2 border border-gray-300 rounded-md text-end"
                          />
                        </div>
                        <div>
                          <AiFillDelete
                            size={24}
                            className="hover:text-red-500 cursor-pointer"
                            onClick={() => deleteCartItem(item?._id || "")}
                          />
                        </div>
                      </div>
                      <div className="col-span-1 flex items-center justify-end">
                        <h5 className="price ">
                          ${item?.price * item?.quantity}
                        </h5>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <p>No items in the cart.</p>
            )}
          </div>
          <div className="mx-10 pt-10 grid grid-flow-col grid-cols-1">
            <Link
              to="/product"
              className="button max-w-[210px] py-3 hover:bg-orange-300"
            >
              Continue To Shopping
            </Link>
          </div>
          <div className="mx-10 pt-10 flex justify-between">
            <div>
              <h4 className="text-gray-400 font-normal">
                Order shecial instructions
              </h4>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-3 justify-end mb-3">
                <h5 className="text-gray-400 font-normal">Subtotal</h5>
                <h5 className="price">${total}</h5>
              </div>
              <h5 className="text-gray-400 font-normal mb-5">
                Taxes and shipping calculated at checkout
              </h5>
              <button
                onClick={() => handleCheckout()}
                className="button flex justify-center"
              >
                Check Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
