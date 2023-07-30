import { FaEllipsisV } from "react-icons/fa";
import { PiTrendUpThin } from "react-icons/pi";
import { IoIosTrendingDown } from "react-icons/io";
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
import { faker } from "@faker-js/faker";
import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";

interface DataType {
  key: React.Key;
  name: string;
  product: number;
  address: string;
  status: string;
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
    title: "Status",
    dataIndex: "status",
  },
];

const data1: DataType[] = [];
for (let i = 0; i < 46; i++) {
  data1.push({
    key: i,
    name: `Edward King ${i}`,
    product: 32,
    address: `London, Park Lane no. ${i}`,
    status: "VietNam 200",
  });
}

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
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

const labels = [
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

export const data = {
  labels,
  datasets: [
    {
      label: "Dataset 1",
      data: labels.map(() => faker.datatype.number({ min: 0, max: 150 })),
      backgroundColor: "yellow",
    },
  ],
};

const Dashboard = () => {
  return (
    <div>
      <h3 className="text-xl font-semibold mb-5">Dashboard</h3>
      <div className="flex items-center justify-between gap-5 ">
        <div className="bg-white w-1/3 shadow-xl px-4 py-6">
          <div className="flex items-center justify-between mb-5 font-normal text-lg text-gray-400">
            <h5 className="">Total sells</h5>
            <FaEllipsisV />
          </div>
          <div className="flex items-center justify-between">
            <b className="text-3xl">$3799.00</b>
            <div className="flex flex-col">
              <h4 className="flex items-center gap-1 justify-end text-green-500 font-bold text-lg">
                <PiTrendUpThin size={24} />
                34.7%
              </h4>
              <p>Compared to April 2023</p>
            </div>
          </div>
        </div>
        <div className="bg-white w-1/3 shadow-xl px-4 py-6">
          <div className="flex items-center justify-between mb-5 font-normal text-lg text-gray-400">
            <h5 className="">Average order value</h5>
            <FaEllipsisV />
          </div>
          <div className="flex items-center justify-between">
            <b className="text-3xl">$3799.00</b>
            <div className="flex flex-col">
              <h4 className="flex items-center gap-1 justify-end text-red-500 font-bold text-lg">
                <IoIosTrendingDown size={24} />
                34.7%
              </h4>
              <p>Compared to April 2023</p>
            </div>
          </div>
        </div>
        <div className="bg-white w-1/3 shadow-xl px-4 py-6">
          <div className="flex items-center justify-between mb-5 font-normal text-lg text-gray-400">
            <h5 className="">Total orders</h5>
            <FaEllipsisV />
          </div>
          <div className="flex items-center justify-between">
            <b className="text-3xl">399</b>
            <div className="flex flex-col">
              <h4 className="flex items-center gap-1 justify-end text-green-500 font-bold text-lg">
                <PiTrendUpThin size={24} />
                34.7%
              </h4>
              <p>Compared to April 2023</p>
            </div>
          </div>
        </div>
      </div>
      <h3 className="text-xl font-semibold my-5">Income Statics</h3>
      <div>
        <Bar options={options} data={data} />;
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
