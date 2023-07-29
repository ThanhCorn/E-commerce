import CustomInput from '../components/CustomInput';

const Resetpassword = () => {
  return (
    <>
      <div className="bg-yellow-400 py-5 min-h-screen flex items-center">
        <div className="w-[500px] my-5 p-6 mx-auto bg-white rounded-lg">
          <h3 className="text-center text-2xl font-semibold">Reset Password</h3>
          <p className="text-center my-3">Please enter your new password</p>
          <form action="">
            <CustomInput
              type="password"
              name="password"
              placeholder="New Password"
              className=""
            />
            <CustomInput
              type="password"
              name="password"
              placeholder="Confirm Password"
              className=""
            />

            <button className="bg-yellow-300 w-full h-[40px] text-gray-400 rounded-lg mt-3">
              Reset Password
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Resetpassword;
