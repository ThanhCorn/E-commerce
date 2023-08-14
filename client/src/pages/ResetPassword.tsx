import { useNavigate, useParams } from "react-router-dom";
import BreadCrumb from "../components/BreadCrumb";
import CustomInput from "../components/CustomInput";
import Meta from "../components/Meta";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../app/store";
import { resetPassword } from "../features/user/userSlice";
import { toast } from "react-toastify";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const { token } = useParams<{ token: string }>();
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmpassword) {
      toast.error("Password do not match");
      return;
    }
    if (token) {
      toast.success("Password reset successfully");
      dispatch(resetPassword({ password, token }));
      navigate("/login");
    }
  };
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
                <form action="" onSubmit={handleSubmit}>
                  <CustomInput
                    type="password"
                    name="password"
                    placeholder="Password"
                    className=""
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <CustomInput
                    type="password"
                    name="confirmpassword"
                    placeholder="Confirm Password"
                    className=""
                    value={confirmpassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />

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
