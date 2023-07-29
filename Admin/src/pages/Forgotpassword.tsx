import CustomInput from '../components/CustomInput';

const Forgotpassword = () => {
  return (
    <>
      <div className="bg-yellow-400 py-5 min-h-screen flex items-center">
        <div className="w-[500px] my-5 p-6 mx-auto bg-white rounded-lg">
          <h3 className="text-center text-2xl font-semibold">
            Forgot Password
          </h3>
          <p className="text-center my-3">
            Please enter your email address to reset password
          </p>
          <form action="">
            <CustomInput
              type="text"
              name="email"
              placeholder="Email Address"
              id="email"
              className=""
            />

            <button className="mt-3 bg-yellow-300 w-full h-[40px] text-gray-400 rounded-lg">
              Send Link
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Forgotpassword;
