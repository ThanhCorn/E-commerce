import BreadCrumb from '../components/BreadCrumb';
import Meta from '../components/Meta';
import blog1 from '../assets/images/blog-1.jpg';
import { HiOutlineArrowLeft } from 'react-icons/hi';
import { Link } from 'react-router-dom';

const SingleBlog = () => {
  return (
    <>
      <Meta title="Dynamic Blog name" />
      <BreadCrumb title="Dynamic Blog name" />
      <div className="store-wrapper w-full max-h-full bg-[#f5f5f7] pb-52">
        <div className="max-w-screen-2xl mx-auto">
          <div className="mx-10 pt-10 grid grid-flow-col grid-cols-12 gap-5">
            <div className="col-span-3">
              <div className="mb-3 pb-4 bg-white rounded-lg">
                <div className="mx-4 pt-3">
                  <h3 className=" font-bold mb-4">Shop by Categories</h3>
                  <div>
                    <ul className="text-sm leading-7">
                      <li className="opacity-80 cursor-pointer">Home</li>
                      <li className="opacity-80 cursor-pointer">Television</li>
                      <li className="opacity-80 cursor-pointer">Camera</li>
                      <li className="opacity-80 cursor-pointer">Laptop</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-span-9">
              <div className="grid grid-cols-1 grid-flow-row">
                <Link
                  to="/blogs"
                  className="flex  items-center gap-2 text-gray-400 mb-3"
                >
                  <HiOutlineArrowLeft /> Go back to Blogs
                </Link>
                <h3 className="text-2xl font-bold mb-5">
                  A Beautiful Sunday Morning Renaissance
                </h3>
                <img
                  src={blog1}
                  alt="blog"
                  className="w-full h-auto max-h-[400px] object-center rounded-md shadow-md mb-5"
                />
                <p className="text-gray-500">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Tempore, ipsum adipisci, sint rerum reiciendis quaerat id
                  tenetur asperiores labore deleniti magnam, ex tempora maxime
                  officia. Iste consequatur pariatur impedit perspiciatis
                  placeat! Molestias totam quis, recusandae atque possimus
                  dolorem beatae vitae officia reiciendis aperiam quibusdam
                  repellendus temporibus, explicabo sit. Repudiandae, molestiae.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleBlog;
