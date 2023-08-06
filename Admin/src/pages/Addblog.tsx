import { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import CustomInput from "../components/CustomInput";
import Dropzone from "react-dropzone";
import { useFormik } from "formik";
import * as Yup from "yup";
import { uploadImages } from "../features/upload/uploadSlice";
import { AppDispatch, RootState } from "../app/store";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  createBlog,
  getBlog,
  resetState,
  updatedBlog,
} from "../features/blogs/blogSlice";
import { toast } from "react-toastify";
import { IImages } from "../@types/custom-types";
import { getAllBlogCategory } from "../features/bCategory/bcategorySlice";

const schema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  category: Yup.string().required("Category is required"),
});

const Addblog = () => {
  const [uploadedImages, setUploadedImages] = useState<File[]>([]);
  const { id } = useParams<{ id: string }>();
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const bcategories = useSelector(
    (state: RootState) => state.bCategories.bCategories
  );
  const { isSuccess, isError, blog, blogById } = useSelector(
    (state: RootState) => state.blogs
  );
  const imageState = useSelector((state: RootState) => state.upload.images);

  useEffect(() => {
    if (id) {
      dispatch(getBlog(id));
    } else {
      dispatch(resetState());
    }
  }, [id]);

  useEffect(() => {
    if (blogById) {
      formik.setFieldValue("title", blogById.title);
      formik.setFieldValue("description", blogById.description);
      formik.setFieldValue("category", blogById.category);

      const convertImagesToFilesAndSetState = async () => {
        const files = await convertImagesToFiles(blogById.images);
        setUploadedImages(files);
      };
      console.log(uploadImages);

      convertImagesToFilesAndSetState();
    }
  }, [blogById]);

  useEffect(() => {
    if (isSuccess && blog) {
      toast.success("Blog Created Successfully");
      dispatch(resetState());
      setTimeout(() => {
        navigate("/admin/blog-list");
      }, 300);
    }
    if (isError) {
      toast.error("Something went wrong");
    }
  }, [isSuccess, isError, blog]);

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      category: "",
      images: [],
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (id) {
        alert(JSON.stringify(values));
        dispatch(updatedBlog({ _id: id, ...values }));
        dispatch(resetState());
        toast.success("Updated Successfully");
        setTimeout(() => {
          navigate("/admin/blog-list");
        }, 1000);
      } else {
        dispatch(createBlog(values));
        dispatch(resetState());
      }
      formik.resetForm();
    },
  });

  const convertToBlob = async (imageUrl: string) => {
    const response = await fetch(imageUrl);
    const blob = await response.blob();
    return blob;
  };
  const img: IImages[] = [];
  imageState.forEach((i) => {
    img.push({ public_id: i.public_id, url: i.url });
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const convertImagesToFiles = async (images: any) => {
    const files = [];
    for (const image of images) {
      const blob = await convertToBlob(image.url);
      const file = new File([blob], image.public_id, { type: "image/jpeg" });
      files.push(file);
    }
    return files;
  };

  const onDrop = (acceptedFiles: File[]) => {
    // Concatenate the existing images with the newly dropped images
    const updatedImages = [...uploadedImages, ...acceptedFiles];
    dispatch(uploadImages(updatedImages)).then(() => {
      setUploadedImages(updatedImages);
    });
  };

  useEffect(() => {
    formik.setFieldValue("images", img);
  }, [uploadedImages]);

  useEffect(() => {
    dispatch(getAllBlogCategory());
  }, [dispatch]);

  const handleImageDelete = (index: number) => {
    const updatedImages = [...uploadedImages];
    updatedImages.splice(index, 1);
    setUploadedImages(updatedImages);
  };
  return (
    <div>
      <h3 className="text-2xl font-semibold mb-5">
        {blogById ? "Edit Blog" : "Add Blog"}
      </h3>
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
            <div className="flex gap-5">
              {uploadedImages.map((file, index) => (
                <div key={index} className="w-[10%]">
                  <p>Filename: {file.name}</p>
                  <div className="relative">
                    <img
                      src={URL.createObjectURL(file)}
                      alt={`Uploaded ${index + 1}`}
                    />
                    <button
                      onClick={() => handleImageDelete(index)}
                      className="absolute top-0 right-0  rounded-full px-2 py-1 hover:transform:scale-100 hover:bg-red-500 hover:text-white text-lg"
                    >
                      X
                    </button>
                  </div>
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
            onChange={formik.handleChange("title")}
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
            onChange={formik.handleChange("category")}
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
            onChange={formik.handleChange("description")}
            value={formik.values.description}
          />
          <button
            type="submit"
            className="button px-2 w-full bg-green-500 py-2 mt-7 rounded-md"
          >
            {blogById ? "Edit Blog" : "Add Blog"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addblog;
