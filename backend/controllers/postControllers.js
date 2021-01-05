import asyncHandler from "express-async-handler";

import Post from "../models/postModel.js";
import validatePostInput from "../validator/postValidator.js";

// @desc create post
// @route POST /api/posts
// @access private
const createPost = asyncHandler(async (req, res) => {
  const { errors, isValid } = validatePostInput(req.body);

  if (!isValid) {
    return res.json({
      errors,
      success: false,
    });
  }

  const { title, body, image } = req.body;

  req.user.password = undefined;

  const post = await Post.create({
    title,
    body,
    image,
    postedBy: req.user,
  });

  if (post) {
    return res.json({
      post,
      success: true,
      message: "Post created successfully",
    });
  } else {
    return res.json({
      success: false,
      errors: { error: "Bad request" },
    });
  }
});

// @desc get all posts
// @route GET /api/posts
// @access private

const getAllPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find({})
    .sort({ updatedAt: -1 })
    .populate("postedBy", "_id name")
    .populate("comments.commentedBy", "_id, name");

  if (posts) {
    return res.json({
      success: true,
      posts,
    });
  } else {
    return res.json({
      success: false,
      errors: { error: "Bad request" },
      posts: [],
    });
  }
});

// @desc get individual user post
// @route GET /api/posts/mypost
// @access private

const getAllMyPosts = asyncHandler(async (req, res) => {
  const myPosts = await Post.find({ postedBy: req.user._id }).populate(
    "postedBy",
    "_id name"
  );

  if (myPosts) {
    return res.json({
      success: true,
      myPosts,
    });
  } else {
    return res.status(400).json({
      success: false,
      errors: { error: "Bad request" },
    });
  }
});

// @desc like unlike post
// @route PUT /api/posts/likeunlike
// @access private

const likeUnlikePost = asyncHandler(async (req, res) => {
  console.log("here");
  const post = await Post.findById(req.body.postId);
  if (post) {
    const index = post.likes.includes(req.user._id);

    Post.findByIdAndUpdate(
      req.body.postId,
      index
        ? { $pull: { likes: req.user._id } }
        : { $push: { likes: req.user._id } },

      { new: true }
    ).exec((err, result) => {
      if (err) {
        return res.status(422).json({ error: err });
      } else {
        return res.json(result);
      }
    });
  }
});

// @desc comment post
// @route POST /api/posts/comment
// @access private

const createComment = (req, res) => {
  const comment = {
    text: req.body.text,
    commentedBy: req.user._id,
  };

  Post.findByIdAndUpdate(
    req.body.postId,
    { $push: { comments: comment } },
    { new: true }
  )
    .populate("comments.commentedBy", "_id name")
    .exec((err, result) => {
      if (err) {
        return res.status(422).json({ error: err });
      } else {
        return res.json(result);
      }
    });
};

export {
  createPost,
  getAllPosts,
  getAllMyPosts,
  likeUnlikePost,
  createComment,
};
