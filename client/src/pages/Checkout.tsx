import { Link } from 'react-router-dom';
import { BiArrowBack } from 'react-icons/bi';

const Checkout = () => {
  return (
    <>
      <div className="store-wrapper w-full max-h-full bg-[#f5f5f7] pb-52">
        <div className="max-w-screen-2xl mx-auto">
          <div className="mx-10 pt-10 grid grid-flow-col grid-cols-12 gap-5">
            <div className="col-span-7">
              <div className="left-data-checkout leading-7">
                <h3 className="text-xl font-semibold mb-2">Dev ThanhCorn.</h3>
                <nav className="w-full rounded-md">
                  <ol className="list-reset flex">
                    <li>
                      <a
                        href="#"
                        className="text-blue-500 transition duration-150 ease-in-out hover:text-primary-600 focus:text-primary-600 active:text-primary-700 dark:text-primary-400 dark:hover:text-primary-500 dark:focus:text-primary-500 dark:active:text-primary-600"
                      >
                        Home
                      </a>
                    </li>
                    <li>
                      <span className="mx-2 text-neutral-500 dark:text-neutral-400">
                        /
                      </span>
                    </li>
                    <li className="text-neutral-500 dark:text-neutral-400">
                      Library
                    </li>
                  </ol>
                </nav>
                <h4 className="text-lg font-semibold my-2">
                  Contact information
                </h4>
                <p className="text-black font-normal mb-2">
                  Thanh Corn (nnnt10122000@gmail.com)
                </p>
                <form action="" className="flex flex-wrap justify-between">
                  <div className="w-full mb-4 border border-gray-300 rounded-md">
                    <select
                      name=""
                      id=""
                      className="w-full py-2 px-2 rounded-md"
                    >
                      <option value="" selected disabled>
                        Select Country
                      </option>
                    </select>
                  </div>

                  <div className="flex w-full gap-3  items-center justify-between mb-4 ">
                    <input
                      type="text"
                      className="input bg-white border border-gray-300"
                      placeholder="First name"
                    />
                    <input
                      type="text"
                      className="input bg-white border border-gray-300"
                      placeholder="Last name"
                    />
                  </div>
                  <div className="w-full mb-4">
                    <input
                      type="text"
                      className="input bg-white border border-gray-300"
                      placeholder="Address"
                    />
                  </div>
                  <div className="w-full mb-4 ">
                    <input
                      type="text"
                      className="input bg-white border border-gray-300"
                      placeholder="Apartment, suite, etc. (optional)"
                    />
                  </div>
                  <div className="flex w-full gap-3 items-center justify-between">
                    <input
                      type="text"
                      className="input bg-white border border-gray-300"
                      placeholder="City"
                    />
                    <select
                      name=""
                      id=""
                      className="w-full py-2 rounded-md border border-gray-300 px-2"
                    >
                      <option value="" selected disabled>
                        Select State
                      </option>
                    </select>
                    <input
                      type="text"
                      className="input bg-white border border-gray-300"
                      placeholder="ZIP code"
                    />
                  </div>
                  <div className="flex w-full mt-4">
                    <div className="flex w-full justify-between">
                      <Link to="" className="flex items-center gap-3">
                        <BiArrowBack />
                        Return to Cart
                      </Link>
                      <Link to="" className="button">
                        Continue Shopping
                      </Link>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className="col-span-5"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
