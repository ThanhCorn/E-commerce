import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { AppDispatch, RootState } from "../app/store";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllProduct } from "../features/product/productSlice";

interface DataType {
  key: React.Key;
  title?: string;
  brand?: string;
  category?: string;
  color?: string[];
  price?: string;
  action?: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: "No.",
    dataIndex: "key",
  },
  {
    title: "Title",
    dataIndex: "title",
  },
  {
    title: "Brand",
    dataIndex: "brand",
  },
  {
    title: "Category",
    dataIndex: "category",
  },
  {
    title: "Color",
    dataIndex: "color",
    render: (colors: string[] | undefined) => colors?.join(", "),
  },
  {
    title: "Price",
    dataIndex: "price",
  },
  {
    title: "Action",
    dataIndex: "action",
    render: (action: string) => <a href="#">{action}</a>,
  },
];

const Productlist = () => {
  const dispatch: AppDispatch = useDispatch();
  const products = useSelector((state: RootState) => state.product.products);
  console.log(products);

  const data1: DataType[] = [];
  for (let i = 0; i < products.length; i++) {
    data1.push({
      key: i,
      title: products[i].title,
      brand: products[i].brand,
      category: products[i].category,
      color: products[i].color,
      price: `$ ${products[i].price}`,
      action: "Edit",
    });
  }

  useEffect(() => {
    dispatch(getAllProduct());
  }, [dispatch]);

  return (
    <div>
      <h3 className="text-xl font-semibold mb-5">Products</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
    </div>
  );
};

export default Productlist;
