import BreadCrumb from '../components/BreadCrumb';
import Meta from '../components/Meta';
import cross from '../assets/images/cross.svg';
import watch from '../assets/images/watch.jpg';

const Wishlist = () => {
  return (
    <div>
      <Meta title="Wishlist" />
      <BreadCrumb title="Wishlist" />
      <div className="wishlist-wrapper w-full max-h-full bg-[#f5f5f7] pb-52">
        <div className="max-w-screen-2xl mx-auto ">
          <div className="mx-10 pt-10 grid grid-flow-col grid-cols-5 gap-5 h-full">
            <div className="relative h-full bg-white rounded-xl ">
              <img
                src={cross}
                alt="cross"
                className="absolute object-contain top-2 right-2 w-5 h-5 cursor-pointer p-1   "
              />
              <div>
                <img
                  src={watch}
                  alt="watch"
                  className="h-[200px] w-full rounded-xl"
                />
                <div className="mx-3">
                  <h5 className="text-sm line-clamp-2 overflow-hidden my-2 font-bold">
                    Honor T1 7.0 1GB RAM 8GB ROM 7 Inch With Wi-Fi + 3G Tablet
                  </h5>
                  <h6 className="mb-3 text-sm font-bold opacity-80">$100</h6>
                </div>
              </div>
            </div>
            <div className="relative h-full bg-white rounded-xl ">
              <img
                src={cross}
                alt="cross"
                className="absolute object-contain top-2 right-2 w-5 h-5 cursor-pointer p-1   "
              />
              <div>
                <img
                  src={watch}
                  alt="watch"
                  className="h-[200px] w-full rounded-xl"
                />
                <div className="mx-3">
                  <h5 className="text-sm line-clamp-2 overflow-hidden my-2 font-bold">
                    Honor T1 7.0 1GB RAM 8GB ROM 7 Inch With Wi-Fi + 3G Tablet
                  </h5>
                  <h6 className="mb-3 text-sm font-bold opacity-80">$100</h6>
                </div>
              </div>
            </div>
            <div className="relative h-full bg-white rounded-xl ">
              <img
                src={cross}
                alt="cross"
                className="absolute object-contain top-2 right-2 w-5 h-5 cursor-pointer p-1   "
              />
              <div>
                <img
                  src={watch}
                  alt="watch"
                  className="h-[200px] w-full rounded-xl"
                />
                <div className="mx-3">
                  <h5 className="text-sm line-clamp-2 overflow-hidden my-2 font-bold">
                    Honor T1 7.0 1GB RAM 8GB ROM 7 Inch With Wi-Fi + 3G Tablet
                  </h5>
                  <h6 className="mb-3 text-sm font-bold opacity-80">$100</h6>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
