import { Link } from 'react-router-dom';
import Marquee from 'react-fast-marquee';
import mainBanner from '../assets/images/main-banner-1.jpg';
import catBanner1 from '../assets/images/catbanner-01.jpg';
import catBanner2 from '../assets/images/catbanner-02.jpg';
import catBanner3 from '../assets/images/catbanner-03.jpg';
import catBanner4 from '../assets/images/catbanner-04.jpg';
import service from '../assets/images/service.png';
import service2 from '../assets/images/service-02.png';
import service3 from '../assets/images/service-03.png';
import service4 from '../assets/images/service-04.png';
import service5 from '../assets/images/service-05.png';
import camera from '../assets/images/camera.jpg';
import laptop from '../assets/images/laptop.jpg';
import headPhone from '../assets/images/headphone.jpg';
import acc from '../assets/images/acc.jpg';
import speaker from '../assets/images/speaker.jpg';
import homeapp from '../assets/images/homeapp.jpg';
import tv from '../assets/images/tv.jpg';
import tablet from '../assets/images/tab.jpg';
import brand1 from '../assets/images/brand-01.png';
import brand2 from '../assets/images/brand-02.png';
import brand3 from '../assets/images/brand-03.png';
import brand4 from '../assets/images/brand-04.png';
import brand5 from '../assets/images/brand-05.png';
import brand6 from '../assets/images/brand-06.png';
import brand7 from '../assets/images/brand-07.png';
import brand8 from '../assets/images/brand-08.png';
import BlogCard from '../components/BlogCard';
import ProductCard from '../components/ProductCard';

const Home = () => {
  return (
    <>
      <section className="max-w-screen-2xl mb-12 h-full mx-auto">
        <div className="grid grid-cols-2 gap-5 m-10">
          <div className="relative">
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
              <Link
                to=""
                className="px-5 bg-third text-white text-md rounded-full "
              >
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
      </section>
      <div className="bg-[#f5f5f7]">
        <section className="px-10 h-24 w-full items-center flex justify-between gap-5">
          <div className="flex gap-5 items-center">
            <img src={service} alt="" className="h-7 w-8" />
            <div>
              <h6 className="font-bold">Free shipping</h6>
              <p className="text-black">From all orders over $100</p>
            </div>
          </div>
          <div className="flex gap-5 items-center">
            <img src={service2} alt="" className="h-7 w-8" />
            <div>
              <h6 className="font-bold">Daily Surprise Offers</h6>
              <p className="text-black">Save up to 25% off</p>
            </div>
          </div>
          <div className="flex gap-5 items-center">
            <img src={service3} alt="" className="h-7 w-8" />
            <div>
              <h6 className="font-bold">Support 24/7</h6>
              <p className="text-black">Shop with an expert</p>
            </div>
          </div>
          <div className="flex gap-5 items-center">
            <img src={service4} alt="" className="h-7 w-8" />
            <div>
              <h6 className="font-bold">Affordable Prices</h6>
              <p className="text-black">Get factory direct price</p>
            </div>
          </div>
          <div className="flex gap-5 items-center">
            <img src={service5} alt="" className="h-8 w-10" />
            <div>
              <h6 className="font-bold">Secure Payments</h6>
              <p className="text-black">100% Protected Payments</p>
            </div>
          </div>
        </section>
        <section className="px-10">
          <div className="bg-white grid grid-cols-4 shadow-lg border-b border-gray-100">
            <div className="flex items-center justify-center border-r border-gray-100">
              <div className="mr-5 w-[50%]">
                <h6 className="text-md font-bold">Computers & Laptop</h6>
                <p className="text-black">10 Items</p>
              </div>
              <img src={laptop} alt=" laptop" className="h-[110px] w-[110px]" />
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
              <img src={homeapp} alt="home" className="h-[110px] w-[110px]" />
            </div>
            <div className="flex mx-5 items-center  justify-center border-r border-gray-100">
              <div className="mr-5 w-[50%]">
                <h6 className="text-md font-bold">Camera</h6>
                <p className="text-black">10 Items</p>
              </div>
              <img src={camera} alt=" camera" className="h-[110px] w-[110px]" />
            </div>
            <div className="flex mx-5 items-center  justify-center ">
              <div className="mr-5 w-[50%]">
                <h6 className="text-md font-bold">Tablets</h6>
                <p className="text-black">10 Items</p>
              </div>
              <img src={tablet} alt=" tablet" className="h-[110px] w-[110px]" />
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
        <section className="px-10 mb-12">
          <h3 className="text-xl font-bold mb-3">Featured Collection</h3>
          <div className="grid grid-flow-col grid-cols-5 gap-5">
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
          </div>
        </section>
        <section className="px-10">
          <h3 className="text-xl font-bold mb-3">Our Latest News</h3>
          <div className="grid grid-flow-col grid-cols-4 gap-5">
            <BlogCard />
            <BlogCard />
            <BlogCard />
            <BlogCard />
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;
