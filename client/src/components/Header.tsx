import { Link, NavLink, useNavigate } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import wishlistSVG from "../assets/images/wishlist.svg";
import userSVG from "../assets/images/user.svg";
import cartSVG from "../assets/images/cart.svg";
import menuSVG from "../assets/images/menu.svg";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../app/store";
import { getCart } from "../features/user/userSlice";
import { getUserFromLocalStorage } from "../utils/localStorage";
import { Typeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";

interface ProdOptions {
  id: number;
  prod: string;
  name: string;
}

const Header = () => {
  const dispatch: AppDispatch = useDispatch();
  const userCart = useSelector((state: RootState) => state.auth.userCart);
  const productState = useSelector(
    (state: RootState) => state.product.products
  );
  const [productOptions, setProductOptions] = useState<ProdOptions[]>([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();
  const user = getUserFromLocalStorage();

  useEffect(() => {
    if (user) {
      dispatch(getCart());
    }
  }, []);

  useEffect(() => {
    if (userCart) {
      let sum = 0;
      for (let i = 0; i < userCart?.length; i++) {
        sum += userCart[i].price * userCart[i].quantity;
      }
      setTotal(sum);
    }
  }, [userCart, user]);

  useEffect(() => {
    const data: ProdOptions[] = [];
    for (let index = 0; index < productState.length; index++) {
      const ele = productState[index];
      data.push({ id: index, prod: ele._id, name: ele.title });
    }
    setProductOptions(data);
  }, [productState]);

  const toggleDropdown = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const options = [
    { id: 1, label: "Option 1" },
    { id: 2, label: "Option 2" },
    { id: 3, label: "Option 3" },
  ];

  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  };
  return (
    <>
      <div className="bg-primary">
        {/* Header top */}
        <div className="hidden sm:block pt-2 max-w-screen-2xl mx-auto">
          <div className="grid grid-flow-col border-b-1 border-white mx-10">
            <div className="">
              <p className="flex">Free shipping over $100 & Free return</p>
            </div>
            <div className="flex justify-end">
              <p className="">Hotline:[888] 4344 6000-(888) 1338 8193</p>
              <span className="text-white font-thin opacity-50 mx-5">|</span>
              <p className="mr-8">English</p>
              <p className="">USD $</p>
            </div>
          </div>
        </div>

        {/* Header Upper */}

        <div className="max-w-screen-2xl grid grid-cols-10 mx-auto h-20 items-center ">
          <div className="col-span-2 ml-10">
            <h1>
              <Link to="" className="text-sm lg:text-2xl lg:text-white ">
                Dev ThanhCorn.
              </Link>
            </h1>
          </div>
          <div className="col-span-4">
            <div className="relative text-gray-600 flex items-center w-full  ">
              <Typeahead
                id="pagination-example"
                onPaginate={() => console.log("Results paginated")}
                options={productOptions}
                onChange={(selected) => {
                  if (selected && selected.length > 0) {
                    const selectedProduct = selected[0] as ProdOptions; // Cast the selected item to ProdOptions
                    navigate(`/product/${selectedProduct.prod}`);
                  }
                }}
                labelKey={"name"}
                placeholder="Search for product..."
                className="border-2 border-gray-300 bg-white h-8 px-5 pr-16 w-full rounded-lg text-sm focus:outline-none "
              />
              <button
                type="submit"
                className="absolute right-0 top-0 h-8 px-5 rounded-r-lg  bg-secondary"
              >
                <BsSearch />
              </button>
            </div>
          </div>
          <div className="col-span-4 flex justify-between mr-10 ml-auto">
            <div className="flex items-center  gap-10 ">
              <div className="w-[120px]">
                <Link to="/wishlist" className="flex items-center">
                  <img src={wishlistSVG} alt="wishlist" className="mr-3 ml-2" />
                  <p>
                    {" "}
                    Favourite <br /> Wishlist
                  </p>
                </Link>
              </div>
              <div className="w-[120px]">
                <Link
                  to={user ? "/my-profile" : "/login"}
                  className="flex items-center"
                >
                  <img src={userSVG} alt="user" className="mr-3" />
                  {user ? (
                    <>
                      <p className="w-[100px] flex flex-col">
                        Welcome <br /> {user?.email.split("@")[0]}
                      </p>
                    </>
                  ) : (
                    <>
                      <p className="w-[100px] flex flex-col">
                        Log in <br /> My Account
                      </p>
                    </>
                  )}
                </Link>
              </div>
              <div className="w-[90px]">
                <Link to="/cart" className="flex items-center justify-end">
                  <img src={cartSVG} alt="cart" className="mr-3" />
                  <div className="flex flex-col">
                    <span className="bg-white text-black text-center rounded-xl w-[90%]">
                      {userCart?.length}
                    </span>
                    <p>${total}</p>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Header Bottom */}
      <div className="bg-third">
        <div className="max-w-screen-2xl mx-auto h-[50px] flex ">
          <div className=" flex items-center">
            <div className="text-left flex mr-10">
              <div className="relative flex mx-10">
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
                        fillRule="evenodd"
                        d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                </button>
                {isMenuOpen && (
                  <div className="absolute top-[100%] right-0 w-[200px] z-50 rounded-md shadow-lg bg-primary ring-1 ring-black ring-opacity-5">
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
              <NavLink
                to="/product"
                className="text-xs mr-4 text-white font-thin "
              >
                OUR STORE
              </NavLink>
              <NavLink
                to="/my-orders"
                className="text-xs mr-4 text-white font-thin "
              >
                MY ORDERS
              </NavLink>
              <NavLink
                to="/blogs"
                className="text-xs mr-4 text-white font-thin "
              >
                BLOGS
              </NavLink>
              <NavLink
                to="/contact"
                className="text-xs mr-4 text-white font-thin "
              >
                CONTACT
              </NavLink>
              <button
                onClick={handleLogout}
                className="text-xs  text-white font-thin "
              >
                LOGOUT
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
