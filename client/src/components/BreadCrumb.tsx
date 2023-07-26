import { Link } from 'react-router-dom';

interface IBreadCrumb {
  title: string;
}

const BreadCrumb = ({ title }: IBreadCrumb) => {
  return (
    <div className="breadcrumb mt-3 w-full flex justify-center mb-10">
      <div>
        <Link to="/">Home / {title}</Link>
      </div>
    </div>
  );
};

export default BreadCrumb;
