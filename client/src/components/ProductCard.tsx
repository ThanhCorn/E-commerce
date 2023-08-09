import ReactStars from "react-stars";
import { Link, useLocation } from "react-router-dom";
import addCard from "../assets/images/add-card.svg";
import view from "../assets/images/view.svg";
import prodcompare from "../assets/images/prodcompare.svg";
import love from "../assets/images/love.svg";
import loveFill from "../assets/images/love-fill.svg";
import { IProduct } from "../@types/declare";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../app/store";
import { addToWishlist } from "../features/products/productSlice";

interface IProductCard {
  grid: number | boolean;
  data: IProduct[];
}
const ProductCard = (props: IProductCard) => {
  const location = useLocation();
  const dispatch: AppDispatch = useDispatch();
  const { data } = props;
  const updatedData = useSelector(
    (state: RootState) => state.product.addToWishlist
  );
  console.log(updatedData?.wishlist);

  const addToWishList = (id: string) => {
    dispatch(addToWishlist(id));
  };

  return (
    <>
      {data?.map((item, index) => {
        return (
          <div
            key={index}
            className="bg-white rounded-md overflow-hidden product-card"
          >
            <Link
              to=""
              // to={` ${
              //   location.pathname == "/"
              //     ? "/product/:id"
              //     : location.pathname == "/product/:id"
              //     ? "/product/1"
              //     : ":id"
              // }`}
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
                    {updatedData?.wishlist.includes(item._id) ? (
                      <img src={loveFill} alt="love" className="w-5 z-50" />
                    ) : (
                      <img src={love} alt="love" className="w-5 z-50" />
                    )}
                  </button>
                </div>
                <div className="absolute action-bar">
                  <div className="flex flex-col gap-2">
                    <button>
                      <img
                        src={prodcompare}
                        alt="prodcompare"
                        className="w-5"
                      />
                    </button>
                    <button>
                      <img src={addCard} alt="add card" />
                    </button>
                    <button>
                      <img src={view} alt="view" />
                    </button>
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
                  {item?.description}
                </p>
                <p className="text-black font-normal mb-5">${item.price}</p>
              </div>
            </Link>
          </div>
        );
      })}
    </>
  );
};

export default ProductCard;
