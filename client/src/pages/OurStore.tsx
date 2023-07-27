import ReactStars from 'react-stars';
import BreadCrumb from '../components/BreadCrumb';
import Meta from '../components/Meta';
import watch from '../assets/images/watch.jpg';
import gr from '../assets/images/gr.svg';
import gr2 from '../assets/images/gr2.svg';
import gr3 from '../assets/images/gr3.svg';
import gr4 from '../assets/images/gr4.svg';

import { useState } from 'react';
import ProductCard from '../components/ProductCard';
import { useLocation } from 'react-router-dom';
import Color from '../components/Color';

const OurStore = () => {
  const [grid, setGrid] = useState(3);
  const location = useLocation();
  console.log(location.pathname);

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
                      <li className="opacity-80 cursor-pointer">Home</li>
                      <li className="opacity-80 cursor-pointer">Television</li>
                      <li className="opacity-80 cursor-pointer">Camera</li>
                      <li className="opacity-80 cursor-pointer">Laptop</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="mb-3 bg-white pb-5">
                <div className="mx-4 pt-3">
                  <h3 className=" font-bold mb-4">Filter By</h3>
                  <div className="mb-3">
                    <h5 className="mb-3 font-bold text-sm ">Availability</h5>
                    <div className="form-check">
                      <input type="checkbox" value="" id="" className="mr-2" />
                      <label htmlFor="" className="text-sm opacity-80">
                        In Stock (1)
                      </label>
                    </div>
                    <div className="form-check">
                      <input type="checkbox" value="" id="" className="mr-2 " />
                      <label htmlFor="" className="text-sm opacity-80">
                        Out of Stock (0)
                      </label>
                    </div>
                  </div>
                  <div className="mb-6">
                    <h5 className="mb-3 font-bold text-sm ">Price</h5>
                    <div className="flex">
                      <input
                        type="email"
                        id="floatingInput"
                        className="w-[50%] py-2 border border-gray-300 rounded-sm px-2 text-sm mr-2"
                        placeholder="From"
                      />
                      <input
                        type="email"
                        id=""
                        className="w-[50%] py-2 border border-gray-300 rounded-sm px-2 text-sm mr-2"
                        placeholder="To"
                      />
                    </div>
                  </div>
                  <div className="mb-3">
                    <h5 className="mb-3 font-bold text-sm ">Colors</h5>
                    <div className="flex flex-wrap">
                      <Color />
                    </div>
                  </div>
                  <div className="mb-6">
                    <h5 className="mb-3 font-bold text-sm ">Size</h5>
                    <div className="flex flex-col">
                      <div className="form-check">
                        <input
                          type="checkbox"
                          value=""
                          id="size-1"
                          className="mr-2"
                        />
                        <label htmlFor="" className="text-sm opacity-80">
                          S (1)
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          type="checkbox"
                          value=""
                          id="size-2"
                          className="mr-2 "
                        />
                        <label htmlFor="" className="text-sm opacity-80">
                          M (0)
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          type="checkbox"
                          value=""
                          id="size-3"
                          className="mr-2"
                        />
                        <label htmlFor="" className="text-sm opacity-80">
                          L (1)
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mb-3 bg-white pb-5 ">
                <div className="mx-4 pt-3">
                  <h3 className=" font-bold mb-4">Product Tags</h3>
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="text-xs bg-gray-400 px-2 py-2 rounded-lg font-bold opacity-75">
                      Headphone
                    </span>
                    <span className="text-xs bg-gray-400 px-2 py-2 rounded-lg font-bold opacity-75">
                      Laptop
                    </span>
                    <span className="text-xs bg-gray-400 px-2 py-2 rounded-lg font-bold opacity-75">
                      Mobile
                    </span>
                    <span className="text-xs bg-gray-400 px-2 py-2 rounded-lg font-bold opacity-75">
                      Tablet
                    </span>
                    <span className="text-xs bg-gray-400 px-2 py-2 rounded-lg font-bold opacity-75">
                      Vivo
                    </span>
                    <span className="text-xs bg-gray-400 px-2 py-2 rounded-lg font-bold opacity-75">
                      Watch
                    </span>
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
                          color2={'#ffd700'}
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
                          color2={'#ffd700'}
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
                    className="bg-gray-200 min-w-[170px] py-2 px-2 rounded-lg opacity-70 "
                  >
                    <option value="best-selling">Best selling</option>
                    <option value="manual">Featured</option>
                    <option value="title-ascending">A-Z</option>
                    <option value="title-descending">Z-A</option>
                    <option value="price-ascending">Low to high</option>
                    <option value="price-descending">High to low</option>
                    <option value="created-descending">New to old</option>
                    <option value="created-ascending">Old to new</option>
                  </select>
                </div>
                <div className="mr-3 items-center w-[50%] h-full flex gap-5 justify-end">
                  <p className="text-black font-normal">21 Products</p>
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
                  location.pathname == '/store'
                    ? `grid grid-cols-${grid}`
                    : 'grid grid-cols-3'
                }`}
              >
                <ProductCard grid={grid} />
                <ProductCard grid={grid} />
                <ProductCard grid={grid} />
                <ProductCard grid={grid} />
                <ProductCard grid={grid} />
                <ProductCard grid={grid} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OurStore;
