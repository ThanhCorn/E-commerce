import { AiOutlineCheckCircle } from "react-icons/ai";

const Checkout = () => {
  return (
    <>
      <div className="store-wrapper w-full max-h-full bg-[#f5f5f7] pb-52">
        <div className="max-w-screen-2xl mx-auto">
          <div className="mx-10 pt-10 flex justify-center">
            <div className="flex flex-col justify-center items-center mt-10">
              <AiOutlineCheckCircle
                size={100}
                className="text-green-500 mb-3"
              />
              <div>
                <h2 className="text-2xl text-green-500">Completed Purchase</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
