import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../app/store";
import BreadCrumb from "../components/BreadCrumb";
import CustomInput from "../components/CustomInput";
import Meta from "../components/Meta";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { registerUser } from "../features/user/userSlice";

const schema = Yup.object().shape({
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  email: Yup.string().email().required("Email is required"),
  phone: Yup.string().required("Phone Number is required"),
  password: Yup.string().required("Password is required"),
});

const Signup = () => {
  const dispatch: AppDispatch = useDispatch();
  const { isSuccess, createUser } = useSelector(
    (state: RootState) => state.auth
  );

  useEffect(() => {
    if (isSuccess && createUser) {
      toast.success("createUser Created Successfully");
    }
  }, [isSuccess, createUser]);

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      password: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(registerUser(values));
      formik.resetForm();
    },
  });
  return (
    <>
      <Meta title="Sign Up" />
      <BreadCrumb title="Sign Up" />
      <div className="wishlist-wrapper w-full max-h-full bg-[#f5f5f7] pb-32">
        <div className="max-w-screen-2xl mx-auto ">
          <div className="mx-10 pt-10 h-full flex justify-center">
            <div className="flex flex-col justify-center bg-white w-1/3 rounded-xl">
              <div className="mx-4 my-5">
                <h3 className="text-2xl font-bold mb-3 text-center opacity-50">
                  Sign Up
                </h3>
                <form action="" onSubmit={formik.handleSubmit}>
                  <div>
                    {formik.errors.firstName && formik.touched.firstName && (
                      <p className="text-red-500 text-sm">
                        {formik.errors.firstName}
                      </p>
                    )}
                  </div>
                  <CustomInput
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    className=""
                    onChange={formik.handleChange("firstName")}
                    value={formik.values.firstName}
                  />
                  <div>
                    {formik.errors.lastName && formik.touched.lastName && (
                      <p className="text-red-500 text-sm">
                        {formik.errors.lastName}
                      </p>
                    )}
                  </div>
                  <CustomInput
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    className=""
                    onChange={formik.handleChange("lastName")}
                    value={formik.values.lastName}
                  />
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
                    {formik.errors.phone && formik.touched.phone && (
                      <p className="text-red-500 text-sm">
                        {formik.errors.phone}
                      </p>
                    )}
                  </div>
                  <CustomInput
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    className=""
                    onChange={formik.handleChange("phone")}
                    value={formik.values.phone}
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
                    <div className="flex justify-center gap-3">
                      <button className="button" type="submit">
                        Sign Up
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

export default Signup;
