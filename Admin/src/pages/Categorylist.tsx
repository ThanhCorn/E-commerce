import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { AppDispatch, RootState } from "../app/store";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { FiEdit } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";
import {
  deleteProductCategory,
  getAllProductCategory,
  resetState,
} from "../features/pCategory/pcategorySlice";
import { useState } from "react";
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

const Categorylist = () => {
  const [open, setOpen] = useState(false);
  const [categoryId, setCategoryId] = useState("");

  const dispatch: AppDispatch = useDispatch();
  const categories = useSelector(
    (state: RootState) => state.pCategories.pCategories
  );

  const hideModal = () => {
    setOpen(false);
  };

  const showModal = (id: string) => {
    setOpen(true);
    setCategoryId(id);
  };

  useEffect(() => {
    dispatch(resetState());
    dispatch(getAllProductCategory());
  }, [dispatch]);

  const data1: DataType[] = [];
  for (let i = 0; i < categories.length; i++) {
    data1.push({
      key: i,
      title: categories[i].title || "",
      action: (
        <div className="flex gap-3">
          <Link
            to={`/admin/category/${categories[i]._id}`}
            className="text-blue-600"
          >
            <FiEdit size={25} />
          </Link>
          <button
            onClick={() => showModal(categories[i]._id ?? "")}
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
    await dispatch(deleteProductCategory(id));
    dispatch(getAllProductCategory());
  };

  return (
    <div>
      <h3 className="text-2xl font-semibold mb-5">Categories</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
      <CustomModal
        hideModal={hideModal}
        open={open}
        title="Are you sure to want to delete"
        performAction={() => handleDelete(categoryId)}
      />
    </div>
  );
};

export default Categorylist;
