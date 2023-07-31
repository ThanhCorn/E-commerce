import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { AppDispatch, RootState } from "../app/store";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { FiEdit } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";
import { getAllProductCategory } from "../features/pCategory/pcategorySlice";

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
  const dispatch: AppDispatch = useDispatch();
  const categories = useSelector(
    (state: RootState) => state.pCategories.pCategories
  );

  useEffect(() => {
    dispatch(getAllProductCategory());
  }, [dispatch]);

  const data1: DataType[] = [];
  for (let i = 0; i < categories.length; i++) {
    data1.push({
      key: i,
      title: categories[i].title || "",
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
      <h3 className="text-2xl font-semibold mb-5">Categories</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
    </div>
  );
};

export default Categorylist;
