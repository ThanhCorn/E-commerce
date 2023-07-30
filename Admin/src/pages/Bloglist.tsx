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

const Bloglist = () => {
  return (
    <div>
      <h3 className="text-xl font-semibold mb-5">Bloglist</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
    </div>
  );
};

export default Bloglist;
