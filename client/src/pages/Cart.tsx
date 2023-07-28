import BreadCrumb from '../components/BreadCrumb';
import Meta from '../components/Meta';
import watch from '../assets/images/watch.jpg';
import { AiFillDelete } from 'react-icons/ai';
import { Link } from 'react-router-dom';

const Cart = () => {
  return (
    <div>
      <Meta title="Cart" />
      <BreadCrumb title="Cart" />
      <div className="cart-wrapper w-full max-h-full bg-[#f5f5f7] pb-52">
        <div className="max-w-screen-2xl mx-auto">
          <div className="mx-10 pt-10 grid grid-flow-col grid-cols-6 gap-5">
            <h4 className="col-span-3 font-semibold text-gray-400">Product</h4>
            <h4 className="col-span-1 font-semibold text-gray-400 text-end">
              Price
            </h4>
            <h4 className="col-span-1 font-semibold text-gray-400 text-end">
              Quantity
            </h4>
            <h4 className="col-span-1 font-semibold text-gray-400 text-end">
              Total
            </h4>
          </div>
          <div className="product-cart mb-7">
            <div className="mx-10 border border-gray-300 mt-3"></div>
            <div className="mx-10 pt-10 grid grid-flow-col grid-cols-6 gap-5">
              <div className="col-span-3 flex gap-5 items-center ">
                <div className="w-[25%]">
                  <img src={watch} alt="product  image" />
                </div>
                <div className="w-[75%]">
                  <p className="text-gray-500 font-normal">asdfsafasdfsdf</p>
                  <p className="text-gray-500 font-normal">Size:</p>
                  <p className="text-gray-500 font-normal">Color:</p>
                </div>
              </div>
              <div className="col-span-1 flex items-center justify-end">
                <h5 className="price ">$100.00</h5>
              </div>
              <div className="col-span-1 flex items-center justify-end gap-3">
                <div className="w-[50%]">
                  {' '}
                  <input
                    type="number"
                    name=""
                    min={1}
                    max={10}
                    className="w-full h-[40px] px-2 border border-gray-300 rounded-md text-end"
                  />
                </div>
                <div>
                  <AiFillDelete size={24} />
                </div>
              </div>
              <div className="col-span-1 flex items-center justify-end">
                <h5 className="price ">$100.00</h5>
              </div>
            </div>
          </div>
          <div className="mx-10 pt-10 grid grid-flow-col grid-cols-1">
            <Link
              to="/product"
              className="button max-w-[210px] py-3 hover:bg-orange-300"
            >
              Continue To Shopping
            </Link>
          </div>
          <div className="mx-10 pt-10 flex justify-between">
            <div>
              <h4 className="text-gray-400 font-normal">
                Order shecial instructions
              </h4>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-3 justify-end mb-3">
                <h5 className="text-gray-400 font-normal">Subtotal</h5>
                <h5 className="price">$100.00</h5>
              </div>
              <h5 className="text-gray-400 font-normal mb-5">
                Taxes and shipping calculated at checkout
              </h5>
              <Link to="/checkout" className="button flex justify-center">
                Check Out
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
