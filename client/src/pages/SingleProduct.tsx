import ReactStars from 'react-stars';
import BreadCrumb from '../components/BreadCrumb';
import Meta from '../components/Meta';
import { useState } from 'react';
import bestwatch from '../assets/images/bestwatch.jpg';
import Color from '../components/Color';
import { TbGitCompare, TbHeart } from 'react-icons/tb';
import ProductCard from '../components/ProductCard';

const SingleProduct = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [orderedProduct, setOrderedProduct] = useState(true);

  const copyToClipboard = (text: string): void => {
    console.log('text', text);
    const textField = document.createElement('textarea');
    textField.innerText = text;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand('copy');
    textField.remove();
  };

  return (
    <>
      <Meta title="Product Name" />
      <BreadCrumb title="Product Name" />
      <div className="store-wrapper w-full max-h-full bg-[#f5f5f7] pb-52">
        <div className="max-w-screen-2xl mx-auto">
          {/* Main Product */}
          <div className="mx-10 pt-10">
            <div className=" grid grid-flow-col grid-cols-2 mb-10 bg-white rounded-xl">
              <div className="col-span-1  px-4 py-3">
                <div className="main-product-image mb-4">
                  <img
                    src="https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?cs=srgb&dl=pexels-fernando-arcos-190819.jpg&fm=jpg"
                    alt=""
                    className="rounded-xl"
                  />
                </div>
                <div className="flex items-center gap-3 flex-wrap">
                  <div className="p-5 w-[49%] border border-gray-600">
                    <img src={bestwatch} alt="watch" className="rounded-xl" />
                  </div>
                  <div className="p-5 w-[49%] border border-gray-600">
                    <img src={bestwatch} alt="watch" className="rounded-xl" />
                  </div>
                  <div className="p-5 w-[49%] border border-gray-600">
                    <img src={bestwatch} alt="watch" className="rounded-xl" />
                  </div>
                  <div className="p-5 w-[49%] border border-gray-600">
                    <img src={bestwatch} alt="watch" className="rounded-xl" />
                  </div>
                </div>
              </div>
              <div className="col-span-1  px-4 py-3">
                <div className="main-product-detail">
                  <div>
                    <h3 className="text-xl font-bold">
                      Kids Headphones Bulk 10 Pack Multi Color For Students
                    </h3>
                    <div className="border-y-[1px] my-2 border-gray-100"></div>
                    <b>$100.00</b>
                    <div className="flex items-center gap-2">
                      <ReactStars
                        count={5}
                        size={24}
                        value={3}
                        color2={'#ffd700'}
                      />
                      <p className="text-black font-normal">( 2 Reviews )</p>
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
                        <p className="text-black font-normal">GFD</p>
                      </div>
                      <div className="flex items-center gap-2 mb-3">
                        <h3 className=" font-semibold">Categories :</h3>
                        <p className="text-black font-normal">GFD</p>
                      </div>
                      <div className="flex items-center gap-2 mb-3">
                        <h3 className=" font-semibold">Tags :</h3>
                        <p className="text-black font-normal">GFD</p>
                      </div>
                      <div className="flex items-center gap-2 mb-3">
                        <h3 className=" font-semibold">Availability :</h3>
                        <p className="text-black font-normal">GFD</p>
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
                        <Color />
                      </div>
                      <div className="flex items-center gap-3 mb-5">
                        <h3 className=" font-semibold">Quantity :</h3>
                        <div className="mr-5">
                          <input
                            type="number"
                            min={1}
                            max={10}
                            className="w-[60px] h-8 border border-gray-400 px-2 rounded-md"
                          />
                        </div>
                        <div className="flex gap-3">
                          <button className="button min-w-[130px] ">
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
                          Free shipping and returns available on all orders!{' '}
                          <br />
                          We ship all US VN domestic orders within{' '}
                          <b>5-10 business days!</b>
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <h3 className="font-semibold">Product Link:</h3>
                        <a
                          href="javscript:void(0)"
                          className="text-gray-400"
                          onClick={() => {
                            copyToClipboard(
                              'data:image/jpeg;base64,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',
                            );
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
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Enim
                placeat accusamus vel nam animi consequatur deserunt illum,
                corporis tempora! Quasi. Lorem ipsum, dolor sit amet consectetur
                adipisicing elit. Enim placeat accusamus vel nam animi
                consequatur deserunt illum, corporis tempora! Quasi. Lorem
                ipsum, dolor sit amet consectetur adipisicing elit. Enim placeat
                accusamus vel nam animi consequatur deserunt illum, corporis
                tempora! Quasi.
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
                      color2={'#ffd700'}
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
              <form action="" className="flex flex-col gap-5">
                <div className="">
                  <p className="text-gray-400 font-normal">Name</p>
                  <input
                    type="text"
                    className="input bg-white border border-gray-300"
                    placeholder="Enter Your Name"
                  />
                </div>
                <div className="">
                  <p className="text-gray-400 font-normal">Email</p>

                  <input
                    type="email"
                    className="input bg-white border border-gray-300"
                    placeholder="anhthatdeptrai@gmail.com"
                  />
                </div>
                <div className="">
                  <p className="text-gray-400 font-normal">Rating</p>
                  <ReactStars
                    count={5}
                    size={24}
                    value={0}
                    color2={'#ffd700'}
                  />
                </div>
                <div className="">
                  <p className="text-gray-400 font-normal">Review Title</p>

                  <input
                    type="text"
                    className="input bg-white border border-gray-300"
                    placeholder="Give your review a title"
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
                  ></textarea>
                </div>
                <div className="flex justify-end pb-10">
                  <button className="button">Submit Preview</button>
                </div>
              </form>
            </div>
            <div className="border-[1px] border-gray-300 mx-5"></div>

            <div className="text-gray-400 mx-5 my-5 font-normal text-lg">
              <div className="review">
                <div className="flex gap-3 items-center mb-3">
                  <h6 className="text-lg font-bold text-black">Ngoc Thanh</h6>
                  <ReactStars
                    count={5}
                    size={24}
                    value={3}
                    color2={'#ffd700'}
                  />
                </div>
                <p className="text-black font-normal">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Molestias sed temporibus libero quaerat magni nesciunt quam
                  tenetur excepturi dolorem fuga!
                </p>
              </div>
            </div>
          </div>
          <section className="popular-product px-10 mb-12">
            <h3 className="text-xl font-bold mb-3">Our Popular Products</h3>
            <div className="grid grid-flow-row grid-cols-4 auto-fit gap-5 mx-auto">
                    <ProductCard grid={false}/>
                    <ProductCard grid={false}/>
                    <ProductCard grid={false}/>
                    <ProductCard grid={false}/>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default SingleProduct;
