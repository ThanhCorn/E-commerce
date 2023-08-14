import { FaEllipsisV } from "react-icons/fa";
import { PiTrendUpThin } from "react-icons/pi";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { AppDispatch, RootState } from "../app/store";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  getAllOrder,
  getMonthlyOrder,
  getMonthlyOrderCount,
  getYearlyOrder,
  getYearlyOrderCount,
} from "../features/auth/authSlice";

type MonthlyIncome = {
  type: string;
  income: number;
};

type MonthlyOrderCount = {
  type: string;
  sales: number;
};

interface DataType {
  key: React.Key;
  name: string;
  product: number;
  total: number;
  address: string;
  status: string;
}

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const [dataMonthly, setDataMonthly] = useState<MonthlyIncome[]>([]);
  const [dataMonthlyOrderCount, setDataMonthlyOrderCount] = useState<
    MonthlyOrderCount[]
  >([]);
  const dispatch: AppDispatch = useDispatch();
  const monthlyInComeState = useSelector(
    (state: RootState) => state.auth.monthIncome
  );
  const monthlyOrderCountState = useSelector(
    (state: RootState) => state.auth.monthOrderCount
  );
  const yearlyInComeState = useSelector(
    (state: RootState) => state.auth.yearIncome
  );
  const orders = useSelector((state: RootState) => state.auth.orders);

  useEffect(() => {
    dispatch(getAllOrder());
    dispatch(getMonthlyOrder());
    dispatch(getMonthlyOrderCount());
    dispatch(getYearlyOrder());
    dispatch(getYearlyOrderCount());
  }, []);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const data: MonthlyIncome[] = [];
    const monthlyOrderCount: MonthlyOrderCount[] = [];
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    for (let i = 0; i < monthlyInComeState?.length; i++) {
      data.push({
        type: monthNames[monthlyInComeState[i]?._id?.month],
        income: monthlyInComeState[i]?.amount,
      });
    }
    for (let i = 0; i < monthlyOrderCountState?.length; i++) {
      monthlyOrderCount.push({
        type: monthNames[monthlyOrderCountState[i]?._id?.month],
        sales: monthlyOrderCountState[i]?.count,
      });
    }
    setDataMonthlyOrderCount(monthlyOrderCount);
    setDataMonthly(data);
  }, [monthlyInComeState, monthlyOrderCountState]);

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
      title: "Total Price",
      dataIndex: "total",
    },
    {
      title: "Address",
      dataIndex: "address",
    },
    {
      title: "Status",
      dataIndex: "status",
    },
  ];

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Chart.js Bar Chart",
      },
    },
  };

  const data1: DataType[] = [];
  for (let i = 0; i < orders?.length; i++) {
    data1.push({
      key: i,
      name: orders[i].userId.firstName + " " + orders[i].userId.lastName,
      product: orders[i].orderItems.length,
      total: orders[i].totalPrice,
      address: orders[i].shippingInfo.address.state,
      status: orders[i].paymentStatus,
    });
  }

  const data = {
    labels: dataMonthly?.map((item) => item.type),
    datasets: [
      {
        label: "Income",
        data: dataMonthly?.map((item) => item?.income),
        backgroundColor: "yellow",
      },
    ],
  };

  const data2 = {
    labels: dataMonthlyOrderCount?.map((item) => item.type),
    datasets: [
      {
        label: "Sales",
        data: dataMonthlyOrderCount?.map((item) => item?.sales),
        backgroundColor: "yellow",
      },
    ],
  };

  return (
    <div>
      <h3 className="text-2xl font-semibold mb-5">Dashboard</h3>
      <div className="flex items-center justify-between gap-5 ">
        <div className="bg-white w-1/2 shadow-xl px-4 py-6">
          <div className="flex items-center justify-between mb-5 font-normal text-lg text-gray-400">
            <h5 className="">Total sells</h5>
            <FaEllipsisV />
          </div>
          <div className="flex items-center justify-between">
            <b className="text-3xl">${yearlyInComeState[0]?.amount}</b>
            <div className="flex flex-col">
              <h4 className="flex items-center gap-1 justify-end text-green-500 font-bold text-lg">
                <PiTrendUpThin size={24} />
                34.7%
              </h4>
              <p>Yearly Total Income</p>
            </div>
          </div>
        </div>

        <div className="bg-white w-1/2 shadow-xl px-4 py-6">
          <div className="flex items-center justify-between mb-5 font-normal text-lg text-gray-400">
            <h5 className="">Total orders</h5>
            <FaEllipsisV />
          </div>
          <div className="flex items-center justify-between">
            <b className="text-3xl">{yearlyInComeState[0]?.count}</b>
            <div className="flex flex-col">
              <h4 className="flex items-center gap-1 justify-end text-green-500 font-bold text-lg">
                <PiTrendUpThin size={24} />
                34.7%
              </h4>
              <p>Sales in Last Year From Today</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-between mt-5 gap-3">
        <div className="w-[50%]">
          <h3 className="text-xl font-semibold my-5">Income Statics</h3>
          <div className="">
            <Bar options={options} data={data} />;
          </div>
        </div>
        <div className="w-[50%]">
          <h3 className="text-xl font-semibold my-5">Sales Statics</h3>
          <div className="">
            <Bar options={options} data={data2} />;
          </div>
        </div>
      </div>
      <h3 className="text-xl font-semibold my-5">Recent Orders</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
      <h3 className="text-xl font-semibold my-5">Recent Reviews</h3>
      <div className="">
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Dashboard;
