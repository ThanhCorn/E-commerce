import { FaEllipsisV } from 'react-icons/fa';
import { PiTrendUpThin } from 'react-icons/pi';

const Dashboard = () => {
  return (
    <div>
      <h3 className="text-xl font-semibold">Dashboard</h3>
      <div className="flex items-center justify-between gap-5 ">
        <div className="bg-white w-1/3 shadow-2xl px-4 py-6">
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
        <div className="bg-white w-1/3 shadow-2xl px-4 py-6">
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
        <div className="bg-white w-1/3 shadow-2xl px-4 py-6">
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
      </div>
    </div>
  );
};

export default Dashboard;
