import { Link } from 'react-router-dom';
import BreadCrumb from '../components/BreadCrumb';
import Meta from '../components/Meta';
import CustomInput from '../components/CustomInput';

const Login = () => {
  return (
    <>
      <Meta title="Login" />
      <BreadCrumb title="Login" />
      <div className="wishlist-wrapper w-full max-h-full bg-[#f5f5f7] pb-32">
        <div className="max-w-screen-2xl mx-auto ">
          <div className="mx-10 pt-10 h-full flex justify-center">
            <div className="flex flex-col justify-center bg-white w-1/3 rounded-xl">
              <div className="mx-4 my-5">
                <h3 className="text-2xl font-bold mb-3 text-center opacity-50">
                  Login
                </h3>
                <form action="">
                  <CustomInput 
                   type="email"
                   name="email"
                   placeholder="Email"
                   className=""/>
                  <CustomInput 
                   type="password"
                   name="password"
                   placeholder="Password"
                   className=""/>
                
              
                  <div>
                    <Link to="/forgot-password" className="text-blue-500 mb-3">
                      Forgot Password?
                    </Link>
                    <div className="flex justify-center gap-3">
                      <button className="button" type="submit">
                        Login
                      </button>
                      <Link
                        to="/signup"
                        className="button bg-orange-300 hover:bg-third"
                      >
                        Sign up
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

export default Login;
