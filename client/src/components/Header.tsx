import { Link } from 'react-router-dom';
import { BsSearch } from 'react-icons/bs';

const Header = () => {
  return (
    <div className="w-full bg-primary py-2">
      <div className="grid grid-flow-col border-b-2 border-white">
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
      <div className="grid grid-cols-12 mx-36 h-20 items-center">
        <div className="col-span-2">
          <h1>
            <Link to="" className="text-2xl text-white">
              Digitic.
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
              className="absolute right-0 top-0 h-8 px-5 rounded-r-lg  bg-yellow-500"
            >
              <BsSearch />
            </button>
          </div>
        </div>
        <div className="col-span-5 ml-24">
          <div className="flex items-center justify-between ">
            <div>
              <Link to="">
                <p>asfdasdf</p>
              </Link>
            </div>
            <div>
              <Link to="">
                <p>asfdasdf</p>
              </Link>
            </div>
            <div>
              <Link to="">
                <p>asfdasdf</p>
              </Link>
            </div>
            <div>
              <Link to="">
                <p>asfdasdf</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
