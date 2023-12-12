const mongoose = require('mongoose');

const videoPostSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please add a title field'],
    },
    description: {
      type: String,
      required: [true, 'Please add a description field'],
    },
    category: {
      type: String,
      required: [true, 'Please add a category field'],
    },
    tags: {
      type: Array,
      required: [true, 'Please add a tag field'],
    },
    excerpt: {
      type: String,
      required: [true, 'Please add an excerpt field'],
    },
    video: {
      public_id: {
        type: String,
        required: [true, 'Please add a video field'],
      },
      url: {
        type: String,
        required: [true, 'Please add a blob URL for the video'],
      },
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, 'Please send the token'],
      ref: 'User',
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, 'Please send the token'],
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Post', videoPostSchema);
