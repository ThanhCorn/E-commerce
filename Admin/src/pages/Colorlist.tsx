import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { AppDispatch, RootState } from "../app/store";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiEdit } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";
import { deleteColor, getAllColor } from "../features/color/colorSlice";
import CustomModal from "../components/CustomModal";

interface DataType {
  key: React.Key;
  name: string;
  action?: JSX.Element;
}

const columns: ColumnsType<DataType> = [
  {
    title: "No.",
    dataIndex: "key",
  },
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const Colorlist = () => {
  const [open, setOpen] = useState(false);
  const [colorId, setColorId] = useState("");
  const dispatch: AppDispatch = useDispatch();
  const colors = useSelector((state: RootState) => state.color.colors);

  useEffect(() => {
    dispatch(getAllColor());
  }, [dispatch]);

  const showModal = (id: string) => {
    setOpen(true);
    setColorId(id);
  };

  const hideModal = () => {
    setOpen(false);
  };

  const data1: DataType[] = [];
  for (let i = 0; i < colors.length; i++) {
    data1.push({
      key: i,
      name: colors[i].title || "",
      action: (
        <div className="flex gap-3">
          <Link to={`/admin/color/${colors[i]._id}`} className="text-blue-600">
            <FiEdit size={25} />
          </Link>
          <button
            onClick={() => showModal(colors[i]._id ?? "")}
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
    await dispatch(deleteColor(id));
    dispatch(getAllColor());
  };
  return (
    <div>
      <h3 className="text-2xl font-semibold mb-5">Colors</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
      <CustomModal
        hideModal={hideModal}
        open={open}
        title="Are you sure to want to delete"
        performAction={() => handleDelete(colorId)}
      />
    </div>
  );
};

export default Colorlist;
