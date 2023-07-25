import { Link } from 'react-router-dom';
import newsletterPNG from '../assets/images/newsletter.png';
import { BsGithub, BsInstagram, BsLinkedin, BsYoutube } from 'react-icons/bs';
const Footer = () => {
  return (
    <>
      <div className="bg-third ">
        <div className="max-w-screen-2xl mx-auto text-3xl">
          <div className="grid grid-cols-2 py-10 items-center m-10">
            <div className="col-span-1">
              <div className="flex  ">
                <img
                  className="h-[25px] w-[25px] mr-2"
                  src={newsletterPNG}
                  alt="newsletter"
                />
                <h2 className="text-white font-normal text-2xl ">
                  Sign Up For Newsletter
                </h2>
              </div>
            </div>
            <div className="col-span-1">
              <div className="flex items-center justify-center bg-white rounded-lg shadow-sm">
                <input
                  type="email"
                  className="w-full py-1 pl-4 text-gray-700 rounded-l-lg text-lg focus:outline-none placeholder:text-lg placeholder-items-center "
                  placeholder="Your email address"
                />
                <button className="bg-third text-white py-2 px-3 mr-1 rounded-md focus:outline-none text-xs">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-12 m-10">
            <div className="col-span-3">
              <h4 className="text-white text-xl mb-4">Contact Us</h4>
              <div className="footer-links">
                <p className="leading-5">
                  No. 210 Co Giang, P. Co Giang, <br /> Q.1, TPHCM
                </p>
                <a href="tel: +84 213123123" className="">
                  +84 213123123
                </a>
                <a href="nnnt10122000@gmail.com" className="">
                  nnnt10122000@gmail.com
                </a>
                <div className="footer-icons">
                  <a href="">
                    <BsLinkedin size={20} />
                  </a>
                  <a href="">
                    <BsInstagram size={20} />
                  </a>
                  <a href="">
                    <BsGithub size={20} />
                  </a>
                  <a href="">
                    <BsYoutube size={20} />
                  </a>
                </div>
              </div>
            </div>
            <div className="col-span-2">
              <h4 className="text-white text-xl  mb-4">Information</h4>
              <div className="footer-links">
                <Link to="">Privacy Policy</Link>
                <Link to="">Refund Policy</Link>
                <Link to="">Shipping Policy</Link>
                <Link to="">Terms Of Service</Link>
                <Link to="">Blogs</Link>
              </div>
            </div>
            <div className="col-span-2">
              <h4 className="text-white text-xl mb-4">Account</h4>
              <div className="footer-links">
                <Link to="">Search</Link>
                <Link to="">About Us</Link>
                <Link to="">Fag</Link>
                <Link to="">Contact</Link>
                <Link to="">Size Chart</Link>
              </div>
            </div>
            <div className="col-span-2">
              <h4 className="text-white text-xl mb-4 ">Quick Links</h4>
              <div className="footer-links">
                <Link to="">Accessories</Link>
                <Link to="">Laptops</Link>
                <Link to="">Headphones</Link>
                <Link to="">Smart Watch</Link>
                <Link to="">Tablets</Link>
              </div>
            </div>
            <div className="col-span-3">
              <h4 className="text-white text-xl">Our App</h4>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
