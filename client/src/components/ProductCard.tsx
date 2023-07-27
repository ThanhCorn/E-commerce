import ReactStars from 'react-stars';
import watch from '../assets/images/watch.jpg';
import { Link, useLocation } from 'react-router-dom';
import addCard from '../assets/images/add-card.svg';
import view from '../assets/images/view.svg';
import prodcompare from '../assets/images/prodcompare.svg';
import love from '../assets/images/love.svg';
import watch1 from '../assets/images/watch-1.jpg';

interface IProductCard {
  grid: number | boolean;
}
const ProductCard = (props: IProductCard) => {
  const location = useLocation();
  console.log(props.grid);

  return (
    <>
      <div
        className={`bg-white rounded-md overflow-hidden product-card ${
          location.pathname == '/store' && props.grid == 1 ? 'flex' : ''
        } 
  `}
      >
        <div className="product-images relative">
          <img src={watch} alt="watch" className="mx-auto" />
          <img src={watch1} alt="watch" className="mx-auto" />
          <div className="absolute top-3 right-2  ">
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
          <p
            className={`text-gray-400 my-1 leading-4 mr-5 ${
              props.grid == 1 ? 'block' : 'hidden'
            }`}
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis
            expedita molestiae obcaecati consequuntur dolore, aspernatur illo
            laboriosam iste est deleniti.
          </p>
          <p className="text-black font-normal mb-5">$100.00</p>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
