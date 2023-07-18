import BlogModel from '../models/blog.Model';
import { Request, Response } from 'express';
import { validateMongoDbId } from '../utils/validateMongodbid';

// POST createBlog
export const createBlog = async (req: Request, res: Response) => {
  try {
    const newBlog = await BlogModel.create(req.body);
    return res.status(201).json(newBlog);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(error.message);
  }
};

// UPDATE blog
export const updateBlog = async (req: Request, res: Response) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const updateBlog = await BlogModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    return res.status(200).json(updateBlog);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(error.message);
  }
};

// GET blog
export const getBlog = async (req: Request, res: Response) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const getBlog = await BlogModel.findById(id)
      .populate('likes')
      .populate('dislikes');
    await BlogModel.findByIdAndUpdate(
      id,
      { $inc: { numViews: 1 } },
      { new: true },
    );
    return res.status(200).json(getBlog);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(error.message);
  }
};

// GET all blog
export const getAllBlog = async (req: Request, res: Response) => {
  try {
    const allBlog = await BlogModel.find();

    return res.status(200).json(allBlog);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(error.message);
  }
};

// DELETE blog
export const deleteBlog = async (req: Request, res: Response) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const deleteBlog = await BlogModel.findByIdAndDelete(id);
    return res.status(200).json(deleteBlog);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(error.message);
  }
};

// Like blog
export const likeTheBlog = async (req: Request, res: Response) => {
  const { blogId } = req.body;
  validateMongoDbId(blogId);

  // Find the blog by ID
  const blog = await BlogModel.findById(blogId);
  // Get the login user ID by req.user._id
  const loginUserId = req?.user._id;
  // Check if the user already liked the blog
  const isLiked = blog?.isLiked;
  // Check if the user already disliked the blog
  const alreadyDisliked = blog?.dislikes.find(
    (userId) => userId?.toString() === loginUserId?.toString(),
  );
  if (alreadyDisliked) {
    const blog = await BlogModel.findByIdAndUpdate(
      blogId,
      {
        $pull: { dislikes: loginUserId },
        isDisliked: false,
      },
      { new: true },
    );
    return res.status(200).json(blog);
  }
  if (isLiked) {
    const blog = await BlogModel.findByIdAndUpdate(
      blogId,
      {
        $pull: { likes: loginUserId },
        isLiked: false,
      },
      { new: true },
    );
    return res.status(200).json(blog);
  } else {
    const blog = await BlogModel.findByIdAndUpdate(
      blogId,
      {
        $push: { likes: loginUserId },
        isLiked: true,
      },
      { new: true },
    );
    return res.status(200).json(blog);
  }
};

// Dislike blog
export const dislikeTheBlog = async (req: Request, res: Response) => {
  const { blogId } = req.body;
  validateMongoDbId(blogId);

  // Find the blog by ID
  const blog = await BlogModel.findById(blogId);
  const loginUserId = req?.user._id;
  // Check if the user already disliked the blog
  const isDisliked = blog?.isDisliked;
  // Check if the user already liked the blog
  const alreadyLiked = blog?.likes.find(
    (userId) => userId?.toString() === loginUserId?.toString(),
  );
  if (alreadyLiked) {
    const blog = await BlogModel.findByIdAndUpdate(
      blogId,
      {
        $pull: { likes: loginUserId },
        isLiked: false,
      },
      { new: true },
    );
    return res.status(200).json(blog);
  }
  if (isDisliked) {
    const blog = await BlogModel.findByIdAndUpdate(
      blogId,
      {
        $pull: { dislikes: loginUserId },
        isDisliked: false,
      },
      { new: true },
    );
    return res.status(200).json(blog);
  } else {
    const blog = await BlogModel.findByIdAndUpdate(
      blogId,
      {
        $push: { dislikes: loginUserId },
        isDisliked: true,
      },
      { new: true },
    );
    return res.status(200).json(blog);
  }
};
