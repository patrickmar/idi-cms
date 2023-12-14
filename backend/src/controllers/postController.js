const asyncHandler = require('express-async-handler');
const Post = require('../models/postModel');
const User = require('../models/userModel');
const cloudinary = require('../config/cloudinary');

// get all posts
const getPosts = asyncHandler(async (req, res) => {
  // if (!req.user.id) {
  //   res.status(400);
  //   throw new Error('No authorization token');
  // }
  const posts = await Post.find().populate('user', {
    firstName: 1,
    lastName: 2,
    email: 3,
    image: 4,
    role: 5,
  });

  res.status(200).json({
    success: true,
    message: 'Posts fetched successfully',
    data: posts,
  });
});

// get post
const getPost = asyncHandler(async (req, res) => {
  const id = req.params.id;

  if (!id) {
    res.status(400);
    throw new Error('Please provide a post id');
  }

  if (!req.user.id) {
    res.status(400);
    throw new Error('No authorization token');
  }

  const post = await Post.findById(id).populate('user', {
    firstName: 1,
    lastName: 2,
    email: 3,
    image: 4,
    role: 5,
  });

  res
    .status(200)
    .json({ success: true, message: 'Post fetched successfully', data: post });
});

//create all posts
const createPost = asyncHandler(async (req, res) => {
  if (!req.body) {
    res.status(400);
    throw new Error('Please add all fields');
  }
  if (!req.user.id) {
    res.status(400);
    throw new Error('No authorization token');
  }
  const { title, description, image, category, tags, excerpt } = req.body;
  if (!image) {
    res.status(400);
    throw new Error('Image not uploaded');
  }
  const result = await cloudinary.uploader.upload(image, {
    folder: 'posts',
  });
  const params = {
    title,
    description,
    category,
    excerpt,
    tags,
    user: req.user.id,
    updatedBy: req.user.id,
    image: {
      public_id: result.public_id,
      url: result.secure_url,
    },
  };

  const post = await Post.create(params);
  res
    .status(201)
    .json({ success: true, message: 'Post created successfully', data: post });
});

//update post
const updatePost = asyncHandler(async (req, res) => {
  const id = req.params.id;

  if (!id) {
    res.status(400);
    throw new Error('Please provide a post id');
  } else if (!req.body) {
    res.status(400);
    throw new Error('Please provide at least a field');
  } else {
    const post = await Post.findById(id);
    if (!post) {
      res.status(404);
      throw new Error('Post not found');
    } else {
      // check for user
      const user = await User.findById(req.user.id);
      if (!user) {
        res.status(401);
        throw new Error('User does not exist');
      }

      const { title, description, image, category, tags, excerpt } = req.body;

      const newPost = {
        title,
        description,
        category,
        excerpt,
        tags,
        updatedBy: req.user.id,
      };

      // const validateImage = (img) => {
      //     const check = Buffer.from(img, 'base64').toString('base64') === img;
      //     return check
      // }

      if (image !== '') {
        // if (validateImage(image)) {
        const ImgId = post.image.public_id;
        if (ImgId) {
          await cloudinary.uploader.destroy(ImgId);
        }

        const newImage = await cloudinary.uploader.upload(image, {
          folder: 'posts',
        });
        newPost.image = {
          public_id: newImage.public_id,
          url: newImage.secure_url,
        };

        // }
      }

      const updatedPost = await Post.findByIdAndUpdate(id, newPost, {
        new: true,
      });
      res
        .status(200)
        .json({ message: 'Post updated successfully', data: updatedPost });
    }
  }
});

//delete post
const deletePost = asyncHandler(async (req, res) => {
  const id = req.params.id;
  if (!id) {
    res.status(400);
    throw new Error('Please provide a post id');
  } else {
    const post = await Post.findById(id);
    if (!post) {
      res.status(404);
      throw new Error('Post not found');
    } else {
      // check for user
      const user = await User.findById(req.user.id);
      if (!user) {
        res.status(401);
        throw new Error('User does not exist');
      }

      const postImage = post.image.public_id;

      if (postImage) {
        await cloudinary.uploader.destroy(postImage);
      }

      //await post.remove(); remove function deprecated in new version.
      await post.deleteOne();
      res.status(200).json({ message: 'Post deleted successfully' });
    }
  }
});

module.exports = {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
};
