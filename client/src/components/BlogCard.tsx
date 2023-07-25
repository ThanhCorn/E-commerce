import { Link } from 'react-router-dom';
import blog1 from '../assets/images/blog-1.jpg';

const BlogCard = () => {
  return (
    <>
      <div className="bg-white">
        <img src={blog1} alt="blog" className="rounded-t-lg" />
        <div className="mx-3 mt-3 mb-10">
          <p className="text-black text-xs font-light">23 JULY, 2023</p>
          <h5 className="mt-2 font-bold">
            A Beautiful Sunday Morning Renaissance
          </h5>
          <p className="blog-description">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi
            itaque rerum magnam modi architecto tenetur laudantium ex rem
            numquam sit.
          </p>
          <Link to="" className="px-5 bg-third text-white rounded-full py-2">
            Read More
          </Link>
        </div>
      </div>
    </>
  );
};

export default BlogCard;
