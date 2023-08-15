import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../app/store";
import cross from "../assets/images/cross.svg";
import { getUserProductWishlist } from "../features/user/userSlice";
import { useEffect } from "react";
import { addToWishlist } from "../features/products/productSlice";

const Wishlist = () => {
  const dispatch: AppDispatch = useDispatch();
  const userWishlist = useSelector(
    (state: RootState) => state.auth.userWishlist
  );

  useEffect(() => {
    dispatch(getUserProductWishlist());
  }, []);

  const removeFromWishlist = (id: string) => {
    dispatch(addToWishlist(id));
    setTimeout(() => {
      dispatch(getUserProductWishlist());
    }, 500);
  };

  return (
    <div>
      <Meta title="Wishlist" />
      <BreadCrumb title="Wishlist" />
      <div className="wishlist-wrapper w-full max-h-full bg-[#f5f5f7] pb-52">
        {userWishlist?.length == 0 && (
          <div className="text-center w-full text-2xl pt-10">
            No Product In Wishlist
          </div>
        )}
        <div className="max-w-screen-2xl mx-auto grid grid-cols-5 gap-5">
          {userWishlist?.map((item, index) => {
            return (
              <div key={index} className="mx-10 pt-10 h-full w-full">
                <div className="relative h-full bg-white rounded-xl ">
                  <img
                    onClick={() => removeFromWishlist(item._id)}
                    src={cross}
                    alt="cross"
                    className="absolute object-contain top-2 right-2 w-5 h-5 cursor-pointer p-1   "
                  />
                  <div>
                    <img
                      src={item.images[0].url}
                      alt="watch"
                      className="h-[200px] w-full rounded-xl object-contain"
                    />
                    <div className="mx-3">
                      <h5 className="text-sm line-clamp-2 overflow-hidden my-2 font-bold">
                        {item.title}
                      </h5>
                      <h6 className="mb-3 text-sm font-bold opacity-80">
                        ${item.price}
                      </h6>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
