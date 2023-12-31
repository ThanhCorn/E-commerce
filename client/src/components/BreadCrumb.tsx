import { Link } from "react-router-dom";

interface IBreadCrumb {
  title: string | undefined;
}

const BreadCrumb = ({ title }: IBreadCrumb) => {
  return (
    <div className="breadcrumb mt-3 w-full flex justify-center mb-5 ">
      <div className="">
        <Link to="/">Home / {title}</Link>
      </div>
    </div>
  );
};

export default BreadCrumb;
