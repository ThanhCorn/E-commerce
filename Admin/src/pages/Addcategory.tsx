import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../app/store";
import CustomInput from "../components/CustomInput";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  createPCategories,
  getProductCategory,
  resetState,
  updateProductCategory,
} from "../features/pCategory/pcategorySlice";
import { toast } from "react-toastify";

const schema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
});

const Addcategory = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { isSuccess, isError, pCategory, pCategoryName } = useSelector(
    (state: RootState) => state.pCategories
  );

  useEffect(() => {
    if (id) {
      dispatch(getProductCategory(id));
      formik.setFieldValue("title", pCategoryName);
    } else {
      dispatch(resetState());
    }
  }, [pCategoryName, id]);

  useEffect(() => {
    if (isSuccess && pCategory) {
      dispatch(resetState());
      toast.success("Category Created Successfully");
    }
    if (isError) {
      toast.error("Something went wrong");
    }
  }, [isSuccess, isError, pCategory]);

  const formik = useFormik({
    initialValues: {
      title: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (id) {
        dispatch(updateProductCategory({ id, title: values.title }));
        dispatch(resetState());
        toast.success("Updated Successfully");
        setTimeout(() => {
          navigate("/admin/list-category");
        }, 1000);
      } else {
        dispatch(createPCategories(values));
        dispatch(resetState());
      }
      formik.resetForm();
    },
  });

  return (
    <div>
      <h3 className="text-2xl font-semibold mb-5">
        {pCategoryName ? "Edit Category" : "Add Category"}
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
            placeholder="Enter Category"
            className="border border-gray-300 bg-white placeholder:text-gray-700 rounded-sm mt-3 h-12"
            onChange={formik.handleChange("title")}
            value={formik.values.title}
          />

          <button
            type="submit"
            className="button px-2 bg-green-500 py-2 mt-7 rounded-md"
          >
            {pCategoryName ? "Edit Category" : "Add Category"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addcategory;
