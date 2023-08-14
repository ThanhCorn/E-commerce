import { useDispatch, useSelector } from "react-redux";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import { AppDispatch, RootState } from "../app/store";
import {
  getInfoUser,
  resetState,
  updateInfoUser,
} from "../features/user/userSlice";
import { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { LuEdit } from "react-icons/lu";
import { useState } from "react";

const schema = Yup.object().shape({
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  email: Yup.string()
    .nullable()
    .email("Invalid email")
    .required("Email is required"),
  phone: Yup.string().required("Phone is required"),
});
const Profile = () => {
  const dispatch: AppDispatch = useDispatch();
  const userState = useSelector((state: RootState) => state.auth.userState);
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    dispatch(resetState());
    dispatch(getInfoUser());
  }, [dispatch]);

  const formik = useFormik({
    initialValues: {
      firstName: userState?.firstName,
      lastName: userState?.lastName,
      email: userState?.email,
      phone: userState?.phone,
    },
    validationSchema: schema,
    enableReinitialize: true,
    onSubmit: (values) => {
      dispatch(updateInfoUser(values));
      setIsEdit(false);
    },
  });

  useEffect(() => {
    if (localStorage.getItem("user") === null) {
      window.location.href = "/login";
    }
  });

  return (
    <>
      <Meta title="Profile" />
      <BreadCrumb title="Profile" />

      <div className="myoder-wrapper w-full max-h-full bg-[#f5f5f7] pb-52">
        <div className="max-w-screen-xl mx-auto">
          <div className="flex justify-between mx-10 pt-10 px-2">
            <h3 className="text-xl">Update Profile</h3>
            <LuEdit
              size={30}
              onClick={() => setIsEdit(!isEdit)}
              className="cursor-pointer"
            />
          </div>
          <div className="mx-10 pt-10 grid grid-flow-col gap-5 px-2 py-2">
            <form
              action=""
              className="flex flex-col gap-3"
              onSubmit={formik.handleSubmit}
            >
              <div>
                {formik.errors.firstName && formik.touched.firstName && (
                  <p className="text-red-500 text-sm">
                    {formik.errors.firstName}
                  </p>
                )}
              </div>
              <div className=" ">
                <input
                  type="text"
                  className={`input  ${
                    isEdit === false ? "bg-gray-200" : "bg-white"
                  }`}
                  placeholder="First Name"
                  name="firstName"
                  value={formik.values.firstName}
                  onChange={formik.handleChange("firstName")}
                  disabled={isEdit === false ? true : false}
                />
              </div>
              <div>
                {formik.errors.lastName && formik.touched.lastName && (
                  <p className="text-red-500 text-sm">
                    {formik.errors.lastName}
                  </p>
                )}
              </div>
              <div className=" ">
                <input
                  type="text"
                  className={`input  ${
                    isEdit === false ? "bg-gray-200" : "bg-white"
                  }`}
                  placeholder="Last Name"
                  name="lastName"
                  value={formik.values.lastName}
                  onChange={formik.handleChange("lastName")}
                  disabled={isEdit === false ? true : false}
                />
              </div>
              <div>
                {formik.errors.email && formik.touched.email && (
                  <p className="text-red-500 text-sm">{formik.errors.email}</p>
                )}
              </div>
              <div className="">
                <input
                  type="email"
                  className={`input  ${
                    isEdit === false ? "bg-gray-200" : "bg-white"
                  }`}
                  placeholder="Email"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange("email")}
                  disabled={isEdit === false ? true : false}
                />
              </div>
              <div>
                {formik.errors.phone && formik.touched.phone && (
                  <p className="text-red-500 text-sm">{formik.errors.phone}</p>
                )}
              </div>
              <div className="">
                <input
                  type="tel"
                  className={`input  ${
                    isEdit === false ? "bg-gray-200" : "bg-white"
                  }`}
                  placeholder="Phone Number"
                  name="phone"
                  value={formik.values.phone}
                  onChange={formik.handleChange("phone")}
                  disabled={isEdit === false ? true : false}
                />
              </div>

              <div className="pb-10 mt-5">
                {isEdit && (
                  <button className="button bg-blue-500 " type="submit">
                    Save
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
