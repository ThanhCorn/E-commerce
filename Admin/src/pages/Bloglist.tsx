import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { AppDispatch, RootState } from "../app/store";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { FiEdit } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";
import { getAllBlog } from "../features/blogs/blogSlice";

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
  const dispatch: AppDispatch = useDispatch();
  const blogs = useSelector((state: RootState) => state.blogs.blogs);

  useEffect(() => {
    dispatch(getAllBlog());
  }, [dispatch]);

  const data1: DataType[] = [];
  for (let i = 0; i < blogs.length; i++) {
    data1.push({
      key: i,
      title: blogs[i].title || "",
      category: blogs[i].category || "",
      action: (
        <div className="flex gap-3">
          <Link to="" className="text-blue-600">
            <FiEdit size={25} />
          </Link>
          <Link to="" className="text-red-600">
            <AiOutlineDelete size={25} />
          </Link>
        </div>
      ),
    });
  }

  return (
    <div>
      <h3 className="text-2xl font-semibold mb-5">Bloglist</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
    </div>
  );
};

export default Bloglist;
