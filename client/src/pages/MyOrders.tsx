import { useDispatch, useSelector } from "react-redux";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import { AppDispatch, RootState } from "../app/store";
import { getUserOrders } from "../features/user/userSlice";
import { useEffect } from "react";

const MyOrders = () => {
  const dispatch: AppDispatch = useDispatch();
  const userOrders = useSelector((state: RootState) => state.auth.userOrder);

  useEffect(() => {
    dispatch(getUserOrders());
  }, []);

  return (
    <>
      <Meta title="My Orders" />
      <BreadCrumb title="My Orders" />

      <div className="myoder-wrapper w-full max-h-full bg-[#f5f5f7] pb-52">
        <div className="max-w-screen-xl mx-auto">
          <div className="mx-10 pt-10 grid grid-flow-col grid-cols-8 gap-5 px-2 py-2">
            <h4 className=" font-semibold col-span-2">OrderId</h4>
            <h4 className=" font-semibold col-span-2">Product</h4>
            <h4 className=" font-semibold ">Quantity</h4>
            <h4 className=" font-semibold ">Color</h4>
            <h4 className=" font-semibold ">Total Amount</h4>
            <h4 className=" font-semibold ">Status</h4>
          </div>
          {userOrders?.map((order) => (
            <div className="mx-10 pt-10 grid grid-flow-col gap-5 grid-cols-8 bg-gray-300 rounded-md mt-5 px-2 py-2">
              <h4 className=" font-semibold text-gray-400 col-span-2">
                {order._id}
              </h4>
              <h4 className=" font-semibold text-gray-400   col-span-2">
                {order.orderItems.map((item, index) => (
                  <div key={index} className="mb-3 line-clamp-2 h-[50px]">
                    🍍 {item.productId.title}
                  </div>
                ))}
              </h4>
              <h4 className=" font-semibold text-gray-400 ">
                {order.orderItems.map((item, index) => (
                  <div key={index} className="mb-3 h-[50px] ">
                    🍍 {item.quantity}
                  </div>
                ))}
              </h4>
              <h4 className=" font-semibold text-gray-400 ">
                {order.orderItems.map((item, index) => (
                  <ul key={index} className="mb-3  h-[50px]">
                    <li
                      style={{ background: item.color.title }}
                      className="px-2 py-2 w-[20px] h-[20px] rounded-full"
                    ></li>
                  </ul>
                ))}
              </h4>
              <h4 className=" font-semibold text-gray-400 ">
                🍍{order.totalPrice}
              </h4>
              <h4 className=" font-semibold text-gray-400 uppercase">
                {order.paymentStatus}
              </h4>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default MyOrders;
