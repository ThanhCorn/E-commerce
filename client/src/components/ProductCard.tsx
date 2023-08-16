import ReactStars from "react-stars";
import { Link, useLocation } from "react-router-dom";
import view from "../assets/images/view.svg";
import love from "../assets/images/love.svg";
import loveFill from "../assets/images/love-fill.svg";
import { IProduct } from "../@types/declare";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../app/store";
import { addToWishlist } from "../features/products/productSlice";

interface IProductCard {
  grid: number | boolean;
  data?: IProduct[];
  wishlist: string[];
  tagsProduct?: "popular" | "special" | "features";
}
const ProductCard = (props: IProductCard) => {
  const { wishlist, tagsProduct } = props;
  const location = useLocation();
  const dispatch: AppDispatch = useDispatch();
  const { data } = props;
  const updatedData = useSelector(
    (state: RootState) => state.product.addToWishlist
  );

  const addToWishList = (id: string) => {
    dispatch(addToWishlist(id));
  };

  const filteredProducts =
    tagsProduct && data
      ? data.filter((item) => item?.tags?.includes(tagsProduct))
      : data;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let dataWishlist: any = [];

  if (updatedData?.wishlist) {
    dataWishlist = updatedData?.wishlist;
  }

  return (
    <>
      {filteredProducts?.map((item, index) => {
        return (
          <div
            key={index}
            className="bg-white rounded-md overflow-hidden product-card"
          >
            <div
              className={`w-full z-0 ${
                location.pathname == "/product" && props.grid == 1 ? "flex" : ""
              } `}
            >
              <div className="product-images relative ">
                <img
                  src={item.images[0].url}
                  alt="watch"
                  className="mx-auto object-contain w-full"
                />
                <img
                  src={item.images[1].url}
                  alt="watch"
                  className="mx-auto object-contain w-full"
                />
                <div className="absolute top-3 right-2  ">
                  <button onClick={() => addToWishList(item._id)}>
                    {wishlist.includes(item._id) ||
                    dataWishlist.includes(item._id) ? (
                      <img
                        src={loveFill}
                        alt="love"
                        className="w-5 z-50 hover:scale-110 transition-all duration-300 ease-in-out"
                      />
                    ) : (
                      <img
                        src={love}
                        alt="love"
                        className="w-5 z-50
                      hover:scale-110 transition-all duration-300 ease-in-out "
                      />
                    )}
                  </button>
                </div>
                <div className="absolute action-bar">
                  <div className="flex flex-col gap-2">
                    {/* <button>
                      <img
                        src={prodcompare}
                        alt="prodcompare"
                        className="w-5"
                      />
                    </button> */}
                    {/* <button>
                      <img src={addCard} alt="add card" />
                    </button> */}
                    <Link to={`/product/${item._id}`}>
                      <img
                        src={view}
                        alt="view"
                        className="hover:scale-110 transition-all duration-300 ease-in-out"
                      />
                    </Link>
                  </div>
                </div>
              </div>

              <div className="mx-3">
                <h5 className="text-orange-600">{item.brand}</h5>
                <h4 className="font-bold text-sm mt-2 overflow-hidden line-clamp-2">
                  {item.title}
                </h4>
                <ReactStars
                  count={5}
                  size={24}
                  value={Number(item.totalRating)}
                  color2={"#ffd700"}
                />
                <p
                  className={`text-gray-400 my-1 leading-4 mr-5 ${
                    props.grid == 1 ? "block" : "hidden"
                  }`}
                >
                  {item.description.replace(/<\/?p>/g, "")}
                </p>
                <p className="text-black font-normal mb-5">${item.price}</p>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default ProductCard;
