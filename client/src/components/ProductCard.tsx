import ReactStars from 'react-stars';
import watch from '../assets/images/watch.jpg';
import { Link } from 'react-router-dom';
import addCard from '../assets/images/add-card.svg';
import view from '../assets/images/view.svg';
import compare from '../assets/images/compare.svg';
import love from '../assets/images/love.svg';

const ProductCard = () => {
  return (
    <>
      <div className="bg-white rounded-md relative overflow-hidden product-card">
        <div className="absolute top-3 right-2 ">
          <Link to="">
            <img src={love} alt="love" className="w-5" />
          </Link>
        </div>
        <img src={watch} alt="watch" />
        <div className="mx-3">
          <h5 className="text-orange-600">Havels</h5>
          <h4 className="font-bold text-sm mt-2 overflow-hidden line-clamp-2">
            Kids Headphones Bulk 10 Pack Multi Colored For Students{' '}
          </h4>
          <ReactStars count={5} size={24} value={3} color2={'#ffd700'} />
          <p className="text-black font-normal mb-5">$100.00</p>
        </div>
        <div className="absolute action-bar">
          <div className="flex flex-col gap-2">
            <Link to="">
              <img src={compare} alt="compare" className="w-5" />
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
    </>
  );
};

export default ProductCard;
