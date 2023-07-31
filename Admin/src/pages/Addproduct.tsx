import CustomInput from '../components/CustomInput';
import { useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { AppDispatch, RootState } from '../app/store';
import { useDispatch, useSelector } from 'react-redux';
import { getAllBrand } from '../features/brand/brandSlice';
import { getAllProductCategory } from '../features/pCategory/pcategorySlice';
import { getAllColor } from '../features/color/colorSlice';
import Multiselect from 'react-widgets/Multiselect';
import 'react-widgets/styles.css';
import { IColor } from '../@types/custom-types';
import Dropzone from 'react-dropzone';
import { uploadImages } from '../features/upload/uploadSlice';
import { ChangeEvent } from 'react';

const schema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  description: Yup.string().required('Description is required'),
  price: Yup.number().required('Price is required'),
  brand: Yup.string().required('Brand is required'),
  category: Yup.string().required('Category is required'),
  quantity: Yup.number().required('Quantity is required'),
});

const Addproduct = () => {
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllBrand());
    dispatch(getAllProductCategory());
    dispatch(getAllColor());
  }, [dispatch]);

  const onDrop = (acceptedFiles: File[]) => {
    dispatch(uploadImages(acceptedFiles));
  };

  const brands = useSelector((state: RootState) => state.brand.brands);
  const categories = useSelector(
    (state: RootState) => state.pCategories.pCategories,
  );
  const colors = useSelector((state: RootState) => state.color.colors);
  const images = useSelector((state: RootState) => state.upload.images);
  console.log(images);
  const multiColor: IColor[] = [];
  colors.forEach((color) => {
    multiColor.push({ _id: color._id, title: color.title });
  });

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      price: '',
      brand: '',
      category: '',
      quantity: '',
      color: [],
    },
    validationSchema: schema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <div>
      <h3 className="text-2xl font-semibold mb-5">Add Product</h3>
      <div>
        <form
          action=""
          onSubmit={formik.handleSubmit}
          className="flex flex-col gap-3 "
        >
          <div>
            {formik.errors.title && formik.touched.title && (
              <p className="text-red-500 text-sm">{formik.errors.title}</p>
            )}
          </div>
          <CustomInput
            type="text"
            placeholder="Enter Product Title"
            className="border border-gray-300 bg-white placeholder:text-gray-700 rounded-sm h-12 pr-2"
            name="title"
            onChange={formik.handleChange('title')}
            value={formik.values.title}
          />
          <div>
            {formik.errors.description && formik.touched.description && (
              <p className="text-red-500 text-sm">
                {formik.errors.description}
              </p>
            )}
          </div>
          <ReactQuill
            theme="snow"
            value={formik.values.description}
            onChange={formik.handleChange('description')}
          />
          <div>
            {formik.errors.price && formik.touched.price && (
              <p className="text-red-500 text-sm">{formik.errors.price}</p>
            )}
          </div>
          <CustomInput
            type="number"
            placeholder="Enter Product Price"
            className="border border-gray-300 bg-white placeholder:text-gray-700 rounded-sm h-12 pr-2"
            name="price"
            onChange={formik.handleChange('price')}
            value={formik.values.price}
          />
          <div>
            {formik.errors.brand && formik.touched.brand && (
              <p className="text-red-500 text-sm">{formik.errors.brand}</p>
            )}
          </div>
          <select
            name="brand"
            className="input border border-gray-300 bg-white mb-5 rounded-sm"
            onChange={formik.handleChange('brand')}
            value={formik.values.brand}
          >
            <option value="">Select Brand</option>
            {brands.map((brand, index) => {
              return (
                <option key={index} value={brand._id}>
                  {brand.title}
                </option>
              );
            })}
          </select>
          <div>
            {formik.errors.category && formik.touched.category && (
              <p className="text-red-500 text-sm">{formik.errors.category}</p>
            )}
          </div>
          <select
            name="category"
            id=""
            className="input border border-gray-300 bg-white mb-5 rounded-sm"
            onChange={formik.handleChange('category')}
            value={formik.values.category}
          >
            <option value="">Select Category</option>
            {categories.map((category, index) => {
              return (
                <option key={index} value={category._id}>
                  {category.title}
                </option>
              );
            })}
          </select>
          <Multiselect
            dataKey="id"
            textField="title"
            data={multiColor}
            onChange={(selectedValue) => {
              formik.setFieldValue('color', selectedValue);
            }}
            value={formik.values.color}
          />
          <div>
            {formik.errors.quantity && formik.touched.quantity && (
              <p className="text-red-500 text-sm">{formik.errors.quantity}</p>
            )}
          </div>
          <CustomInput
            type="number"
            placeholder="Enter Quantity"
            className="border border-gray-300 bg-white mt-3 placeholder:text-gray-700 rounded-sm h-12 pr-2"
            name="quantity"
            onChange={formik.handleChange('quantity')}
            value={formik.values.quantity}
          />
          <div>
            <Dropzone onDrop={onDrop}>
              {({ getRootProps, getInputProps }) => (
                <section>
                  <div
                    {...getRootProps()}
                    className={`flex items-center justify-center border border-gray-300 bg-white mt-3 placeholder:text-gray-700 rounded-sm h-20 pr-2`}
                  >
                    <input {...getInputProps()} multiple />
                    <p>
                      Drag 'n' drop some files here, or click to select files
                    </p>
                  </div>
                </section>
              )}
            </Dropzone>
          </div>
          <button
            type="submit"
            className="button px-2 bg-green-500 text-white py-2 mt-7 rounded-md"
          >
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addproduct;
