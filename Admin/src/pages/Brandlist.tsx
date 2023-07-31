import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { AppDispatch, RootState } from "../app/store";
import { useDispatch, useSelector } from "react-redux";
import { getAllBrand } from "../features/brand/brandSlice";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { FiEdit } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";

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

const Brandlist = () => {
  const dispatch: AppDispatch = useDispatch();
  const brands = useSelector((state: RootState) => state.brand.brands);

  useEffect(() => {
    dispatch(getAllBrand());
  }, [dispatch]);

  const data1: DataType[] = [];
  for (let i = 0; i < brands.length; i++) {
    data1.push({
      key: i,
      title: brands[i].title || "",
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
      <h3 className="text-2xl font-semibold mb-5">Brands</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
    </div>
  );
};

export default Brandlist;
