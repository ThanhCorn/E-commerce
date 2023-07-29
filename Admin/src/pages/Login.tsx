import CustomInput from '../components/CustomInput';
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <>
      <div className="bg-yellow-400 py-5 min-h-screen flex items-center">
        <div className="w-[400px] my-5 p-6 mx-auto bg-white rounded-lg">
          <h3 className="text-center text-2xl font-semibold">Login</h3>
          <p className="text-center my-3">Login to your account to continue</p>
          <form action="">
            <CustomInput
              type="text"
              name="email"
              placeholder="Email Address"
              id="email"
              className=""
            />
            <CustomInput
              type="password"
              name="password"
              placeholder="Password"
              id="pass"
              className=""
            />
            <div className="text-end mb-3 underline text-sm text-blue-600">
              <Link to="/forgot-password">Forgot Password?</Link>
            </div>
            <div className="bg-yellow-300 px-2 text-center text-gray-400 h-[40px] flex items-center justify-center ">
              <Link to="/admin" className="w-full">
                Login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
