import { useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../app/store';
import CustomInput from '../components/CustomInput';
import { useNavigate } from 'react-router-dom';
import { createBrands } from '../features/brand/brandSlice';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const schema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
});

const Addbrand = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const { isSuccess, isError, createBrand } = useSelector(
    (state: RootState) => state.brand,
  );
  useEffect(() => {
    if (isSuccess && createBrand) {
      toast.success('Brand Created Successfully');
    }
    if (isError) {
      toast.error('Something went wrong');
    }
  }, [isSuccess, isError, createBrand]);

  const formik = useFormik({
    initialValues: {
      title: '',
    },
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(createBrands(values));
      setTimeout(() => {
        navigate('/admin/list-brand');
      }, 3000);
    },
  });
  return (
    <div>
      <h3 className="text-2xl font-semibold mb-5">Add Brand</h3>
      <div>
        <div>
          {formik.errors.title && formik.touched.title && (
            <p className="text-red-500 text-sm">{formik.errors.title}</p>
          )}
        </div>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            placeholder="Enter Brand"
            className="border border-gray-300 bg-white placeholder:text-gray-700 rounded-sm mt-3 h-12"
            onChange={formik.handleChange('title')}
            value={formik.values.title}
          />

          <button
            type="submit"
            className="button px-2 bg-green-500 py-2 mt-7 rounded-md"
          >
            Add Brand
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addbrand;
