import ReactStars from "react-stars";
import { Link } from "react-router-dom";
import addCard from "../assets/images/add-card.svg";
import view from "../assets/images/view.svg";
import prodcompare from "../assets/images/prodcompare.svg";

interface ISpecialProductProps {
  id: string;
  title: string;
  brand: string;
  totalRating: number;
  price: number;
  sold: number;
  quantity: number;
  image: string;
}

const SpecialProduct = (props: ISpecialProductProps) => {
  const { id, title, brand, totalRating, price, sold, quantity, image } = props;
  return (
    <>
      <div className="bg-white rounded-md overflow-hidden product-card xl:flex  xl:min-w-[460px] pb-5 ">
        <div className="relative">
          <img
            src={image}
            alt="watch"
            className="min-w-[200px] h-[250px] object-contain"
          />

          <div className="absolute action-bar">
            <div className="flex flex-col gap-2">
              <Link to="">
                <img src={prodcompare} alt="prodcompare" className="w-5" />
              </Link>
              <Link to="">
                <img src={addCard} alt="add card" />
              </Link>
              <Link to="">
                <img src={view} alt="view" />
              </Link>
            </div>
          </div>
        </div>

        <div className="mx-3 py-2">
          <h5 className="text-orange-600">{brand}</h5>
          <h4 className="font-bold text-sm mt-2 overflow-hidden line-clamp-2">
            {title}
          </h4>
          <ReactStars
            count={5}
            size={24}
            value={totalRating}
            color2={"#ffd700"}
          />
          <p className="text-black font-normal mb-3">
            <span className="text-red-600 text-lg">${price}</span>
            <span className="line-through ml-3">$200</span>
          </p>
          <div className="flex items-center">
            <p className="w-[70px]">
              <b className="text-black">5 days</b>
            </p>
            <div className="flex gap-1 items-center">
              <span className="px-4 py-2 rounded-full bg-yellow-400">1</span>:
              <span className="px-4 py-2 rounded-full bg-yellow-400">1</span>:
              <span className="px-4 py-2 rounded-full bg-yellow-400">1</span>
            </div>
          </div>
          <div className="">
            <p className="text-black my-2 ">Products: {quantity}</p>
            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4 dark:bg-gray-700">
              <div
                aria-valuemin={quantity}
                aria-valuemax={sold + quantity}
                aria-valuenow={quantity / quantity + sold * 100}
                className="bg-blue-600 h-2.5 rounded-full dark:bg-blue-500"
                style={{ width: quantity / quantity + sold * 100 + "%" }}
              ></div>
            </div>
          </div>
          <div className="">
            <Link to={`/product/${id}`}>
              <p className="button">View Product</p>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default SpecialProduct;
