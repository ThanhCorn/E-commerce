import CustomInput from '../components/CustomInput';
import { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { AppDispatch, RootState } from '../app/store';
import { useDispatch, useSelector } from 'react-redux';
import { getAllBrand } from '../features/brand/brandSlice';
import { getAllProductCategory } from '../features/pCategory/pcategorySlice';
import { getAllColor } from '../features/color/colorSlice';
import 'react-widgets/styles.css';
import { IColor, IImages } from '../@types/custom-types';
import Dropzone from 'react-dropzone';
import { uploadImages } from '../features/upload/uploadSlice';
import { Select } from 'antd';
import { createProducts } from '../features/product/productSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const schema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  description: Yup.string().required('Description is required'),
  price: Yup.number().required('Price is required'),
  brand: Yup.string().required('Brand is required'),
  category: Yup.string().required('Category is required'),
  quantity: Yup.number().required('Quantity is required'),
  tags: Yup.string().required('Tags is required'),
});

const Addproduct = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [uploadedImages, setUploadedImages] = useState<File[]>([]);
  const brands = useSelector((state: RootState) => state.brand.brands);
  const categories = useSelector(
    (state: RootState) => state.pCategories.pCategories,
  );
  const colorState = useSelector((state: RootState) => state.color.colors);
  const imageState = useSelector((state: RootState) => state.upload.images);
  const { createdProduct, isSuccess, isError } = useSelector(
    (state: RootState) => state.product,
  );

  useEffect(() => {
    if (isSuccess && createdProduct) {
      toast.success('Product Created Successfully');
    }
    if (isError) {
      toast.error('Something went wrong');
    }
  }, [isSuccess, isError]);

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      price: 0,
      brand: '',
      category: '',
      tags: '',
      quantity: 0,
      color: [],
      images: [],
    },
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(createProducts(values));
      setSelectedColors([]);
      setTimeout(() => {
        navigate('/admin/list-product');
      }, 3000);
    },
  });

  const multiColor: IColor[] = [];

  colorState.forEach((color) => {
    multiColor.push({ _id: color._id, title: color.title });
  });

  const img: IImages[] = [];
  imageState.forEach((i) => {
    img.push({ public_id: i.public_id, url: i.url });
  });

  useEffect(() => {
    dispatch(getAllBrand());
    dispatch(getAllProductCategory());
    dispatch(getAllColor());
  }, [dispatch]);

  useEffect(() => {
    formik.setFieldValue('color', selectedColors);
  }, [selectedColors]);

  useEffect(() => {
    formik.setFieldValue('images', img);
  }, [uploadedImages]);
  const onDrop = (acceptedFiles: File[]) => {
    dispatch(uploadImages(acceptedFiles)).then(() => {
      setUploadedImages(acceptedFiles);
    });
  };

  const handleSelectedColor = (selectedValues: string[]) => {
    setSelectedColors(selectedValues);
  };

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
            value={formik.values.price.toString()}
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
                <option key={index} value={brand.title}>
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
                <option key={index} value={category.title}>
                  {category.title}
                </option>
              );
            })}
          </select>
          <div>
            {formik.errors.tags && formik.touched.tags && (
              <p className="text-red-500 text-sm">{formik.errors.tags}</p>
            )}
          </div>
          <select
            name="tags"
            id=""
            className="input border border-gray-300 bg-white mb-5 rounded-sm"
            onChange={formik.handleChange('tags')}
            value={formik.values.tags}
          >
            <option value="" disabled>
              Select Tags
            </option>
            <option value="features">Features</option>
            <option value="popular">Popular</option>
            <option value="special">Special</option>
          </select>
          <Select
            mode="multiple"
            placeholder="Please select colors"
            value={selectedColors}
            onChange={handleSelectedColor}
            options={multiColor.map((color) => ({
              label: color.title,
              value: color.title,
            }))}
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
            value={formik.values.quantity.toString()}
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
            <div>
              {uploadedImages.map((file, index) => (
                <div key={index} className="w-[10%]">
                  <p>Filename: {file.name}</p>
                  <img
                    src={URL.createObjectURL(file)}
                    alt={`Uploaded ${index + 1}`}
                  />
                </div>
              ))}
            </div>
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
