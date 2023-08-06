import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { AppDispatch, RootState } from "../app/store";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiEdit } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";
import {
  deleteBlogCategory,
  getAllBlogCategory,
  resetState,
} from "../features/bCategory/bcategorySlice";
import CustomModal from "../components/CustomModal";

interface DataType {
  key: React.Key;
  title: string;
  action?: JSX.Element;
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
    title: "Action",
    dataIndex: "action",
  },
];

const Blogcategorylist = () => {
  const [open, setOpen] = useState(false);
  const [bcategoryId, setBcategoryId] = useState("");
  const dispatch: AppDispatch = useDispatch();
  const bcategories = useSelector(
    (state: RootState) => state.bCategories.bCategories
  );

  useEffect(() => {
    dispatch(resetState());
    dispatch(getAllBlogCategory());
  }, [dispatch]);

  const data1: DataType[] = [];
  for (let i = 0; i < bcategories.length; i++) {
    data1.push({
      key: i,
      title: bcategories[i].title || "",
      action: (
        <div className="flex gap-3">
          <Link
            to={`/admin/blog-category/${bcategories[i]._id}`}
            className="text-blue-600"
          >
            <FiEdit size={25} />
          </Link>
          <button
            onClick={() => showModal(bcategories[i]._id ?? "")}
            className="text-red-600"
          >
            <AiOutlineDelete size={25} />
          </button>
        </div>
      ),
    });
  }

  const hideModal = () => {
    setOpen(false);
  };

  const showModal = (id: string) => {
    setOpen(true);
    setBcategoryId(id);
  };

  const handleDelete = async (id: string) => {
    setOpen(false);
    await dispatch(deleteBlogCategory(id));
    dispatch(getAllBlogCategory());
  };
  return (
    <div>
      <h3 className="text-2xl font-semibold mb-5">Blog Categories</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
      <CustomModal
        hideModal={hideModal}
        open={open}
        title="Are you sure to want to delete"
        performAction={() => handleDelete(bcategoryId)}
      />
    </div>
  );
};

export default Blogcategorylist;
