import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { AppDispatch, RootState } from "../app/store";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo } from "react";
import { getAllOrder, updateOrderStatus } from "../features/auth/authSlice";
import { Link } from "react-router-dom";

interface DataType {
  key: React.Key;
  name: string;
  product: JSX.Element;
  amount: number;
  date: Date;
  status: JSX.Element;
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
  {
    title: "Status",
    dataIndex: "status",
  },
];

const Orders = () => {
  const dispatch: AppDispatch = useDispatch();
  const orders = useSelector((state: RootState) => state.auth.orders);

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
        name: orders[i]?.userId?.firstName + " " + orders[i]?.userId?.lastName,
        product: (
          <Link to={`/admin/order/${orders[i]._id}`} className="text-blue-500">
            View Order
          </Link>
        ),
        amount: orders[i].totalPrice,
        date: orders[i].paidAt,
        status: (
          <>
            <select
              name=""
              id=""
              value={orders[i].orderStatus}
              className="border border-gray-300 px-2 py-2 rounded-md w-full"
              onChange={(e) => handleUpdate(orders[i]._id, e.target.value)}
            >
              <option value="Ordered">Ordered</option>
              <option value="Processed">Processed</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
            </select>
          </>
        ),
      });
    }
    return newData;
  }, [orders]);

  const handleUpdate = (id: string, orderStatus: string) => {
    if (id) {
      dispatch(
        updateOrderStatus({
          id,
          status: orderStatus,
        })
      );
      dispatch(getAllOrder());
    }
  };

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
