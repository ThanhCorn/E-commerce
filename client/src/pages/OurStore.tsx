import ReactStars from "react-stars";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import watch from "../assets/images/watch.jpg";
import gr from "../assets/images/gr.svg";
import gr2 from "../assets/images/gr2.svg";
import gr3 from "../assets/images/gr3.svg";
import gr4 from "../assets/images/gr4.svg";

import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { useLocation } from "react-router-dom";
import { AppDispatch, RootState } from "../app/store";
import { useDispatch, useSelector } from "react-redux";
import { getAllProduct } from "../features/products/productSlice";
import { getUserProductWishlist } from "../features/user/userSlice";
import { IProduct } from "../@types/declare";

const OurStore = () => {
  const [grid, setGrid] = useState(3);
  const location = useLocation();
  const dispatch: AppDispatch = useDispatch();
  const getProducts = useSelector((state: RootState) => state.product.products);
  const userWishlist = useSelector(
    (state: RootState) => state.auth.userWishlist
  );
  const [brands, setBrands] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [tag, setTag] = useState<string>("");
  const [brand, setBrand] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [categories, setCategories] = useState<string[]>([]);
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(10000);
  const [sort, setSort] = useState<string>("");

  let wishlist: string[] = [];
  if (userWishlist) {
    wishlist = userWishlist.map((item: IProduct) => item._id);
  }

  useEffect(() => {
    const newBrands: string[] = [];
    const newTags: string[] = [];
    const newCategories: string[] = [];

    for (let i = 0; i < getProducts.length; i++) {
      newBrands.push(getProducts[i].brand);
      newTags.push(getProducts[i].tags);
      newCategories.push(getProducts[i].category);
    }
    setBrands(newBrands);
    setTags(newTags);
    setCategories(newCategories);
  }, [getProducts]);

  useEffect(() => {
    getAllProducts();
    dispatch(getUserProductWishlist());
  }, [dispatch, sort, minPrice, maxPrice, category, brand, tag]);

  const getAllProducts = () => {
    dispatch(getAllProduct({ sort, minPrice, maxPrice, category, brand, tag }));
  };

  return (
    <>
      <Meta title="Our Store" />
      <BreadCrumb title="Our Store" />
      <div className="store-wrapper w-full h-[100%] max-h-full bg-[#f5f5f7]">
        <div className="max-w-screen-2xl mx-auto">
          <div className="mx-10 pt-5 grid grid-flow-col grid-cols-12 gap-5">
            <div className="col-span-3">
              <div className="mb-3 pb-4 bg-white rounded-lg">
                <div className="mx-4 pt-3">
                  <h3 className=" font-bold mb-4">Shop by Categories</h3>
                  <div>
                    <ul className="text-sm leading-7">
                      {brands &&
                        [...new Set(categories)].map((item, index) => {
                          return (
                            <li
                              className="opacity-80 cursor-pointer hover:text-blue-500"
                              onClick={() => setCategory(item)}
                              key={index}
                            >
                              {item}
                            </li>
                          );
                        })}
                    </ul>
                  </div>
                </div>
              </div>
              <div className="mb-3 bg-white pb-5">
                <div className="mx-4 pt-3">
                  <h3 className=" font-bold mb-4">Filter By</h3>

                  <div className="mb-6">
                    <h5 className="mb-3 font-bold text-sm ">Price</h5>
                    <div className="flex">
                      <input
                        type="number"
                        id="floatingInput"
                        className="w-[50%] py-2 border border-gray-300 rounded-sm px-2 text-sm mr-2"
                        placeholder="From"
                        onChange={(e) => setMinPrice(Number(e.target.value))}
                      />
                      <input
                        type="number"
                        id=""
                        className="w-[50%] py-2 border border-gray-300 rounded-sm px-2 text-sm mr-2"
                        placeholder="To"
                        onChange={(e) => setMaxPrice(Number(e.target.value))}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="mb-3 bg-white pb-5 ">
                <div className="mx-4 pt-3">
                  <h3 className=" font-bold mb-4">Product Tags</h3>
                  <div className="flex flex-wrap items-center gap-3">
                    {tags &&
                      [...new Set(tags)].map((item, index) => {
                        return (
                          <span
                            className="text-xs bg-gray-400 px-2 py-2 rounded-lg font-bold opacity-75 hover:bg-blue-500 hover:text-white cursor-pointer"
                            key={index}
                            onClick={() => setTag(item)}
                          >
                            {item}
                          </span>
                        );
                      })}
                  </div>
                </div>
              </div>
              <div className="mb-3 bg-white pb-5 ">
                <div className="mx-4 pt-3">
                  <h3 className=" font-bold mb-4">Product Brands</h3>
                  <div className="flex flex-wrap items-center gap-3">
                    {brands &&
                      [...new Set(brands)].map((item, index) => {
                        return (
                          <span
                            className="text-xs bg-gray-400 px-2 py-2 rounded-lg font-bold opacity-75 hover:bg-blue-500 hover:text-white cursor-pointer"
                            key={index}
                            onClick={() => setBrand(item)}
                          >
                            {item}
                          </span>
                        );
                      })}
                  </div>
                </div>
              </div>
              <div className="mb-10 bg-white pb-5">
                <div className="mx-4 pt-3">
                  <h3 className=" font-bold mb-4">Random Products</h3>
                  <div>
                    <div className="flex mb-5 border-b border-b-gray-300">
                      <div className="w-1/2">
                        <img src={watch} alt="watch" />
                      </div>
                      <div className="w-1/2">
                        <h5 className="font-bold text-sm">
                          Kid headphones bulk 10 pack multi colored for students
                        </h5>
                        <ReactStars
                          count={5}
                          size={24}
                          value={3}
                          color2={"#ffd700"}
                        />
                        <b>$300</b>
                      </div>
                    </div>
                    <div className="flex">
                      <div className="w-1/2">
                        <img src={watch} alt="watch" />
                      </div>
                      <div className="w-1/2">
                        <h5 className="font-bold text-sm">
                          Kid headphones bulk 10 pack multi colored for students
                        </h5>
                        <ReactStars
                          count={5}
                          size={24}
                          value={3}
                          color2={"#ffd700"}
                        />
                        <b>$300</b>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-span-9 mb-20">
              <div className="filter-sort-grid bg-white rounded-lg  h-[64px]  flex items-center justify-between">
                <div className="flex items-center mx-3 gap-5 w-[50%] ">
                  <p className="text-black font-normal text-sm">Sort By:</p>
                  <select
                    name=""
                    id=""
                    defaultValue={"manual"}
                    className="bg-gray-200 min-w-[170px] py-2 px-2 rounded-lg opacity-70 "
                    onChange={(e) => setSort(e.target.value)}
                  >
                    <option value="title">A-Z</option>
                    <option value="-title">Z-A</option>
                    <option value="price">Low to high</option>
                    <option value="-price">High to low</option>
                    <option value="createdAt">New to old</option>
                    <option value="-createdAt">Old to new</option>
                  </select>
                </div>
                <div className="mr-3 items-center w-[50%] h-full flex gap-5 justify-end">
                  <p className="text-black font-normal">
                    {getProducts.length} products
                  </p>
                  <div className="flex items-center gap-3">
                    <div
                      className="cursor-pointer px-2 bg-gray-200 py-2 rounded-lg"
                      onClick={() => setGrid(1)}
                    >
                      <img src={gr} alt="grid" className="w-5 h-5 " />
                    </div>
                    <div
                      className="cursor-pointer px-2 bg-gray-200 py-2 rounded-lg"
                      onClick={() => setGrid(2)}
                    >
                      <img src={gr2} alt="grid" className="w-5 h-5 " />
                    </div>
                    <div
                      className="cursor-pointer px-2 bg-gray-200 py-2 rounded-lg"
                      onClick={() => setGrid(3)}
                    >
                      <img src={gr3} alt="grid" className="w-5 h-5 " />
                    </div>
                    <div
                      className="cursor-pointer px-2 bg-gray-200 py-2 rounded-lg"
                      onClick={() => setGrid(4)}
                    >
                      <img src={gr4} alt="grid" className="w-5 h-5 " />
                    </div>
                  </div>
                </div>
              </div>
              <div
                className={`product-list mt-5 rounded-lg gap-3  ${
                  location.pathname == "/product"
                    ? `grid grid-cols-${grid}`
                    : "grid grid-cols-3"
                }`}
              >
                <ProductCard
                  data={getProducts}
                  grid={grid}
                  wishlist={wishlist}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OurStore;
