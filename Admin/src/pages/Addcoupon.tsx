import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../app/store';
import CustomInput from '../components/CustomInput';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { createCoupon, resetState } from '../features/coupon/couponSlice';

const schema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  expiry: Yup.date().required('Expiry is required'),
  discount: Yup.number().required('Discount is required'),
});

const Addcoupon = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const { isSuccess, isError, coupon } = useSelector(
    (state: RootState) => state.coupon,
  );
  useEffect(() => {
    if (isSuccess && coupon) {
      toast.success('Coupon Created Successfully');
      setTimeout(() => {
        dispatch(resetState());
        navigate('/admin/list-coupon');
      }, 3000);
    }
    if (isError) {
      toast.error('Something went wrong');
    }
  }, [isSuccess, isError, coupon]);

  const formik = useFormik({
    initialValues: {
      name: '',
      expiry: '',
      discount: 0,
    },
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(
        createCoupon({
          ...values,
          expiry: new Date(values.expiry),
        }),
      );
      formik.resetForm();
    },
  });

  return (
    <div>
      <h3 className="text-2xl font-semibold mb-5">Add Coupon</h3>
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          <div>
            {formik.errors.name && formik.touched.name && (
              <p className="text-red-500 text-sm">{formik.errors.name}</p>
            )}
          </div>
          <CustomInput
            type="text"
            placeholder="Enter Name Coupon"
            className="border border-gray-300 bg-white placeholder:text-gray-700 rounded-sm mt-3 h-12"
            onChange={formik.handleChange('name')}
            value={formik.values.name}
          />
          <div>
            {formik.errors.expiry && formik.touched.expiry && (
              <p className="text-red-500 text-sm">{formik.errors.expiry}</p>
            )}
          </div>
          <CustomInput
            type="date"
            placeholder="Enter Expiry Date"
            className="border border-gray-300 bg-white placeholder:text-gray-700 rounded-sm mt-3 h-12"
            onChange={formik.handleChange('expiry')}
            value={formik.values.expiry}
          />
          <div>
            {formik.errors.discount && formik.touched.discount && (
              <p className="text-red-500 text-sm">{formik.errors.discount}</p>
            )}
          </div>
          <CustomInput
            type="number"
            placeholder="Enter Discount"
            className="border border-gray-300 bg-white placeholder:text-gray-700 rounded-sm mt-3 h-12"
            onChange={formik.handleChange('discount')}
            value={formik.values.discount.toString()}
          />

          <button
            type="submit"
            className="button px-2 bg-green-500 py-2 mt-7 rounded-md"
          >
            Add Coupon
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addcoupon;
