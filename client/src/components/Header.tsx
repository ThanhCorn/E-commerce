import { Link, NavLink } from 'react-router-dom';
import { BsSearch } from 'react-icons/bs';
import compareSVG from '../assets/images/compare.svg';
import wishlistSVG from '../assets/images/wishlist.svg';
import userSVG from '../assets/images/user.svg';
import cartSVG from '../assets/images/cart.svg';
import menuSVG from '../assets/images/menu.svg';
import { useState } from 'react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleDropdown = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const options = [
    { id: 1, label: 'Option 1' },
    { id: 2, label: 'Option 2' },
    { id: 3, label: 'Option 3' },
  ];
  return (
    <div className="w-full bg-primary pt-2">
      {/* Header top */}
      <div className="grid grid-flow-col border-b-1 border-white">
        <div className="ml-36 ">
          <p className="">Free shipping over $100 & Free return</p>
        </div>
        <div className="flex items-center justify-between ml-auto mr-36 ">
          <p className="">Hotline:[888] 4344 6000-(888) 1338 8193</p>
          <span className="text-white font-thin opacity-50 mx-5">|</span>
          <p className="mr-8">English</p>
          <p className="">USD $</p>
        </div>
      </div>
      {/* Header Upper */}
      <div className="grid grid-cols-12 mx-36 h-20 items-center">
        <div className="col-span-2">
          <h1>
            <Link to="" className="text-2xl text-white">
              Dev ThanhCorn.
            </Link>
          </h1>
        </div>
        <div className="col-span-5">
          <div className="relative mx-auto text-gray-600 flex items-center w-full ">
            <input
              className="border-2 border-gray-300 bg-white h-8 px-5 pr-16 w-full rounded-lg text-sm focus:outline-none "
              type="search"
              name="search"
              placeholder="Search product Here..."
            />
            <button
              type="submit"
              className="absolute right-0 top-0 h-8 px-5 rounded-r-lg  bg-secondary"
            >
              <BsSearch />
            </button>
          </div>
        </div>
        <div className="col-span-5 ml-24">
          <div className="flex items-center justify-between ">
            <div>
              <Link to="" className="flex items-center">
                <img src={compareSVG} alt="compare" className="mr-5" />
                <p>
                  Compare <br /> Product
                </p>
              </Link>
            </div>
            <div>
              <Link to="" className="flex items-center">
                <img src={wishlistSVG} alt="wishlist" className="mr-5" />
                <p>
                  {' '}
                  Favourite <br /> Wishlist
                </p>
              </Link>
            </div>
            <div>
              <Link to="" className="flex items-center">
                <img src={userSVG} alt="user" className="mr-5" />
                <p>
                  Log in <br /> My Account
                </p>
              </Link>
            </div>
            <div>
              <Link to="" className="flex items-center">
                <img src={cartSVG} alt="cart" className="mr-5" />
                <div className="flex flex-col  items-center">
                  <span className="bg-white text-black text-center rounded-xl w-[90%]">
                    0
                  </span>
                  <p>$ 500</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* Header Bottom */}
      <div className=" bg-third h-[50px] flex">
        <div className="mx-36 flex items-center">
          <div className="text-left flex mr-10">
            <div className="relative flex">
              <img src={menuSVG} alt="menu-icon" />
              <button
                type="button"
                onClick={toggleDropdown}
                className="flex items-center px-4 py-2 text-white font-semibold rounded-md shadow-lg focus:outline-none text-md"
              >
                Shop Categories
                <span className="ml-2 w-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="h-5 w-5"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </span>
              </button>
              {isMenuOpen && (
                <div className="absolute top-[100%] right-0 w-[200px  n] rounded-md shadow-lg bg-primary ring-1 ring-black ring-opacity-5">
                  <div
                    className="py-1"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="options-menu"
                  >
                    {options.map((option) => (
                      <button
                        key={option.id}
                        className="block w-full px-4 py-2 text-sm text-white hover:bg-gray-100 hover:text-gray-900"
                        role="menuitem"
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
          <div>
            <NavLink to="/" className="text-xs mr-4 text-white font-thin ">
              HOME
            </NavLink>
            <NavLink to="/" className="text-xs mr-4 text-white font-thin ">
              OUR STORE
            </NavLink>
            <NavLink to="/" className="text-xs mr-4 text-white font-thin ">
              BLOGS
            </NavLink>
            <NavLink to="/" className="text-xs  text-white font-thin ">
              CONTACT
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;