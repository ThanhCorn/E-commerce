import ReactStars from 'react-stars';
import BreadCrumb from '../components/BreadCrumb';
import Meta from '../components/Meta';
import { useState } from 'react';
import SpecialProduct from '../components/SpecialProduct';
import bestwatch from '../assets/images/bestwatch.jpg';

const SingleProduct = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [orderedProduct, setOrderedProduct] = useState(true);
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
                    <a href="#review">Write a Review</a>
                    <div className="border-y-[1px] my-2 border-gray-300"></div>
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
            <div className="grid grid-flow-row grid-cols-3 auto-fit gap-5 mx-auto">
              <SpecialProduct />
              <SpecialProduct />
              <SpecialProduct />
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default SingleProduct;
