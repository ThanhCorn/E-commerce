import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import { AiOutlineHome, AiOutlineMail } from "react-icons/ai";
import { BiInfoCircle, BiPhoneCall } from "react-icons/bi";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../app/store";
import { createContact } from "../features/contact/contactSlice";

const schema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .nullable()
    .email("Invalid email")
    .required("Email is required"),
  phone: Yup.string().required("Phone is required"),
  comment: Yup.string().required("Comment is required"),
});

const Contact = () => {
  const dispatch: AppDispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      comment: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(createContact(values));
      formik.resetForm();
    },
  });
  return (
    <>
      <Meta title="Contact Us" />
      <BreadCrumb title="Contact Us" />

      <div className="store-wrapper w-full max-h-full bg-[#f5f5f7] pb-52">
        <div className="max-w-screen-2xl mx-auto">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.1264928439655!2d106.71188097583854!3d10.801622758726843!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317528a459cb43ab%3A0x6c3d29d370b52a7e!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBDw7RuZyBuZ2jhu4cgVFAuSENNIChIVVRFQ0gpIC0gU2FpZ29uIENhbXB1cw!5e0!3m2!1svi!2s!4v1690427306921!5m2!1svi!2s"
            width="600"
            height="450"
            style={{
              border: "0",
              width: "100%",
              height: "500px",
              paddingTop: "50px",
              marginBottom: "30px",
            }}
            loading="lazy"
          ></iframe>
          <div className="grid grid-cols-2 bg-white  mb-10 rounded-xl gap-5">
            <div className="col-span-1 ml-10 mt-5">
              <h2 className="text-2xl font-bold mb-5">Contact</h2>
              <form
                action=""
                className="flex flex-col gap-3"
                onSubmit={formik.handleSubmit}
              >
                <div>
                  {formik.errors.name && formik.touched.name && (
                    <p className="text-red-500 text-sm">{formik.errors.name}</p>
                  )}
                </div>
                <div className=" ">
                  <input
                    type="text"
                    className=" input"
                    placeholder="Name"
                    value={formik.values.name}
                    onChange={formik.handleChange("name")}
                  />
                </div>
                <div>
                  {formik.errors.email && formik.touched.email && (
                    <p className="text-red-500 text-sm">
                      {formik.errors.email}
                    </p>
                  )}
                </div>
                <div className="">
                  <input
                    type="email"
                    className=" input"
                    placeholder="Email"
                    value={formik.values.email}
                    onChange={formik.handleChange("email")}
                  />
                </div>
                <div>
                  {formik.errors.phone && formik.touched.phone && (
                    <p className="text-red-500 text-sm">
                      {formik.errors.phone}
                    </p>
                  )}
                </div>
                <div className="">
                  <input
                    type="tel"
                    className=" input"
                    placeholder="Phone Number"
                    value={formik.values.phone}
                    onChange={formik.handleChange("phone")}
                  />
                </div>
                <div>
                  {formik.errors.comment && formik.touched.comment && (
                    <p className="text-red-500 text-sm">
                      {formik.errors.comment}
                    </p>
                  )}
                </div>
                <div className="">
                  <textarea
                    name=""
                    id=""
                    cols={30}
                    rows={5}
                    className=" bg-gray-100 py-2 pl-2   w-full rounded-lg flex placeholder:items-center"
                    placeholder="Comments"
                    value={formik.values.comment}
                    onChange={formik.handleChange("comment")}
                  ></textarea>
                </div>
                <div className="pb-10">
                  <button className="button" type="submit">
                    Submit
                  </button>
                </div>
              </form>
            </div>
            <div className="col-span-1  mt-5">
              <h2 className="text-2xl font-bold mb-5">Get in Touch With Us</h2>
              <div className="">
                <ul>
                  <li className="mb-3 flex items-center gap-4 ">
                    <AiOutlineHome size={25} className="text-gray-400" />
                    <p className=" font-normal text-sm text-gray-400">
                      No. 210 Co Giang, P. Co Giang, Q.1, TPHCM
                    </p>
                  </li>
                  <li className="mb-3 flex items-center gap-4 ">
                    <BiPhoneCall size={25} className="text-gray-400" />
                    <a
                      className="font-normal text-sm text-gray-400"
                      href="tel:+84 213123123"
                    >
                      +84 213123123
                    </a>
                  </li>
                  <li className="mb-3 flex items-center gap-4 ">
                    <AiOutlineMail size={25} className="text-gray-400" />
                    <a
                      className="font-normal text-sm text-gray-400"
                      href="nnnt10122000@gmail.com"
                    >
                      nnnt10122000@gmail.com
                    </a>
                  </li>
                  <li className="mb-3 flex items-center gap-4 ">
                    <BiInfoCircle size={25} className="text-gray-400" />
                    <p className="font-normal text-sm text-gray-400">
                      Monday - Friday 10 AM - 8 PM
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
