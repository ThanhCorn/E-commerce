import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../app/store";
import CustomInput from "../components/CustomInput";
import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  createBlogCategories,
  getBlogCategory,
  resetState,
  updateBlogCategory,
} from "../features/bCategory/bcategorySlice";

const schema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
});

const Addblogcategory = () => {
  const dispatch: AppDispatch = useDispatch();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isSuccess, isError, bCategory, bCategoryName } = useSelector(
    (state: RootState) => state.bCategories
  );

  useEffect(() => {
    if (id) {
      dispatch(getBlogCategory(id));
      formik.setFieldValue("title", bCategoryName);
    } else {
      dispatch(resetState());
    }
  }, [bCategoryName, id]);

  useEffect(() => {
    if (isSuccess && bCategory) {
      toast.success("Blog Category Created Successfully");
      dispatch(resetState());
    }
    if (isError) {
      toast.error("Something went wrong");
    }
  }, [isSuccess, isError, bCategory]);

  const formik = useFormik({
    initialValues: {
      title: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (id) {
        dispatch(updateBlogCategory({ id, title: values.title }));
        dispatch(resetState());
        setTimeout(() => {
          navigate("/admin/blog-category-list");
        }, 1000);
      } else {
        dispatch(createBlogCategories(values));
        dispatch(resetState());
      }
      formik.resetForm();
    },
  });
  return (
    <div>
      <h3 className="text-2xl font-semibold mb-5">
        {bCategoryName ? "Edit Blog Category" : "Add Blog Category"}
      </h3>
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          <div>
            {formik.errors.title && formik.touched.title && (
              <p className="text-red-500 text-sm">{formik.errors.title}</p>
            )}
          </div>
          <CustomInput
            type="text"
            placeholder="Enter Blog Category"
            className="border border-gray-300 bg-white placeholder:text-gray-700 rounded-sm mt-3 h-12"
            onChange={formik.handleChange("title")}
            value={formik.values.title}
          />

          <button
            type="submit"
            className="button px-2 bg-green-500 py-2 mt-7 rounded-md"
          >
            {bCategoryName ? "Edit Blog Category" : "Add Blog Category"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addblogcategory;
