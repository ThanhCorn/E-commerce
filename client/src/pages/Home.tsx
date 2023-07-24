import { Link } from 'react-router-dom';
import mainBanner from '../assets/images/main-banner-1.jpg';
import catBanner1 from '../assets/images/catbanner-01.jpg';
import catBanner2 from '../assets/images/catbanner-02.jpg';
import catBanner3 from '../assets/images/catbanner-03.jpg';
import catBanner4 from '../assets/images/catbanner-04.jpg';

const Home = () => {
  return (
    <section className="max-w-screen-2xl mx-auto flex flex-col min-h-screen py-10 ">
      <div className="grid grid-cols-2 gap-5 mx-5">
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
  );
};

export default Home;
