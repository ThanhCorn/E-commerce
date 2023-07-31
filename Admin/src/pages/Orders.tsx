import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { AppDispatch, RootState } from "../app/store";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllOrder } from "../features/auth/authSlice";

interface DataType {
  key: React.Key;
  name: string;
  product: JSX.Element[];
  amount: number;
  date: string;
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
    title: "Product",
    dataIndex: "product",
  },
  {
    title: "Amount",
    dataIndex: "amount",
  },
  {
    title: "Date",
    dataIndex: "date",
  },
];

const Orders = () => {
  const dispatch: AppDispatch = useDispatch();
  const orders = useSelector((state: RootState) => state.auth.orders);
  console.log(orders);
  useEffect(() => {
    dispatch(getAllOrder());
  }, [dispatch]);

  const data1: DataType[] = [];
  for (let i = 0; i < orders.length; i++) {
    const productElements: JSX.Element[] = orders[i].products.map(
      (index, j) => (
        <ul className="flex" key={j}>
          <li>{index.product.title}</li>
        </ul>
      )
    );
    data1.push({
      key: i,
      name: orders[i].orderedBy.firstname || "",
      product: productElements,
      amount: orders[i].paymentIntent.amount,
      date: new Date(orders[i].createdAt).toLocaleString(),
    });
  }
  return (
    <div>
      <h3 className="text-2xl font-semibold mb-5">Orders</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
    </div>
  );
};

export default Orders;
