import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { AppDispatch, RootState } from "../app/store";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
import {
  deleteContact,
  getAllContact,
  resetState,
  updateContact,
} from "../features/contact/contactSlice";
import CustomModal from "../components/CustomModal";
import { IContact } from "../@types/custom-types";

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
  const [open, setOpen] = useState(false);
  const [contactId, setContactId] = useState("");
  const dispatch: AppDispatch = useDispatch();

  const contacts = useSelector((state: RootState) => state.contacts.contacts);

  const showModal = (id: string) => {
    setOpen(true);
    setContactId(id);
  };

  const hideModal = () => {
    setOpen(false);
  };

  useEffect(() => {
    dispatch(resetState());
    setTimeout(() => {
      dispatch(getAllContact());
    }, 500);
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
          <select
            name=""
            id=""
            defaultValue={contacts[i].status ? contacts[i].status : "Submitted"}
            onChange={(e) => setContactStatus(e, contacts[i])}
            className="border border-gray-300 px-2 py-2 rounded-md"
          >
            <option value="default" selected>
              Selected Status
            </option>

            <option value="Submitted">Submitted</option>
            <option value="Contacted">Contacted</option>
            <option value="In Progress">In Progress</option>
            <option value="Resolved">Resolved</option>
          </select>
        </>
      ),
      action: (
        <div className="flex gap-3">
          <Link
            to={`/admin/contact/${contacts[i]._id}`}
            className="text-red-600"
          >
            <AiOutlineEye size={25} />
          </Link>
          <button
            onClick={() => showModal(contacts[i]._id ?? "")}
            className="text-red-600"
          >
            <AiOutlineDelete size={25} />
          </button>
        </div>
      ),
    });
  }

  const setContactStatus = (
    e: React.ChangeEvent<HTMLSelectElement>,
    contact: IContact
  ) => {
    const selectedValue = e.target.value;
    if (contact._id) {
      const data = { ...contact, status: selectedValue };
      dispatch(updateContact({ id: contact._id, data: data }));
    }
  };

  const handleDelete = async (id: string) => {
    setOpen(false);
    await dispatch(deleteContact(id));
    dispatch(getAllContact());
  };

  return (
    <div>
      <h3 className="text-2xl font-semibold mb-5">Contact</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
      <CustomModal
        hideModal={hideModal}
        open={open}
        title="Are you sure to want to delete"
        performAction={() => handleDelete(contactId)}
      />
    </div>
  );
};

export default Contact;
