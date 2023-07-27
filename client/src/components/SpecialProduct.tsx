import ReactStars from 'react-stars';
import watch from '../assets/images/watch.jpg';
import { Link } from 'react-router-dom';
import addCard from '../assets/images/add-card.svg';
import view from '../assets/images/view.svg';
import prodcompare from '../assets/images/prodcompare.svg';
import love from '../assets/images/love.svg';

const SpecialProduct = () => {
  return (
    <>
      <div className="bg-white rounded-md overflow-hidden product-card flex pb-5">
        <div className="relative">
          <img src={watch} alt="watch" className="w-[350px] h-[250px]" />
          <div className="absolute top-3 right-2 ">
            <Link to="">
              <img src={love} alt="love" className="w-5" />
            </Link>
          </div>
          <div className="absolute action-bar">
            <div className="flex flex-col gap-2">
              <Link to="">
                <img src={prodcompare} alt="prodcompare" className="w-5" />
              </Link>
              <Link to="">
                <img src={addCard} alt="add card" />
              </Link>
              <Link to="">
                <img src={view} alt="view" />
              </Link>
            </div>
          </div>
        </div>

        <div className="mx-3">
          <h5 className="text-orange-600">Havels</h5>
          <h4 className="font-bold text-sm mt-2 overflow-hidden line-clamp-2">
            Kids Headphones Bulk 10 Pack Multi Colored For Students{' '}
          </h4>
          <ReactStars count={5} size={24} value={3} color2={'#ffd700'} />
          <p className="text-black font-normal mb-3">
            <span className="text-red-600 text-lg">$100</span>
            <span className="line-through ml-3">$200</span>
          </p>
          <div className="flex items-center">
            <p className="w-[70px]">
              <b className="text-black">5 days</b>
            </p>
            <div className="flex gap-1 items-center">
              <span className="px-4 py-2 rounded-full bg-yellow-400">1</span>:
              <span className="px-4 py-2 rounded-full bg-yellow-400">1</span>:
              <span className="px-4 py-2 rounded-full bg-yellow-400">1</span>
            </div>
          </div>
          <div className="">
            <p className="text-black my-2 ">Products: 5</p>
            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4 dark:bg-gray-700">
              <div
                className="bg-blue-600 h-2.5 rounded-full dark:bg-blue-500"
                style={{ width: '45%' }}
              ></div>
            </div>
          </div>
          <div className="">
            <Link to="">
              <p className="button">Add to Cart</p>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default SpecialProduct;
