import { Link } from 'react-router-dom';
import blog1 from '../assets/images/blog-1.jpg';

const BlogCard = () => {
  return (
    <>
      <div className="bg-white w-full">
        <img src={blog1} alt="blog" className="rounded-t-lg w-full" />
        <div className="mx-3 mt-3 mb-5">
          <p className="text-black text-xs font-light">23 JULY, 2023</p>
          <h5 className="mt-2 font-bold">
            A Beautiful Sunday Morning Renaissance
          </h5>
          <p className="blog-description">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi
            itaque rerum magnam modi architecto tenetur laudantium ex rem
            numquam sit.
          </p>
          <Link to="" className="button">
            Read More
          </Link>
        </div>
      </div>
    </>
  );
};

export default BlogCard;
