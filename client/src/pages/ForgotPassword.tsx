import Meta from "../components/Meta";
import BreadCrumb from "../components/BreadCrumb";
import { Link } from "react-router-dom";
import CustomInput from "../components/CustomInput";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../app/store";
import { forgotPassword } from "../features/user/userSlice";

const ForgotPassword = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [email, setEmail] = useState("");
  const dispatch: AppDispatch = useDispatch();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i)) {
      // Email format is incorrect, show an error message or handle it as needed
      return;
    }

    setIsSuccess(true);
    dispatch(forgotPassword(email));
  };

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
                {isSuccess ? (
                  <>
                    <p className="text-black text-center opacity-80 font-normal mb-3">
                      The link to reset your password has been sent to your
                      email
                    </p>
                  </>
                ) : (
                  <>
                    <p className="text-black text-center opacity-80 font-normal mb-3">
                      We will send you an email to reset your password
                    </p>
                    <form action="" onSubmit={handleSubmit}>
                      <CustomInput
                        type="email"
                        name="email"
                        placeholder="Email"
                        className="input "
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />

                      <div>
                        <div className="flex flex-col items-center gap-3">
                          <button
                            className="button hover:bg-orange-300"
                            type="submit"
                          >
                            Submit
                          </button>
                          <Link to="/login" className="">
                            Cancel
                          </Link>
                        </div>
                      </div>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
