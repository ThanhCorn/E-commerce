import BreadCrumb from '../components/BreadCrumb';
import CustomInput from '../components/CustomInput';
import Meta from '../components/Meta';

const ResetPassword = () => {
  return (
    <>
      <Meta title="Reset Password" />
      <BreadCrumb title="Reset Password" />
      <div className="wishlist-wrapper w-full max-h-full bg-[#f5f5f7] pb-32">
        <div className="max-w-screen-2xl mx-auto ">
          <div className="mx-10 pt-10 h-full flex justify-center">
            <div className="flex flex-col justify-center bg-white w-1/3 rounded-xl">
              <div className="mx-4 my-5">
                <h3 className="text-2xl font-bold mb-3 text-center opacity-50">
                  Reset Password
                </h3>
                <form action="">
                  <CustomInput  type="password"
                      name="password"
                      placeholder="Password"
                      className=""/>
                  <CustomInput  type="confirmpassword"
                      name="confirmpassword"
                      placeholder="Confirm Password"
                      className=""/>
               
                
                  <div>
                    <div className="flex justify-center gap-3">
                      <button className="button" type="submit">
                        Confirm
                      </button>
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

export default ResetPassword;
