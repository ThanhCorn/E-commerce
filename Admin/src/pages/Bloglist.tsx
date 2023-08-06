import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { AppDispatch, RootState } from "../app/store";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiEdit } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";
import { deleteBlog, getAllBlog } from "../features/blogs/blogSlice";
import CustomModal from "../components/CustomModal";

interface DataType {
  key: React.Key;
  title: string;
  category: string;
  action: JSX.Element;
}

const columns: ColumnsType<DataType> = [
  {
    title: "No.",
    dataIndex: "key",
  },
  {
    title: "Title",
    dataIndex: "title",
  },
  {
    title: "Category",
    dataIndex: "category",
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const Bloglist = () => {
  const [open, setOpen] = useState(false);
  const [blogId, setBlogId] = useState("");
  const dispatch: AppDispatch = useDispatch();
  const blogs = useSelector((state: RootState) => state.blogs.blogs);

  useEffect(() => {
    dispatch(getAllBlog());
  }, [dispatch]);

  const showModal = (id: string) => {
    setOpen(true);
    setBlogId(id);
  };

  const hideModal = () => {
    setOpen(false);
  };

  const data1: DataType[] = [];
  for (let i = 0; i < blogs.length; i++) {
    data1.push({
      key: i,
      title: blogs[i].title || "",
      category: blogs[i].category || "",
      action: (
        <div className="flex gap-3">
          <Link to={`/admin/blog/${blogs[i]._id}`} className="text-blue-600">
            <FiEdit size={25} />
          </Link>
          <button
            onClick={() => showModal(blogs[i]._id ?? "")}
            className="text-red-600"
          >
            <AiOutlineDelete size={25} />
          </button>
        </div>
      ),
    });
  }

  const handleDelete = async (id: string) => {
    setOpen(false);
    await dispatch(deleteBlog(id));
    dispatch(getAllBlog());
  };

  return (
    <div>
      <h3 className="text-2xl font-semibold mb-5">Bloglist</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
      <CustomModal
        hideModal={hideModal}
        open={open}
        title="Are you sure to want to delete"
        performAction={() => handleDelete(blogId)}
      />
    </div>
  );
};

export default Bloglist;
