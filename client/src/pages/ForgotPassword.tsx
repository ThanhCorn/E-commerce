import Meta from '../components/Meta';
import BreadCrumb from '../components/BreadCrumb';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
  return (
    <>
      <Meta title="Forgot Password" />
      <BreadCrumb title="Forgot Password" />
      <div className="wishlist-wrapper w-full max-h-full bg-[#f5f5f7] pb-32">
        <div className="max-w-screen-2xl mx-auto ">
          <div className="mx-10 pt-10 h-full flex justify-center">
            <div className="flex flex-col justify-center bg-white w-1/3 rounded-xl">
              <div className="mx-4 my-5">
                <h3 className="text-2xl font-bold mb-3 text-center opacity-50">
                  Reset Your Password
                </h3>
                <p className="text-black text-center opacity-80 font-normal mb-3">
                  We will send you an email to reset your password
                </p>
                <form action="">
                  <div className=" mb-5 bg-gray-300 rounded-lg">
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      className=" bg-gray-100 py-2 pl-2  h-[40px] w-full rounded-lg flex placeholder:items-center"
                    />
                  </div>

                  <div>
                    <div className="flex flex-col items-center gap-3">
                      <button className="button hover:bg-orange-300">
                        Submit
                      </button>
                      <Link to="/login" className="">
                        Cancel
                      </Link>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
