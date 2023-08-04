import { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import CustomInput from '../components/CustomInput';
import Dropzone from 'react-dropzone';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { uploadImages } from '../features/upload/uploadSlice';
import { AppDispatch, RootState } from '../app/store';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createBlog, resetState } from '../features/blogs/blogSlice';
import { toast } from 'react-toastify';
import { IImages } from '../@types/custom-types';
import { getAllBlogCategory } from '../features/bCategory/bcategorySlice';

const schema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  description: Yup.string().required('Description is required'),
  category: Yup.string().required('Category is required'),
});

const Addblog = () => {
  const [uploadedImages, setUploadedImages] = useState<File[]>([]);
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const bcategories = useSelector(
    (state: RootState) => state.bCategories.bCategories,
  );
  const { isSuccess, isError, blog } = useSelector(
    (state: RootState) => state.blogs,
  );
  const imageState = useSelector((state: RootState) => state.upload.images);

  useEffect(() => {
    if (isSuccess && blog) {
      toast.success('Blog Created Successfully');
      dispatch(resetState());
      setTimeout(() => {
        navigate('/admin/blog-list');
      }, 3000);
    }
    if (isError) {
      toast.error('Something went wrong');
    }
  }, [isSuccess, isError, blog]);

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      category: '',
      images: [],
    },
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(createBlog(values));
      formik.resetForm();
      alert(JSON.stringify(values, null, 2));
    },
  });

  const img: IImages[] = [];
  imageState.forEach((i) => {
    img.push({ public_id: i.public_id, url: i.url });
  });

  const onDrop = (acceptedFiles: File[]) => {
    dispatch(uploadImages(acceptedFiles)).then(() => {
      setUploadedImages(acceptedFiles);
    });
  };

  useEffect(() => {
    formik.setFieldValue('images', img);
  }, [uploadedImages]);

  useEffect(() => {
    dispatch(getAllBlogCategory());
  }, [dispatch]);

  return (
    <div>
      <h3 className="text-2xl font-semibold mb-5">Add blog</h3>
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
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
          <div>
            {formik.errors.title && formik.touched.title && (
              <p className="text-red-500 text-sm">{formik.errors.title}</p>
            )}
          </div>
          <CustomInput
            type="text"
            placeholder="Enter Blog Title"
            className="border border-gray-300 bg-white placeholder:text-gray-700 rounded-sm mt-3"
            onChange={formik.handleChange('title')}
            value={formik.values.title}
          />
          <div>
            {formik.errors.category && formik.touched.category && (
              <p className="text-red-500 text-sm">{formik.errors.category}</p>
            )}
          </div>
          <select
            name=""
            id=""
            className="input border border-gray-300 bg-white mb-5 rounded-sm"
            onChange={formik.handleChange('category')}
            value={formik.values.category}
          >
            <option value="">Select Blog Category</option>
            {bcategories.map((category, index) => {
              return (
                <option key={index} value={category.title}>
                  {category.title}
                </option>
              );
            })}
          </select>
          <div>
            {formik.errors.description && formik.touched.description && (
              <p className="text-red-500 text-sm">
                {formik.errors.description}
              </p>
            )}
          </div>
          <ReactQuill
            theme="snow"
            onChange={formik.handleChange('description')}
            value={formik.values.description}
          />
          <button
            type="submit"
            className="button px-2 w-full bg-green-500 py-2 mt-7 rounded-md"
          >
            Add Blog
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addblog;
