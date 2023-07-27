import BlogCard from '../components/BlogCard';
import BreadCrumb from '../components/BreadCrumb';
import Meta from '../components/Meta';

const Blog = () => {
  return (
    <>
      <Meta title="Blog" />
      <BreadCrumb title="Blog" />
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
              <div className="grid grid-cols-2 grid-flow-row gap-5">
                <BlogCard />
                <BlogCard />
                <BlogCard />
                <BlogCard />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Blog;
