import { Link } from "react-router-dom";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import CustomInput from "../components/CustomInput";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { AppDispatch, RootState } from "../app/store";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../features/user/userSlice";

const schema = Yup.object().shape({
  email: Yup.string().email().required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const Login = () => {
  const dispatch: AppDispatch = useDispatch();
  const { isSuccess, userLogin } = useSelector(
    (state: RootState) => state.auth
  );

  useEffect(() => {
    if (isSuccess && userLogin) {
      toast.success("Login Successfully");
      setTimeout(() => {
        window.location.href = "/";
      }, 1000);
    }
  }, [isSuccess, userLogin]);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(loginUser(values));
      formik.resetForm();
    },
  });
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
                <form action="" onSubmit={formik.handleSubmit}>
                  <div>
                    {formik.errors.email && formik.touched.email && (
                      <p className="text-red-500 text-sm">
                        {formik.errors.email}
                      </p>
                    )}
                  </div>
                  <CustomInput
                    type="email"
                    name="email"
                    placeholder="Email"
                    className=""
                    onChange={formik.handleChange("email")}
                    value={formik.values.email}
                  />
                  <div>
                    {formik.errors.password && formik.touched.password && (
                      <p className="text-red-500 text-sm">
                        {formik.errors.password}
                      </p>
                    )}
                  </div>
                  <CustomInput
                    type="password"
                    name="password"
                    placeholder="Password"
                    className=""
                    onChange={formik.handleChange("password")}
                    value={formik.values.password}
                  />

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
