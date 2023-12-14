const cloudinary = require('../config/cloudinary');
const asyncHandler = require('express-async-handler');
const VideoPost = require('../models/VideoPost');
// const createVlog = async (req, res) => {
//   try {
//     // Extract data from the request body
//     const { title, category, image, youtubelink } = req.body;

//     // Upload the image file to Cloudinary
//     const result = await cloudinary.uploader.upload(image, {
//       folder: 'posts',
//     });
//     // Create a new video post in the database
//     const newVlog = new videoPost({
//       title,
//       category,
//       image: {
//         public_id: result.public_id,
//         url: result.secure_url,
//       },
//       youtubelink,
//       updatedBy: req.user.id, // Assuming you have authentication middleware setting req.user.id
//       user: req.user.id,
//     });

//     // Save the new vlog post
//     const savedVlog = await newVlog.save();

//     res.status(201).json(savedVlog);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };

// module.exports = { createVlog };

const createVlog = asyncHandler(async (req, res) => {
  if (!req.body) {
    res.status(400);
    throw new Error('Please add all fields');
  }

  if (!req.user.id) {
    res.status(400);
    throw new Error('No authorization token');
  }

  const { title, image, category, youtubrlink } = req.body;
  if (!image) {
    res.status(400);
    throw new Error('Image not uploaded');
  }
  const result = await cloudinary.uploader.upload(image, {
    folder: 'posts',
  });
  const params = {
    title,
    category,
    youtubrlink,
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
    message: 'videoPost created successfully',
    data: videoPost,
  });
});

module.exports = { createVlog };
