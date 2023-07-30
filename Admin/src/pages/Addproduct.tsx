import CustomInput from "../components/CustomInput";
import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { InboxOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";
import { message, Upload } from "antd";

const { Dragger } = Upload;

const props: UploadProps = {
  name: "file",
  multiple: true,
  action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
  onChange(info) {
    const { status } = info.file;
    if (status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (status === "done") {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  onDrop(e) {
    console.log("Dropped files", e.dataTransfer.files);
  },
};

const Addproduct = () => {
  const [richTextEditor, setRichTextEditor] = useState("");

  const handleChange = (e: string) => {
    setRichTextEditor(e);
    console.log(richTextEditor);
  };

  return (
    <div>
      <h3 className="text-xl font-semibold mb-5">Add Product</h3>
      <div>
        <form action="">
          <CustomInput
            type="text"
            placeholder="Enter Product Title"
            className="border border-gray-300 bg-white placeholder:text-gray-700 rounded-sm mt-3 h-12 pr-2"
          />
          <ReactQuill
            theme="snow"
            value={richTextEditor}
            onChange={handleChange}
          />
          <CustomInput
            type="number"
            placeholder="Enter Product Price"
            className="border border-gray-300 bg-white placeholder:text-gray-700 rounded-sm mt-3 h-12 pr-2"
          />
          <select
            name=""
            id=""
            className="input border border-gray-300 bg-white mb-5 rounded-sm"
          >
            <option value="">Select Brand</option>
          </select>
          <select
            name=""
            id=""
            className="input border border-gray-300 bg-white mb-5 rounded-sm"
          >
            <option value="">Select Category</option>
          </select>
          <select
            name=""
            id=""
            className="input border border-gray-300 bg-white mb-5 rounded-sm"
          >
            <option value="">Select Color</option>
          </select>
          <CustomInput
            type="number"
            placeholder="Enter Quantity"
            className="border border-gray-300 bg-white placeholder:text-gray-700 rounded-sm mt-3 h-12 pr-2"
          />
          <Dragger {...props}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">
              Click or drag file to this area to upload
            </p>
            <p className="ant-upload-hint">
              Support for a single or bulk upload. Strictly prohibited from
              uploading company data or other banned files.
            </p>
          </Dragger>

          <button
            type="submit"
            className="button px-2 bg-green-500 py-2 mt-7 rounded-md"
          >
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addproduct;
