import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { AppDispatch, RootState } from "../app/store";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo } from "react";
import { getAllOrder } from "../features/auth/authSlice";
import { Link } from "react-router-dom";

interface DataType {
  key: React.Key;
  name: string;
  product: JSX.Element;
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
    if (orders.length === 0) {
      dispatch(getAllOrder());
    }
  }, [dispatch, orders]);

  const data1 = useMemo(() => {
    const newData: DataType[] = [];
    for (let i = 0; i < orders.length; i++) {
      newData.push({
        key: i,
        name:
          orders[i].orderedBy.firstname + " " + orders[i].orderedBy.lastname,
        product: (
          <Link to={`/admin/order/${orders[i]._id}`} className="text-blue-500">
            View Order
          </Link>
        ),
        amount: orders[i].paymentIntent.amount,
        date: new Date(orders[i].createdAt).toLocaleString(),
      });
    }
    return newData;
  }, [orders]);

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
