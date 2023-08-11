import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../app/store";
import BlogCard from "../components/BlogCard";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import { getAllBlog } from "../features/blogs/blogSlice";
import { useEffect } from "react";
import moment from "moment";

const Blog = () => {
  const dispatch: AppDispatch = useDispatch();
  const getBlogs = useSelector((state: RootState) => state.blog.blogs);

  useEffect(() => {
    dispatch(getAllBlog());
  }, []);

  console.log(getBlogs);
  return (
    <>
      <Meta title="Blog" />
      <BreadCrumb title="Blog" />
      <div className="blog-wrapper w-full h-[100%] max-h-full bg-[#f5f5f7]">
        <div className="max-w-screen-2xl mx-auto">
          <div className="mx-10 pt-10 grid grid-flow-col grid-cols-12 gap-5 h-full">
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
              <div className="grid grid-cols-2 grid-flow-row gap-5 h-full">
                {getBlogs.map((blog, index) => {
                  return (
                    <div key={index} className="h-full">
                      <BlogCard
                        id={blog._id}
                        title={blog.title}
                        description={blog.description}
                        date={moment(blog.createAt).format(
                          "MMMM Do YYYY, h:mm:ss a"
                        )}
                        image={blog.images[0].url}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Blog;
