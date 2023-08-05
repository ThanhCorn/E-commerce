import { useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../app/store';
import CustomInput from '../components/CustomInput';
import { useNavigate, useParams } from 'react-router-dom';
import {
  createBrands,
  getBrand,
  updateBrand,
} from '../features/brand/brandSlice';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { resetState } from '../features/brand/brandSlice';

const schema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
});

const Addbrand = () => {
  const dispatch: AppDispatch = useDispatch();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isSuccess, isError, brand, brandName } = useSelector(
    (state: RootState) => state.brand,
  );
  useEffect(() => {
    if (id) {
      dispatch(getBrand(id));
      formik.setFieldValue('title', brandName);
    } else {
      dispatch(resetState());
    }
  }, [brandName, id]);
  useEffect(() => {
    if (isSuccess && brand) {
      toast.success('Brand Created Successfully');
      dispatch(resetState());
      setTimeout(() => {
        navigate('/admin/list-brand');
      }, 3000);
    }
    if (isError) {
      toast.error('Something went wrong');
    }
  }, [isSuccess, isError, brand]);

  const formik = useFormik({
    initialValues: {
      title: '',
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (id) {
        dispatch(updateBrand({ id, title: values.title }));
        dispatch(resetState());
        toast.success('Updated Successfully');
        setTimeout(() => {
          navigate('/admin/list-brand');
        }, 3000);
      } else {
        dispatch(createBrands(values));
      }
      formik.resetForm();
    },
  });
  return (
    <div>
      <h3 className="text-2xl font-semibold mb-5">
        {brandName ? 'Edit Brand' : 'Add Brand'}
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
            placeholder="Enter Brand"
            className="border border-gray-300 bg-white placeholder:text-gray-700 rounded-sm mt-3 h-12"
            onChange={formik.handleChange('title')}
            value={formik.values.title}
          />

          <button
            type="submit"
            className="button px-2 bg-green-500 py-2 mt-7 rounded-md w-full"
          >
            {brandName ? 'Edit Brand' : 'Add Brand'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addbrand;
