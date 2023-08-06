import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { AppDispatch, RootState } from "../app/store";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteBrand,
  getAllBrand,
  resetState,
} from "../features/brand/brandSlice";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiEdit } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";
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

const Brandlist = () => {
  const [open, setOpen] = useState(false);
  const [brandId, setBrandId] = useState("");
  const dispatch: AppDispatch = useDispatch();
  const brands = useSelector((state: RootState) => state.brand.brands);

  const hideModal = () => {
    setOpen(false);
  };

  const showModal = (id: string) => {
    setOpen(true);
    setBrandId(id);
  };

  useEffect(() => {
    dispatch(resetState());
    dispatch(getAllBrand());
  }, [dispatch]);

  const data1: DataType[] = [];
  for (let i = 0; i < brands.length; i++) {
    data1.push({
      key: i,
      title: brands[i].title || "",
      action: (
        <div className="flex gap-3">
          <Link to={`/admin/brand/${brands[i]._id}`} className="text-blue-600">
            <FiEdit size={25} />
          </Link>
          <button
            onClick={() => showModal(brands[i]._id ?? "")}
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
    await dispatch(deleteBrand(id));
    dispatch(getAllBrand());
  };
  return (
    <div>
      <h3 className="text-2xl font-semibold mb-5">Brands</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
      <CustomModal
        hideModal={hideModal}
        open={open}
        title="Are you sure to want to delete"
        performAction={() => handleDelete(brandId)}
      />
    </div>
  );
};

export default Brandlist;
