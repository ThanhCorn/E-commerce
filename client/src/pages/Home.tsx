import { Link } from "react-router-dom";
import Marquee from "react-fast-marquee";
import mainBanner from "../assets/images/main-banner-1.jpg";
import catBanner1 from "../assets/images/catbanner-01.jpg";
import catBanner2 from "../assets/images/catbanner-02.jpg";
import catBanner3 from "../assets/images/catbanner-03.jpg";
import catBanner4 from "../assets/images/catbanner-04.jpg";
import camera from "../assets/images/camera.jpg";
import laptop from "../assets/images/laptop.jpg";
import headPhone from "../assets/images/headphone.jpg";
import acc from "../assets/images/acc.jpg";
import speaker from "../assets/images/speaker.jpg";
import homeapp from "../assets/images/homeapp.jpg";
import tv from "../assets/images/tv.jpg";
import tablet from "../assets/images/tab.jpg";
import brand1 from "../assets/images/brand-01.png";
import brand2 from "../assets/images/brand-02.png";
import brand3 from "../assets/images/brand-03.png";
import brand4 from "../assets/images/brand-04.png";
import brand5 from "../assets/images/brand-05.png";
import brand6 from "../assets/images/brand-06.png";
import brand7 from "../assets/images/brand-07.png";
import brand8 from "../assets/images/brand-08.png";
import BlogCard from "../components/BlogCard";
import ProductCard from "../components/ProductCard";
import SpecialProduct from "../components/SpecialProduct";
import famousWatch from "../assets/images/famous-watch.jpg";
import macbook from "../assets/images/macbook.jpg";
import speakerApple from "../assets/images/speakerApple.jpg";
import iphone from "../assets/images/iphone.jpg";
import { services } from "../utils/data";
import { getAllBlog } from "../features/blogs/blogSlice";
import { useEffect } from "react";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../app/store";
import { getAllProduct } from "../features/products/productSlice";
import { IProduct } from "../@types/declare";
import { getUserProductWishlist } from "../features/user/userSlice";

const Home = () => {
  const dispatch: AppDispatch = useDispatch();
  const getBlogs = useSelector((state: RootState) => state.blog.blogs);
  const getProducts = useSelector((state: RootState) => state.product.products);
  const userWishlist = useSelector(
    (state: RootState) => state.auth.userWishlist
  );
  let wishlist: string[] = [];
  if (userWishlist) {
    wishlist = userWishlist.map((item: IProduct) => item._id);
  }

  useEffect(() => {
    dispatch(getAllBlog());
    dispatch(getAllProduct());
    dispatch(getUserProductWishlist());
  }, []);
  return (
    <>
      <section className="w-full h-full flex flex-col">
        <div className="max-w-screen-2xl mx-auto ">
          <div className="grid grid-cols-2 gap-5 mt-10 mb-10">
            <div className="relative 1/2">
              <img
                src={mainBanner}
                alt="Main banner"
                className="w-full h-[420px] object-fit rounded-lg "
              />
              <div className="absolute top-[10%] left-10 leading-10">
                <h4 className="text-orange-600 ">SUPERCHARGED FOR PROS</h4>
                <h5 className="2xl:text-4xl font-bold mb-5">iPad S14+ Pro.</h5>
                <p className="text-black font-normal mb-5 leading-4">
                  From $999.00 or $41.62/mo. <br />
                  for 24 mo. Footnote*
                </p>
                <Link to="" className="button">
                  Buy Now
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-5">
              <div className="relative">
                <img
                  src={catBanner1}
                  alt="Main banner"
                  className="w-full h-[200px] object-fit rounded-lg "
                />
                <div className="absolute top-[5%] left-5 leading-10">
                  <h4 className="text-orange-600 text-md">BEST SALE</h4>
                  <h5 className="text-xl font-bold mb-3">Macbook Pro.</h5>
                  <p className="text-black font-normal mb-5 leading-4">
                    From $999.00 or $41.62/mo. <br />
                  </p>
                </div>
              </div>

              <div className="relative">
                <img
                  src={catBanner2}
                  alt="Main banner"
                  className="w-full h-[200px] object-fit rounded-lg "
                />
                <div className="absolute top-[5%] left-5 leading-10">
                  <h4 className="text-orange-600 text-md">NEW ARRIVAL</h4>
                  <h5 className="text-xl font-bold mb-3">Apple Watch</h5>
                  <p className="text-black font-normal mb-5 leading-4">
                    From $999.00 or $41.62/mo. <br />
                  </p>
                </div>
              </div>
              <div className="relative">
                <img
                  src={catBanner3}
                  alt="Main banner"
                  className="w-full h-[200px] object-fit rounded-lg "
                />
                <div className="absolute top-[5%] left-5 leading-10">
                  <h4 className="text-orange-600 text-md">NEW ARRIVAL</h4>
                  <h5 className="text-xl font-bold mb-3">iPad Air</h5>
                  <p className="text-black font-normal mb-5 leading-4">
                    From $999.00 or $41.62/mo. <br />
                  </p>
                </div>
              </div>
              <div className="relative">
                <img
                  src={catBanner4}
                  alt="Main banner"
                  className="w-full h-[200px] object-fit rounded-lg "
                />
                <div className="absolute top-[5%] left-5 leading-10">
                  <h4 className="text-orange-600 text-md">NEW ARRIVAL</h4>
                  <h5 className="text-xl font-bold mb-3">HeadPhone</h5>
                  <p className="text-black font-normal mb-5 leading-4">
                    From $999.00 or $41.62/mo. <br />
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-[#f5f5f7] w-full">
          <div className="max-w-screen-2xl  mx-auto">
            <section className="px-10 h-24 w-full items-center flex justify-between gap-5">
              {services.map((service, index) => {
                return (
                  <div className="flex gap-5 items-center" key={index}>
                    <img
                      src={service.image}
                      alt="services"
                      className="h-7 w-8"
                    />
                    <div>
                      <h6 className="font-bold">{service.title}</h6>
                      <p className="text-black">{service.tagline}</p>
                    </div>
                  </div>
                );
              })}
            </section>
            <section className="px-10 mb-10">
              <div className="bg-white grid grid-cols-4 shadow-lg border-b border-gray-100">
                <div className="flex items-center justify-center border-r border-gray-100">
                  <div className="mr-5 w-[50%]">
                    <h6 className="text-md font-bold">Computers & Laptop</h6>
                    <p className="text-black">10 Items</p>
                  </div>
                  <img
                    src={laptop}
                    alt=" laptop"
                    className="h-[110px] w-[110px]"
                  />
                </div>
                <div className="flex mx-5 items-center  justify-center border-r border-gray-100">
                  <div className="mr-5 w-[50%]">
                    <h6 className="text-md font-bold">HeadPhones</h6>
                    <p className="text-black">6 Items</p>
                  </div>
                  <img
                    src={headPhone}
                    alt=" camera"
                    className="h-[110px] w-[110px]"
                  />
                </div>
                <div className="flex mx-5 items-center  justify-center border-r border-gray-100">
                  <div className="mr-5 w-[50%]">
                    <h6 className="text-md font-bold">Accessories</h6>
                    <p className="text-black">10 Items</p>
                  </div>
                  <img
                    src={acc}
                    alt="Accessories"
                    className="h-[110px] w-[110px]"
                  />
                </div>
                <div className="flex mx-5 items-center  justify-center">
                  <div className="mr-5 w-[50%]">
                    <h6 className="text-md font-bold">Portable Speaker</h6>
                    <p className="text-black">10 Items</p>
                  </div>
                  <img
                    src={speaker}
                    alt="speaker"
                    className="h-[110px] w-[110px]"
                  />
                </div>
              </div>
              <div className="bg-white grid grid-cols-4 shadow-lg">
                <div className="flex items-center  justify-center border-r border-gray-100">
                  <div className="mr-5 w-[50%]">
                    <h6 className="text-md font-bold">Smart Television</h6>
                    <p className="text-black">10 Items</p>
                  </div>
                  <img
                    src={tv}
                    alt="Smart Television"
                    className="h-[110px] w-[110px]"
                  />
                </div>
                <div className="flex mx-5 items-center  justify-center border-r border-gray-100">
                  <div className="mr-5 w-[50%]">
                    <h6 className="text-md font-bold">Home Appliances</h6>
                    <p className="text-black">10 Items</p>
                  </div>
                  <img
                    src={homeapp}
                    alt="home"
                    className="h-[110px] w-[110px]"
                  />
                </div>
                <div className="flex mx-5 items-center  justify-center border-r border-gray-100">
                  <div className="mr-5 w-[50%]">
                    <h6 className="text-md font-bold">Camera</h6>
                    <p className="text-black">10 Items</p>
                  </div>
                  <img
                    src={camera}
                    alt=" camera"
                    className="h-[110px] w-[110px]"
                  />
                </div>
                <div className="flex mx-5 items-center  justify-center ">
                  <div className="mr-5 w-[50%]">
                    <h6 className="text-md font-bold">Tablets</h6>
                    <p className="text-black">10 Items</p>
                  </div>
                  <img
                    src={tablet}
                    alt=" tablet"
                    className="h-[110px] w-[110px]"
                  />
                </div>
              </div>
            </section>
            <section className="px-10 mb-12">
              <h3 className="text-xl font-bold mb-3">Featured Collection</h3>
              <div className="grid grid-flow-col grid-cols-5 gap-5 mx-auto">
                <ProductCard
                  data={getProducts}
                  tagsProduct="features"
                  grid={false}
                  wishlist={wishlist}
                />
              </div>
            </section>
            <section className="px-10 mb-12">
              <div className="famous-card flex items-center justify-between gap-5 mx-auto">
                <div className="relative rounded-lg bg-black h-[400px] w-[300px]">
                  <img
                    src={famousWatch}
                    alt="famous"
                    className="absolute right-0  bottom-0 left-0 w-[280px] object-contain mx-auto"
                  />
                  <div className="absolute top-3 left-4 mr-3 ">
                    <h5 className="text-white text-xs opacity-80">
                      BIG SCREEN
                    </h5>
                    <h6 className="text-white font-bold text-xl my-1">
                      Smart Watch Series 7
                    </h6>
                    <p className="text-xs">
                      From $399 or $16.62/mo. for 24 mo.*
                    </p>
                  </div>
                </div>
                <div className="relative bg-white rounded-lg  h-[400px] w-[300px]">
                  <img
                    src={macbook}
                    alt="famous"
                    className="absolute right-0  bottom-0 left-0 w-[280px] object-contain mx-auto"
                  />
                  <div className="absolute top-3 left-4 mr-3 ">
                    <h5 className="text-xs opacity-80">STUDIO DISPLAY</h5>
                    <h6 className=" font-bold text-xl my-1">
                      Macbook Pro 16 inch
                    </h6>
                    <p className="text-xs text-black">
                      16-inch Retina display with True Tone
                    </p>
                  </div>
                </div>{" "}
                <div className="relative bg-white rounded-lg  h-[400px] w-[300px]">
                  <img
                    src={iphone}
                    alt="famous"
                    className="absolute right-0  bottom-0 left-0 w-[280px] h-[280px] object-contain mx-auto"
                  />
                  <div className="absolute top-3 left-4 mr-3 ">
                    <h5 className="text-xs opacity-80">SMARTPHONES</h5>
                    <h6 className=" font-bold text-xl my-1">
                      Smartphone 13 Pro.
                    </h6>
                    <p className="text-xs text-black">
                      Now in White and Black. From $699 or $29.12/mo. for 24
                      mo.*
                    </p>
                  </div>
                </div>{" "}
                <div className="relative bg-white rounded-lg h-[400px] w-[300px]">
                  <img
                    src={speakerApple}
                    alt="famous"
                    className="absolute right-0  bottom-0 left-0 w-[280px] object-contain mx-auto"
                  />
                  <div className="absolute top-3 left-4 mr-3 ">
                    <h5 className=" text-xs opacity-80">HOME SPEAKERS</h5>
                    <h6 className=" font-bold text-xl my-1">
                      Room-filling Sound.
                    </h6>
                    <p className="text-xs text-black">
                      From $399 or $16.62/mo. for 24 mo.*
                    </p>
                  </div>
                </div>
              </div>
            </section>
            <section className=" px-10 mt-10 mb-12">
              <div className="bg-white shadow-lg grid grid-flow-row">
                <Marquee className="gap-10">
                  <div className="mx-10 w-25">
                    <img
                      src={brand1}
                      alt=" laptop"
                      className="h-[110px] w-[110px]"
                    />
                  </div>
                  <div className="mx-10 w-25">
                    <img
                      src={brand2}
                      alt=" laptop"
                      className="h-[110px] w-[110px]"
                    />
                  </div>
                  <div className="mx-10 w-25">
                    <img
                      src={brand3}
                      alt=" laptop"
                      className="h-[110px] w-[110px]"
                    />
                  </div>
                  <div className="mx-10 w-25">
                    <img
                      src={brand4}
                      alt=" laptop"
                      className="h-[110px] w-[110px]"
                    />
                  </div>
                  <div className="mx-10 w-25">
                    <img
                      src={brand5}
                      alt=" laptop"
                      className="h-[110px] w-[110px]"
                    />
                  </div>
                  <div className="mx-10 w-25">
                    <img
                      src={brand6}
                      alt=" laptop"
                      className="h-[110px] w-[110px]"
                    />
                  </div>
                  <div className="mx-10 w-25">
                    <img
                      src={brand7}
                      alt=" laptop"
                      className="h-[110px] w-[110px]"
                    />
                  </div>
                  <div className="mx-10 w-25">
                    <img
                      src={brand8}
                      alt=" laptop"
                      className="h-[110px] w-[110px]"
                    />
                  </div>
                </Marquee>
              </div>
            </section>
            <section className="special-product px-10 mb-12">
              <h3 className="text-xl font-bold mb-3">Special Products</h3>
              <div className="grid grid-flow-row grid-cols-3 auto-fit gap-5 mx-auto">
                {getProducts &&
                  getProducts.map((product, index) => {
                    if (product.tags === "special") {
                      return (
                        <SpecialProduct
                          key={index}
                          id={product._id}
                          price={product.price}
                          quantity={product.quantity}
                          sold={product.sold}
                          title={product.title}
                          brand={product.brand}
                          totalRating={Number(product.totalRating)}
                          image={product.images[0].url}
                        />
                      );
                    }
                  })}
              </div>
            </section>
            <section className="popular-product px-10 mb-12">
              <h3 className="text-xl font-bold mb-3">Our Popular Products</h3>
              <div className="grid grid-flow-row grid-cols-3 auto-fit gap-5 mx-auto">
                <ProductCard
                  data={getProducts}
                  tagsProduct="popular"
                  grid={false}
                  wishlist={wishlist}
                />
              </div>
            </section>
            <section className="blog-card px-10 mb-52">
              <h3 className="text-xl font-bold mb-3">Our Latest News</h3>
              <div className="flex justify-between gap-10">
                {getBlogs.map((blog, index) => {
                  return (
                    <div key={index} className="h-full">
                      <BlogCard
                        id={blog._id}
                        title={blog.title}
                        description={blog.description}
                        date={moment(blog.createAt).format(
                          "MMMM Do YYYY, h:mm:ss a"
                        )}
                        image={blog.images[0].url}
                      />
                    </div>
                  );
                })}
              </div>
            </section>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
