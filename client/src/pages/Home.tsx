import { Link } from 'react-router-dom';
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

const Home = () => {
  return (
    <div>
    <section className="max-w-screen-2xl mx-auto flex flex-col mb-12 ">
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
    <div className='bg-[#f5f5f7] h-screen'>

    <section className='px-10 h-24 w-full items-center flex justify-between gap-5'>
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
    <section className=' px-10'>
      <div className='bg-white flex justify-between shadow-lg'>
        <div className='flex mx-5 items-center'>
          <div className='mr-5'>
            <h6>Camera</h6>
            <p className='text-black'>10 Items</p>
          </div>
          <img src={camera} alt=" camera" />
        </div>
        <div className='flex mx-5 items-center'>
          <div className='mr-5'>
            <h6>Camera</h6>
            <p className='text-black'>10 Items</p>
          </div>
          <img src={camera} alt=" camera" />
        </div>
        <div className='flex mx-5 items-center'>
          <div className='mr-5'>
            <h6>Camera</h6>
            <p className='text-black'>10 Items</p>
          </div>
          <img src={camera} alt=" camera" />
        </div>
        <div className='flex mx-5 items-center'>
          <div className='mr-5'>
            <h6>Camera</h6>
            <p className='text-black'>10 Items</p>
          </div>
          <img src={camera} alt=" camera" />
        </div>
        <div className='flex mx-5 items-center'>
          <div className='mr-5'>
            <h6>Camera</h6>
            <p className='text-black'>10 Items</p>
          </div>
          <img src={camera} alt=" camera" />
        </div>
      </div>
    </section>
    </div>
    </div>

  );
};

export default Home;
