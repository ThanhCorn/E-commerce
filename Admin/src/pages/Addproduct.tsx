import CustomInput from "../components/CustomInput";
import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { AppDispatch, RootState } from "../app/store";
import { useDispatch, useSelector } from "react-redux";
import { getAllBrand } from "../features/brand/brandSlice";
import { getAllColor } from "../features/color/colorSlice";
import "react-widgets/styles.css";
import { IColor, IImages } from "../@types/custom-types";
import Dropzone from "react-dropzone";
import { uploadImages } from "../features/upload/uploadSlice";
import { Select } from "antd";
import {
  createProducts,
  getProduct,
  resetState,
  updateProduct,
} from "../features/products/productSlice";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getAllProductCategory } from "../features/pCategory/pcategorySlice";

const schema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  price: Yup.number().required("Price is required"),
  brand: Yup.string().required("Brand is required"),
  category: Yup.string().required("Category is required"),
  quantity: Yup.number().required("Quantity is required"),
  tags: Yup.string().required("Tags is required"),
});

const Addproduct = () => {
  const dispatch: AppDispatch = useDispatch();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [uploadedImages, setUploadedImages] = useState<File[]>([]);
  const brands = useSelector((state: RootState) => state.brand.brands);
  const categories = useSelector(
    (state: RootState) => state.pCategories.pCategories
  );
  const colorState = useSelector((state: RootState) => state.color.colors);
  const imageState = useSelector((state: RootState) => state.upload.images);
  const { createdProduct, isSuccess, isError, productById } = useSelector(
    (state: RootState) => state.product
  );

  useEffect(() => {
    if (id) {
      dispatch(resetState());
      dispatch(getProduct(id));
    } else {
      formik.resetForm();
      dispatch(resetState());
    }
  }, [id]);

  useEffect(() => {
    dispatch(getAllProductCategory());
    dispatch(getAllBrand());
    dispatch(getAllColor());
  }, []);

  useEffect(() => {
    if (productById) {
      formik.setFieldValue("title", productById.title);
      formik.setFieldValue("description", productById.description);
      formik.setFieldValue("price", productById.price);
      formik.setFieldValue("category", productById.category);
      formik.setFieldValue("brand", productById.brand);
      formik.setFieldValue("tags", productById.tags);
      formik.setFieldValue("quantity", productById.quantity);
      const convertImagesToFilesAndSetState = async () => {
        const files = await convertImagesToFiles(productById.images);
        setUploadedImages(files);
      };

      convertImagesToFilesAndSetState();
    }
  }, [productById]);

  useEffect(() => {
    if (isSuccess && createdProduct) {
      toast.success("Product Created Successfully");
      dispatch(resetState());
      setTimeout(() => {
        navigate("/admin/list-product");
      }, 3000);
    }
    if (isError) {
      toast.error("Something went wrong");
    }
  }, [isSuccess, isError]);

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      price: 0,
      brand: "",
      category: "",
      tags: "",
      quantity: 0,
      color: [],
      images: [],
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (id) {
        alert(JSON.stringify(values, null, 2));
        dispatch(updateProduct({ _id: id, ...values }));
        dispatch(resetState());
        toast.success("Product Updated Successfully");
        setTimeout(() => {
          navigate("/admin/list-product");
        }, 1000);
      } else {
        alert(JSON.stringify(values, null, 2));
        dispatch(createProducts(values));
        setSelectedColors([]);
      }
      formik.resetForm();
    },
  });

  const multiColor: IColor[] = [];

  colorState.forEach((color) => {
    multiColor.push({ _id: color._id, title: color.title });
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

  useEffect(() => {
    formik.setFieldValue("color", selectedColors);
  }, [selectedColors]);

  useEffect(() => {
    formik.setFieldValue("images", img);
  }, [uploadedImages]);

  const onDrop = (acceptedFiles: File[]) => {
    // Concatenate the existing images with the newly dropped images
    const updatedImages = [...uploadedImages, ...acceptedFiles];
    dispatch(uploadImages(updatedImages)).then(() => {
      setUploadedImages(updatedImages);
    });
  };

  const handleSelectedColor = (selectedValues: string[]) => {
    setSelectedColors(selectedValues);
  };

  const handleImageDelete = (index: number) => {
    const updatedImages = [...uploadedImages];
    updatedImages.splice(index, 1);
    setUploadedImages(updatedImages);
  };

  console.log(productById);

  return (
    <div>
      <h3 className="text-2xl font-semibold mb-5">
        {productById ? "Edit Product" : "Add Product"}
      </h3>
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
            onChange={formik.handleChange("title")}
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
            onChange={formik.handleChange("description")}
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
            onChange={formik.handleChange("price")}
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
            onChange={formik.handleChange("brand")}
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
            onChange={formik.handleChange("category")}
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
            onChange={formik.handleChange("tags")}
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
            value={
              productById
                ? productById?.color?.map((item) => item.title)
                : selectedColors
            }
            onChange={handleSelectedColor}
            options={multiColor.map((color) => ({
              label: color.title,
              value: color._id,
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
            onChange={formik.handleChange("quantity")}
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
          <button
            type="submit"
            className="button px-2 bg-green-500 text-white py-2 mt-7 rounded-md"
          >
            {productById ? "Edit Product" : "Add Product"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addproduct;
