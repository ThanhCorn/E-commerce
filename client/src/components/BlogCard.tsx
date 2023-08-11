import { Link } from "react-router-dom";

interface BlogCardProps {
  id: string;
  title: string;
  description: string;
  image: string;
  date: string;
}

const BlogCard = (props: BlogCardProps) => {
  const { id, title, description, image, date } = props;
  return (
    <>
      <div className="bg-white w-full h-[530px] mb-5 rounded-md">
        <img
          src={image}
          alt="blog"
          className="rounded-t-lg w-full h-[300px] object-contain mb-10"
        />
        <div className="mx-3  mb-5 px-2">
          <p className="text-black text-xs font-normal">{date}</p>
          <h5 className="mt-2 font-bold text-xl">{title}</h5>
          <p
            className="blog-description text-white"
            dangerouslySetInnerHTML={{ __html: description }}
          ></p>
          <Link to={`/blog/${id}`} className="button mb-5">
            Read More
          </Link>
        </div>
      </div>
    </>
  );
};

export default BlogCard;
