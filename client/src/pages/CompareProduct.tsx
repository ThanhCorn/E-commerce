import BreadCrumb from '../components/BreadCrumb';
import Meta from '../components/Meta';
import cross from '../assets/images/cross.svg';
import watch from '../assets/images/watch.jpg';
import Color from '../components/Color';

const CompareProduct = () => {
  return (
    <div>
      <Meta title="Compare Product" />
      <BreadCrumb title="Compare Product" />
      <div className="compare-wrapper w-full max-h-full bg-[#f5f5f7] pb-5">
        <div className="max-w-screen-2xl mx-auto">
          <div className="mx-10 pt-10 grid grid-flow-col grid-cols-5 gap-5 h-full">
            <div className="relative h-full bg-white rounded-xl pb-4">
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
              </div>
              <div className="mx-3">
                <h5 className="text-sm line-clamp-2 overflow-hidden my-2 font-bold">
                  Honor T1 7.0 1GB RAM 8GB ROM 7 Inch With Wi-Fi + 3G Tablet
                </h5>
                <h6 className="mb-3 text-sm">$100</h6>
                <div>
                  <div className="flex items-center justify-between border-t border-gray-200 py-5">
                    <h5 className="font-bold opacity-80">Brand:</h5>
                    <p className="text-black">Havels</p>
                  </div>
                  <div className="flex items-center justify-between border-t border-gray-200 py-5">
                    <h5 className="font-bold opacity-80">Type:</h5>
                    <p className="text-black">Watch</p>
                  </div>
                  <div className="flex items-center justify-between border-t border-gray-200 py-5">
                    <h5 className="font-bold opacity-80">Availability:</h5>
                    <p className="text-black">In Stock</p>
                  </div>
                  <div className="flex items-center justify-between border-t border-gray-200 py-5">
                    <h5 className="font-bold opacity-80">Color:</h5>
                    <Color />
                  </div>
                  <div className="flex items-center justify-between border-t border-gray-200 py-5">
                    <h5 className="font-bold opacity-80">Size:</h5>
                    <div className="flex items-center">
                      <p className="text-black mr-3">S</p>
                      <p className="text-black">M</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative h-full bg-white rounded-xl pb-4">
              <img
                src={cross}
                alt="cross"
                className="absolute object-contain top-2 right-2 w-5 h-5 cursor-pointer p-1   "
              />
              <div>
                <img
                  src={watch}
                  alt="watch"
                  className="h-[200px]  w-full rounded-xl"
                />
              </div>
              <div className="mx-3">
                <h5 className="text-sm line-clamp-2 overflow-hidden my-2 font-bold">
                  Honor T1 7.0 1GB RAM 8GB ROM 7 Inch With Wi-Fi + 3G Tablet
                </h5>
                <h6 className="mb-3 text-sm">$100</h6>
                <div>
                  <div className="flex items-center justify-between border-t border-gray-200 py-5">
                    <h5 className="font-bold opacity-80">Brand:</h5>
                    <p className="text-black">Havels</p>
                  </div>
                  <div className="flex items-center justify-between border-t border-gray-200 py-5">
                    <h5 className="font-bold opacity-80">Type:</h5>
                    <p className="text-black">Watch</p>
                  </div>
                  <div className="flex items-center justify-between border-t border-gray-200 py-5">
                    <h5 className="font-bold opacity-80">Availability:</h5>
                    <p className="text-black">In Stock</p>
                  </div>
                  <div className="flex items-center justify-between border-t border-gray-200 py-5">
                    <h5 className="font-bold opacity-80">Color:</h5>
                    <Color />
                  </div>
                  <div className="flex items-center justify-between border-t border-gray-200 py-5">
                    <h5 className="font-bold opacity-80">Size:</h5>
                    <div className="flex items-center">
                      <p className="text-black mr-3">S</p>
                      <p className="text-black">M</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative h-full bg-white rounded-xl pb-4">
              <img
                src={cross}
                alt="cross"
                className="absolute object-contain top-2 right-2 w-5 h-5 cursor-pointer p-1   "
              />
              <div>
                <img
                  src={watch}
                  alt="watch"
                  className="h-[200px]  w-full rounded-xl"
                />
              </div>
              <div className="mx-3">
                <h5 className="text-sm line-clamp-2 overflow-hidden my-2 font-bold">
                  Honor T1 7.0 1GB RAM 8GB ROM 7 Inch With Wi-Fi + 3G Tablet
                </h5>
                <h6 className="mb-3 text-sm">$100</h6>
                <div>
                  <div className="flex items-center justify-between border-t border-gray-200 py-5">
                    <h5 className="font-bold opacity-80">Brand:</h5>
                    <p className="text-black">Havels</p>
                  </div>
                  <div className="flex items-center justify-between border-t border-gray-200 py-5">
                    <h5 className="font-bold opacity-80">Type:</h5>
                    <p className="text-black">Watch</p>
                  </div>
                  <div className="flex items-center justify-between border-t border-gray-200 py-5">
                    <h5 className="font-bold opacity-80">Availability:</h5>
                    <p className="text-black">In Stock</p>
                  </div>
                  <div className="flex items-center justify-between border-t border-gray-200 py-5">
                    <h5 className="font-bold opacity-80">Color:</h5>
                    <Color />
                  </div>
                  <div className="flex items-center justify-between border-t border-gray-200 py-5">
                    <h5 className="font-bold opacity-80">Size:</h5>
                    <div className="flex items-center">
                      <p className="text-black mr-3">S</p>
                      <p className="text-black">M</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative h-full bg-white rounded-xl pb-4">
              <img
                src={cross}
                alt="cross"
                className="absolute object-contain top-2 right-2 w-5 h-5 cursor-pointer p-1   "
              />
              <div>
                <img
                  src={watch}
                  alt="watch"
                  className="h-[200px]  w-full rounded-xl"
                />
              </div>
              <div className="mx-3">
                <h5 className="text-sm line-clamp-2 overflow-hidden my-2 font-bold">
                  Honor T1 7.0 1GB RAM 8GB ROM 7 Inch With Wi-Fi + 3G Tablet
                </h5>
                <h6 className="mb-3 text-sm">$100</h6>
                <div>
                  <div className="flex items-center justify-between border-t border-gray-200 py-5">
                    <h5 className="font-bold opacity-80">Brand:</h5>
                    <p className="text-black">Havels</p>
                  </div>
                  <div className="flex items-center justify-between border-t border-gray-200 py-5">
                    <h5 className="font-bold opacity-80">Type:</h5>
                    <p className="text-black">Watch</p>
                  </div>
                  <div className="flex items-center justify-between border-t border-gray-200 py-5">
                    <h5 className="font-bold opacity-80">Availability:</h5>
                    <p className="text-black">In Stock</p>
                  </div>
                  <div className="flex items-center justify-between border-t border-gray-200 py-5">
                    <h5 className="font-bold opacity-80">Color:</h5>
                    <Color />
                  </div>
                  <div className="flex items-center justify-between border-t border-gray-200 py-5">
                    <h5 className="font-bold opacity-80">Size:</h5>
                    <div className="flex items-center">
                      <p className="text-black mr-3">S</p>
                      <p className="text-black">M</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompareProduct;
