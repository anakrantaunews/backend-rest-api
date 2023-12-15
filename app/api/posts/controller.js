const { StatusCodes } = require("http-status-codes");

const CustomAPI = require("../../errors");
const Post = require("./model");
const cloudinary = require("cloudinary").v2


const getAllPosts = async (req, res, next) => {
  try {
    const { keyword } = req.query;
    let condition = {};
    if (keyword) {
      condition = { ...condition, name: { $regex: keyword, $options: "i" } };
    }

    const allPosts = await Post.find(condition)
    .populate({path : "author_id"})
    .sort({createdAt : -1});

    return res.status(StatusCodes.OK).json({
      message: "Success",
      data: allPosts,
    });
  } catch (error) {
    next(error);
  }
};


const getAllPostsByUser = async (req, res, next) => {
  try {
    const { keyword } = req.query;
    let condition = {};
    if (keyword) {
      condition = { ...condition, name: { $regex: keyword, $options: "i" }};
    }

    const allPosts = await Post.find({...condition, author_id : req.user.userId})
    .populate({path : "author_id"})
    .sort({createdAt : -1});

    return res.status(StatusCodes.OK).json({
      message: "Success",
      data: allPosts,
    });
  } catch (error) {
    next(error);
  }
};


const getOnePost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const post = await Post.findOne({ _id: id }).populate({path : "author_id"});
    if (!post) {
      throw new CustomAPI.NotFoundError("post not found");
    }
    await Post.updateOne({_id : id}, {view : post.view+1})
    
    return res.status(StatusCodes.OK).json({
      message: "Success",
      data: post,
    });
  } catch (error) {
    next(error);
  }
};

const createPost = async (req, res, next) => {
  try {
    const { name, description } =
      req.body;
    
    if (!req.files || !req.files["thumbnail"]) {
      throw new CustomAPI.BadRequestError("Thumbnail must be uploaded");
    }

    const thumbnailUrl = req.files["thumbnail"][0].path;
    const thumbnail = req.files["thumbnail"][0].filename;

    const result = new Post({
      name,
      description,
      thumbnailUrl,
      thumbnail,
      author_id : req.user.userId
    });

    await result.save();

    return res.status(StatusCodes.OK).json({
      message: "Success Create The Post",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const updatePost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, description } =
      req.body;

    const result = await Post.findOne({ _id: id });

    if (!result) {
      throw new CustomAPI.NotFoundError("Not Found Post");
    }

    if (!req.files) {
      result.name = name;
      result.description = description;
    } else {
      
      const checkThumbnail = req.files["thumbnail"] ? true : false;

      if (checkThumbnail) {
        await cloudinary.uploader.destroy(result.thumbnail);
        result.thumbnail = req.files["thumbnail"][0].filename;
        result.thumbnailUrl = req.files["thumbnail"][0].path;
      }
      
      result.name = name;
      result.description = description;
      
      await result.save();
      return res.status(StatusCodes.OK).json({
        message: "Success Updated The Post",
        data: result,
      });
    }
  } catch (error) {
    next(error);
  }
};

const updatePostByUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, description } =
      req.body;

    const result = await Post.findOne({ _id: id, author_id : req.user.userId });
    if (!result) {
      throw new CustomAPI.NotFoundError("Not Found Post");
    }

    if (!req.files) {
      result.name = name;
      result.description = description;
    } else {
      
      const checkThumbnail = req.files["thumbnail"] ? true : false;

      if (checkThumbnail) {
        await cloudinary.uploader.destroy(result.thumbnail);
        result.thumbnail = req.files["thumbnail"][0].filename;
        result.thumbnailUrl = req.files["thumbnail"][0].path;
      }
      
      result.name = name;
      result.description = description;
      
      await result.save();
      return res.status(StatusCodes.OK).json({
        message: "Success Updated The Post",
        data: result,
      });
    }
  } catch (error) {
    next(error);
  }
};

const deletePost = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await Post.findOne({ _id: id });

    if (!result) {
      throw new CustomAPI.NotFoundError("Not Found Post");
    }

    
    const checkThumbnail = result.thumbnail ? true : false;

    if (checkThumbnail) {
      await cloudinary.uploader.destroy(result.thumbnail);
    }
    
    await Post.deleteOne({ _id: id });
    return res.status(StatusCodes.OK).json({
      message: "Success Deleted Post",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const deletePostByUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await Post.findOne({ _id: id, author_id : req.user.userId});

    if (!result) {
      throw new CustomAPI.NotFoundError("Not Found Post");
    }

    
    const checkThumbnail = result.thumbnail ? true : false;

    if (checkThumbnail) {
      await cloudinary.uploader.destroy(result.thumbnail);
    }
    
    await Post.deleteOne({ _id: id });
    return res.status(StatusCodes.OK).json({
      message: "Success Deleted Post",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
module.exports = {
  getAllPosts,
  createPost,
  getOnePost,
  updatePost,
  deletePost,
  updatePostByUser,
  deletePostByUser,
  getAllPostsByUser
};
