import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { AppDispatch, RootState } from '../app/store';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiEdit } from 'react-icons/fi';
import { AiOutlineDelete } from 'react-icons/ai';
import { getAllCoupon } from '../features/coupon/couponSlice';

interface DataType {
  key: React.Key;
  title: string;
  discount: number;
  expiry: string;
  action?: JSX.Element;
}

const columns: ColumnsType<DataType> = [
  {
    title: 'No.',
    dataIndex: 'key',
  },
  {
    title: 'Title',
    dataIndex: 'title',
    sorter: (a, b) => a.title.length - b.title.length,
  },
  {
    title: 'Discount',
    dataIndex: 'discount',
    sorter: (a, b) => a.discount - b.discount,
  },
  {
    title: 'Expiry',
    dataIndex: 'expiry',
    sorter: (a, b) => a.expiry.length - b.expiry.length,
  },
  {
    title: 'Action',
    dataIndex: 'action',
  },
];

const Couponlist = () => {
  const dispatch: AppDispatch = useDispatch();
  const coupons = useSelector((state: RootState) => state.coupon.coupons);

  useEffect(() => {
    dispatch(getAllCoupon());
  }, [dispatch]);

  const data1: DataType[] = [];
  for (let i = 0; i < coupons.length; i++) {
    data1.push({
      key: i,
      title: coupons[i].name || '',
      discount: coupons[i].discount || 0,
      expiry: new Date(coupons[i].expiry).toLocaleString() || '',
      action: (
        <div className="flex gap-3">
          <Link to="" className="text-blue-600">
            <FiEdit size={25} />
          </Link>
          <Link to="" className="text-red-600">
            <AiOutlineDelete size={25} />
          </Link>
        </div>
      ),
    });
  }

  return (
    <div>
      <h3 className="text-2xl font-semibold mb-5">Coupon List</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
    </div>
  );
};

export default Couponlist;
