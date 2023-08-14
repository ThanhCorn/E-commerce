import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { AppDispatch, RootState } from "../app/store";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUsers } from "../features/customers/customerSlice";

interface DataType {
  key: React.Key;
  name: string;
  email: string | undefined;
  phone: string | undefined;
}

const columns: ColumnsType<DataType> = [
  {
    title: "No.",
    dataIndex: "key",
  },
  {
    title: "Name",
    dataIndex: "name",
    sorter: (a, b) => a.name.length - b.name.length,
  },
  {
    title: "Email",
    dataIndex: "email",
  },
  {
    title: "Phone",
    dataIndex: "phone",
  },
];

const Customers = () => {
  const dispatch: AppDispatch = useDispatch();
  const customers = useSelector((state: RootState) => state.customer.customers);

  console.log(customers);
  const data1: DataType[] = [];
  for (let i = 0; i < customers.length; i++) {
    if (customers[i].role === "user") {
      data1.push({
        key: i,
        name: customers[i].firstName + " " + customers[i].lastName,
        email: customers[i].email,
        phone: customers[i].phone,
      });
    }
  }

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);
  return (
    <div>
      <h3 className="text-2xl font-semibold mb-5">Customers</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
    </div>
  );
};

export default Customers;
