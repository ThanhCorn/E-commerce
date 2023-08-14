import ReactStars from "react-stars";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import { useState, useEffect } from "react";
import Color from "../components/Color";
import { TbGitCompare, TbHeart } from "react-icons/tb";
import ProductCard from "../components/ProductCard";
import { AppDispatch, RootState } from "../app/store";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  getAllProduct,
  getSingleProduct,
  rateProduct,
} from "../features/products/productSlice";
import { addToCart, getUserProductWishlist } from "../features/user/userSlice";
import { IProduct } from "../@types/declare";
import { toast } from "react-toastify";

const SingleProduct = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [color, setColor] = useState("");
  const [quantity, setQuantity] = useState(1);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [orderedProduct, setOrderedProduct] = useState(true);
  const dispatch: AppDispatch = useDispatch();
  const productById = useSelector((state: RootState) => state.product.product);
  const getProducts = useSelector((state: RootState) => state.product.products);
  const userWishlist = useSelector(
    (state: RootState) => state.auth.userWishlist
  );
  const { id } = useParams<{ id: string }>();

  let wishlist: string[] = [];
  if (userWishlist) {
    wishlist = userWishlist.map((item: IProduct) => item._id);
  }
  useEffect(() => {
    dispatch(getAllProduct());
    dispatch(getUserProductWishlist());

    if (id) {
      dispatch(getSingleProduct(id));
    }
  }, [id]);

  const copyToClipboard = (text: string): void => {
    console.log("text", text);
    const textField = document.createElement("textarea");
    textField.innerText = text;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand("copy");
    textField.remove();
  };
  const [star, setStar] = useState<number>(0);
  const [comment, setComment] = useState("");
  const addRatingProduct = () => {
    if (star === 0) {
      toast.error("Please select a rating");
    }
    if (comment === "") {
      toast.error("Please write a comment");
    } else if (id) {
      dispatch(rateProduct({ productId: id, star: star, comment: comment }));
      setTimeout(() => {
        dispatch(getSingleProduct(id));
      }, 1000);
    }
    return false;
  };

  const uploadCart = () => {
    if (color === "") {
      toast.error("Please select a color");
    } else {
      dispatch(
        addToCart({
          productId: productById?._id,
          quantity,
          color,
          price: productById?.price || 0,
        })
      );
    }
  };

  return (
    <>
      <Meta title={productById?.title} />
      <BreadCrumb title={productById?.title} />
      <div className="store-wrapper w-full max-h-full bg-[#f5f5f7] pb-52">
        <div className="max-w-screen-2xl mx-auto">
          {/* Main Product */}
          <div className="mx-10 pt-10">
            <div className=" grid grid-flow-col grid-cols-2 mb-10 bg-white rounded-xl">
              <div className="col-span-1  px-4 py-3">
                <div className="main-product-image mb-4">
                  <img
                    src={productById?.images[0].url}
                    alt={productById?.title}
                    className="rounded-xl object-contain"
                  />
                </div>
                <div className="flex items-center gap-3 flex-wrap">
                  {productById?.images.map((image, index) => {
                    return (
                      <div
                        key={index}
                        className="p-5 w-[49%] h-[240px] border border-gray-600"
                      >
                        <img
                          src={image.url}
                          alt="watch"
                          className="rounded-xl h-[100%] w-full object-contain"
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="col-span-1  px-4 py-3">
                <div className="main-product-detail">
                  <div>
                    <h3 className="text-xl font-bold">{productById?.title}</h3>
                    <div className="border-y-[1px] my-2 border-gray-100"></div>
                    <b>${productById?.price}</b>
                    <div className="flex items-center gap-2">
                      <ReactStars
                        count={5}
                        size={24}
                        value={Number(productById?.totalRating)}
                        color2={"#ffd700"}
                      />
                      <p className="text-black font-normal">
                        ( {productById?.ratings?.length} Reviews )
                      </p>
                    </div>
                    <a href="#review" className="text-gray-400">
                      Write a Review
                    </a>
                    <div className="border-y-[1px] my-6 border-gray-300 "></div>
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2 mb-3">
                        <h3 className=" font-semibold">Type :</h3>
                        <p className="text-black font-normal">GFD</p>
                      </div>
                      <div className="flex items-center gap-2 mb-3">
                        <h3 className=" font-semibold">Brand :</h3>
                        <p className="text-black font-normal">
                          {productById?.brand}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 mb-3">
                        <h3 className=" font-semibold">Categories :</h3>
                        <p className="text-black font-normal">
                          {productById?.category}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 mb-3">
                        <h3 className=" font-semibold">Tags :</h3>
                        <p className="text-black font-normal">
                          {productById?.tags}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 mb-3">
                        <h3 className=" font-semibold">Availability :</h3>
                        <p className="text-black font-normal">
                          {productById?.quantity}
                        </p>
                      </div>
                      <div className="flex flex-col  gap-2 mb-3  leading-6">
                        <h3 className=" font-semibold">Size :</h3>
                        <div className="flex gap-3">
                          <span className="border border-black font-semibold text-sm px-3 py-1 rounded-lg">
                            S
                          </span>
                          <span className="border border-black font-semibold text-sm px-3 py-1 rounded-lg">
                            M
                          </span>
                          <span className="border border-black font-semibold text-sm px-3 py-1 rounded-lg">
                            XL
                          </span>
                          <span className="border border-black font-semibold text-sm px-3 py-1 rounded-lg">
                            XXL
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2 mb-3">
                        <h3 className=" font-semibold">Color :</h3>
                        <Color
                          setColor={setColor}
                          colorData={productById?.color || []}
                        />
                      </div>
                      <div className="flex items-center gap-3 mb-5">
                        <h3 className=" font-semibold">Quantity :</h3>
                        <div className="mr-5">
                          <input
                            type="number"
                            min={1}
                            max={10}
                            className="w-[60px] h-8 border border-gray-400 px-2 rounded-md"
                            onChange={(e) => setQuantity(+e.target.value)}
                            value={quantity}
                          />
                        </div>
                        <div className="flex gap-3">
                          <button
                            onClick={() => uploadCart()}
                            className="button min-w-[130px] "
                          >
                            Add To Card
                          </button>
                          <button className="button min-w-[130px] bg-orange-300 hover:bg-third">
                            Buy It Now
                          </button>
                        </div>
                      </div>
                      <div className="flex items-center gap-10">
                        <div className="">
                          <a href="" className="flex items-center gap-3">
                            <TbGitCompare size={20} />
                            Add to Compare
                          </a>
                        </div>
                        <div className="">
                          <a href="" className="flex items-center gap-3">
                            <TbHeart size={20} />
                            Add to wishlist
                          </a>
                        </div>
                      </div>
                      <div className="border-t my-3 border-t-gray-300"></div>
                      <div className="">
                        <h3 className="font-semibold">Shipping & Returns :</h3>
                        <p className="text-black font-normal my-3">
                          Free shipping and returns available on all orders!{" "}
                          <br />
                          We ship all US VN domestic orders within{" "}
                          <b>5-10 business days!</b>
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <h3 className="font-semibold">Product Link:</h3>
                        <a
                          href="javscript:void(0)"
                          className="text-gray-400"
                          onClick={() => {
                            copyToClipboard(window.location.href);
                          }}
                        >
                          Copy Product Link
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <h4 className="text-xl mb-2 mx-10 font-bold">Description</h4>
          <div className="description-wrapper mx-10 bg-white mb-10 rounded-xl ">
            <div className="mx-5 py-5">
              <p className="text-black font-normal">
                {productById?.description.replace(/<\/?p>|<\/?br>/g, "")}
              </p>
            </div>
          </div>
          <h4 id="review" className="text-xl mb-2 mx-10 font-bold">
            Reviews
          </h4>
          <div className="reviews-wrapper bg-white mx-10 rounded-xl pb-10 mb-10">
            <div className="mx-5 py-5">
              <div>
                <h4 className="text-lg font-normal">Customer Reviews</h4>
                <div className="flex justify-between">
                  <div className="flex items-center gap-3">
                    <ReactStars
                      count={5}
                      size={24}
                      value={3}
                      color2={"#ffd700"}
                    />
                    <p className="text-black font-normal">Based on 2 Reviews</p>
                  </div>
                  {orderedProduct && (
                    <div>
                      <a
                        href=""
                        className="text-gray-400 font-normal underline"
                      >
                        Write a Review
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="border-[1px] border-gray-300 mx-5"></div>
            <p className="text-gray-400 mx-5 my-5 font-normal text-lg">
              Write A Review
            </p>
            <div className="mx-5">
              <div className="">
                <p className="text-gray-400 font-normal">Rating</p>
                <ReactStars
                  count={5}
                  size={24}
                  value={0}
                  color2={"#ffd700"}
                  onChange={(e) => setStar(e)}
                />
              </div>

              <div className="">
                <p className="text-gray-400 font-normal">
                  Body of Review (1500)
                </p>

                <textarea
                  name=""
                  id=""
                  cols={30}
                  rows={5}
                  className="px-3 py-3 border border-gray-300 w-full rounded-xl"
                  placeholder="Comments"
                  onChange={(e) => setComment(e.target.value)}
                ></textarea>
              </div>
              <div className="flex justify-end pb-10">
                <button className="button" onClick={addRatingProduct}>
                  Submit Preview
                </button>
              </div>
            </div>
            <div className="border-[1px] border-gray-300 mx-5"></div>

            <div className="text-gray-400 mx-3 my-5 font-normal text-lg">
              {productById &&
                productById?.ratings?.map((item, index) => {
                  return (
                    <div key={index} className="review">
                      <div className="flex gap-3 items-center mb-3">
                        <h6 className="text-lg font-bold text-black"></h6>
                        <ReactStars
                          count={5}
                          size={24}
                          value={item?.star}
                          color2={"#ffd700"}
                          edit={false}
                        />
                      </div>
                      <p className="text-black font-normal ml-4">
                        {item?.comment}
                      </p>
                    </div>
                  );
                })}
            </div>
          </div>
          <section className="popular-product px-10 mb-12">
            <h3 className="text-xl font-bold mb-3">Our Popular Products</h3>
            <div className="grid grid-flow-row grid-cols-4 auto-fit gap-5 mx-auto">
              <ProductCard
                data={getProducts}
                tagsProduct="popular"
                grid={false}
                wishlist={wishlist}
              />
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default SingleProduct;
