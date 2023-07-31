import CustomInput from "../components/CustomInput";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../app/store";
import { login } from "../features/auth/authSlice";
import { useEffect } from "react";

const SignupSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Password is required"),
});

const Login = () => {
  const dispatch: AppDispatch = useDispatch();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { isSuccess, errorMessage } = useSelector(
    (state: RootState) => state.auth
  );
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: SignupSchema,
    onSubmit: (values) => {
      dispatch(login(values));
    },
  });

  useEffect(() => {
    if (isSuccess) {
      navigate("/admin");
    }
  });

  return (
    <>
      <div className="bg-yellow-400 py-5 min-h-screen flex items-center">
        <div className="w-[400px] my-5 p-6 mx-auto bg-white rounded-lg">
          <h3 className="text-center text-2xl font-semibold">Login</h3>
          <p className="text-center my-3">Login to your account to continue</p>
          <form action="" onSubmit={formik.handleSubmit}>
            <div className="error">
              {errorMessage == "Rejected" ? "You are not admin" : ""}
            </div>
            <div className="error">
              {formik.errors.email && formik.touched.email && (
                <p className="text-red-500 text-sm">{formik.errors.email}</p>
              )}
            </div>
            <CustomInput
              type="text"
              name="email"
              placeholder="Email Address"
              id="email"
              className=""
              onChange={formik.handleChange}
              value={formik.values.email}
            />
            <div className="error">
              {formik.errors.password && formik.touched.password && (
                <p className="text-red-500 text-sm">{formik.errors.password}</p>
              )}
            </div>
            <CustomInput
              type="password"
              name="password"
              placeholder="Password"
              id="pass"
              className=""
              onChange={formik.handleChange("password")}
              value={formik.values.password}
            />
            <div className="text-end mb-3 underline text-sm text-blue-600">
              <Link to="/forgot-password">Forgot Password?</Link>
            </div>
            <div className="bg-yellow-300 px-2 text-center text-gray-400 h-[40px] flex items-center justify-center ">
              <button className="w-full">Login</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
