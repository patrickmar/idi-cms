const mongoose = require('mongoose');

const videoPostSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please add a title field'],
    },

    category: {
      type: String,
      required: [true, 'Please add a category field'],
    },

    image: {
      public_id: {
        type: String,
        required: [true, 'Please add a image field'],
      },
      url: {
        type: String,
        required: [true, 'Please add a blob URL for the image'],
      },
    },
    youtubelink: {
      type: String,
      require: [true, 'Please add a youtube link'],
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

module.exports = mongoose.model('VideoLink', videoPostSchema);
