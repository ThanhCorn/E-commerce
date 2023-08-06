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
  createColor,
  getColor,
  resetState,
  updateColor,
} from "../features/color/colorSlice";

const schema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
});
const Addcolor = () => {
  const dispatch: AppDispatch = useDispatch();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isSuccess, isError, color, colorName } = useSelector(
    (state: RootState) => state.color
  );

  useEffect(() => {
    if (id) {
      dispatch(getColor(id));
      formik.setFieldValue("title", colorName);
    } else {
      dispatch(resetState());
    }
  }, [colorName, id]);

  useEffect(() => {
    if (isSuccess && color) {
      toast.success("Color Created Successfully");
      dispatch(resetState());
      setTimeout(() => {
        navigate("/admin/list-color");
      }, 3000);
    }
    if (isError) {
      toast.error("Something went wrong");
    }
  }, [isSuccess, isError, color]);

  const formik = useFormik({
    initialValues: {
      title: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (id) {
        dispatch(updateColor({ id, title: values.title }));
        dispatch(resetState());
        toast.success("Updated Successfully");
        setTimeout(() => {
          navigate("/admin/list-color");
        }, 1000);
      } else {
        dispatch(createColor(values));
        dispatch(resetState());
      }
      formik.resetForm();
    },
  });

  return (
    <div>
      <h3 className="text-2xl font-semibold mb-5">
        {colorName ? "Edit Color" : "Add Color"}
      </h3>
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          <div>
            {formik.errors.title && formik.touched.title && (
              <p className="text-red-500 text-sm">{formik.errors.title}</p>
            )}
          </div>
          <CustomInput
            type="color"
            placeholder="Enter Color"
            className="border border-gray-300 bg-white placeholder:text-gray-700 rounded-sm mt-3 h-12 pr-2"
            onChange={formik.handleChange("title")}
            value={formik.values.title}
          />

          <button
            type="submit"
            className="button px-2 bg-green-500 py-2 mt-7 rounded-md"
          >
            {colorName ? "Edit Color" : "Add Color"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addcolor;
