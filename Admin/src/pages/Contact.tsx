import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { AppDispatch, RootState } from "../app/store";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { AiOutlineDelete } from "react-icons/ai";
import { getAllContact } from "../features/contact/contactSlice";

interface DataType {
  key: React.Key;
  name: string;
  email: string;
  phone: string;
  comment: string;
  status: JSX.Element;
  action: JSX.Element;
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
    title: "Email",
    dataIndex: "email",
  },
  {
    title: "Phone",
    dataIndex: "phone",
  },
  {
    title: "Comment",
    dataIndex: "comment",
  },
  {
    title: "Status",
    dataIndex: "status",
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const Contact = () => {
  const dispatch: AppDispatch = useDispatch();
  const contacts = useSelector((state: RootState) => state.contacts.contacts);

  useEffect(() => {
    dispatch(getAllContact());
  }, [dispatch]);

  const data1: DataType[] = [];
  for (let i = 0; i < contacts.length; i++) {
    data1.push({
      key: i,
      name: contacts[i].name || "",
      email: contacts[i].email || "",
      phone: contacts[i].phone || "",
      comment: contacts[i].comment || "",
      status: (
        <>
          <select name="" id="">
            <option value="">Set status</option>
          </select>
        </>
      ),
      action: (
        <div className="flex gap-3">
          <Link to="" className="text-red-600">
            <AiOutlineDelete size={25} />
          </Link>
        </div>
      ),
    });
  }
  return (
    <div>
      <h3 className="text-2xl font-semibold mb-5">Contact</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
    </div>
  );
};

export default Contact;
