import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { AppDispatch, RootState } from "../app/store";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo } from "react";
import { getOrderParam, resetState } from "../features/auth/authSlice";
import { useNavigate, useParams } from "react-router-dom";

interface DataType {
  key: React.Key;
  name: string;
  brand: string;
  count: number;
  color: string;
  date: Date;
}

const columns: ColumnsType<DataType> = [
  {
    title: "No.",
    dataIndex: "key",
  },
  {
    title: "Brand",
    dataIndex: "brand",
  },
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Count",
    dataIndex: "count",
  },
  {
    title: "Color",
    dataIndex: "color",
  },

  {
    title: "Date",
    dataIndex: "date",
  },
];

const ViewOrder = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const orderByIdParam = useSelector(
    (state: RootState) => state.auth.orderByIdParam
  );
  useEffect(() => {
    if (id) {
      dispatch(resetState());
      dispatch(getOrderParam(id));
    }
  }, [id]);
  console.log(orderByIdParam);

  const data1 = useMemo(() => {
    const newData: DataType[] = [];
    if (orderByIdParam) {
      orderByIdParam?.orderItems?.forEach((item, index) => {
        newData.push({
          key: index + 1,
          name: item.productId.title,
          brand: item.productId.brand,
          count: item.quantity,
          color: item.color.title as string,
          date: orderByIdParam.paidAt,
        });
      });
    }

    return newData;
  }, [orderByIdParam]);

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-semibold mb-5">View Order</h3>
        <button
          onClick={goBack}
          className="px-2 py-1 border border-gray-300 rounded-md bg-blue-500 text-white hover:bg-blue-600"
        >
          Go back
        </button>
      </div>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
      <div>
        <h3 className="text-2xl font-semibold mb-5">Order Details</h3>
        <div className="bg-white px-4 py-4 rounded-md">
          <div className="flex justify-between items-center">
            <div className="flex flex-col text-center">
              <span className="mb-3 text-lg font-semibold">Order Id</span>
              <span>{orderByIdParam?._id}</span>
            </div>
            <div className="flex flex-col text-center">
              <span className="mb-3 text-lg font-semibold">Order Status</span>
              <span>{orderByIdParam.paymentStatus}</span>
            </div>
            <div className="flex flex-col text-center">
              <span className="mb-3 text-lg font-semibold">Payment Intent</span>
              <span>${orderByIdParam.totalPrice}</span>
            </div>
            <div className="flex flex-col text-center">
              <span className="mb-3 text-lg font-semibold">Order By</span>
              <span>
                {orderByIdParam.userId
                  ? orderByIdParam?.userId.firstName +
                    " " +
                    orderByIdParam?.userId.lastName
                  : ""}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewOrder;
