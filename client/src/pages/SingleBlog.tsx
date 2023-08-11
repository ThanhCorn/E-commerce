import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import { HiOutlineArrowLeft } from "react-icons/hi";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../app/store";
import { getBlogById } from "../features/blogs/blogSlice";
import { useEffect } from "react";

const SingleBlog = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const dispatch: AppDispatch = useDispatch();
  const blogById = useSelector((state: RootState) => state.blog.blogById);

  useEffect(() => {
    if (id) {
      getBlog(id);
    }
  }, []);

  const getBlog = (id: string) => {
    dispatch(getBlogById(id));
  };

  return (
    <>
      <Meta title={blogById?.title || ""} />
      <BreadCrumb title={blogById?.title || ""} />
      <div className="store-wrapper w-full max-h-full bg-[#f5f5f7] pb-52">
        <div className="max-w-screen-2xl mx-auto">
          <div className="mx-10 pt-10 grid grid-flow-col grid-cols-1 gap-5">
            <div className="">
              <div className="grid grid-cols-1 grid-flow-row">
                <button
                  onClick={() => navigate(-1)}
                  className="flex  items-center gap-2 text-gray-400 mb-3"
                >
                  <HiOutlineArrowLeft /> Go back to Blogs
                </button>
                <h3 className="text-2xl font-bold mb-5">{blogById?.title}</h3>
                <img
                  src={blogById?.images[0].url}
                  alt="blog"
                  className="w-full h-auto max-h-[400px] object-center rounded-md shadow-md mb-5 object-contain"
                />
                <p className="text-gray-500">
                  {blogById?.description.replace(/<\/?p>/g, "")}
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
