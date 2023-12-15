const cloudinary = require("../config/cloudinary");
const asyncHandler = require("express-async-handler");
const VideoPost = require("../models/vlogModel");

const createVlog = asyncHandler(async (req, res) => {
  if (!req.body) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  if (!req.user.id) {
    res.status(400);
    throw new Error("No authorization token");
  }

  const { title, image, category, tags, description, youtubeLink } = req.body;
  if (!image) {
    res.status(400);
    throw new Error("Image cannot be empty");
  }
  if (!youtubeLink) {
    res.status(400);
    throw new Error("Youtube link cannot be empty");
  }

  const result = await cloudinary.uploader.upload(image, {
    folder: "posts",
  });
  const params = {
    title,
    category,
    youtubeLink,
    tags,
    description,
    user: req.user.id,
    updatedBy: req.user.id,
    image: {
      public_id: result.public_id,
      url: result.secure_url,
    },
  };

  const videoPost = await VideoPost.create(params);
  res.status(201).json({
    success: true,
    message: "video post created successfully",
    data: videoPost,
  });
});

const fetchVlog = asyncHandler(async (req, res) => {
  const posts = await VideoPost.find().populate("user", {
    firstName: 1,
    lastName: 2,
    email: 3,
    image: 4,
    role: 5,
  });

  res.status(200).json({
    success: true,
    message: "Vlogs fetched successfully",
    data: posts,
  });
});

module.exports = { createVlog, fetchVlog };
