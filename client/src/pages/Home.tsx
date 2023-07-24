import { Link } from 'react-router-dom';
import mainBanner from '../assets/images/main-banner-1.jpg';

const Home = () => {
  return (
    <section className="max-w-screen-2xl mx-auto flex flex-col min-h-screen py-10 ">
      <div className="grid grid-cols-2 gap-5 md:max-w-screen-xl">
        <div className="relative">
          <img
            src={mainBanner}
            alt="Main banner"
            className="w-[90%] h-[400px] object-fit rounded-lg md:h-[1000px] "
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
        <div>asdasd</div>
      </div>
    </section>
  );
};

export default Home;
