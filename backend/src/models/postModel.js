const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const postSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'please add a title field'],
    },
    description: {
      type: String,
      required: [true, 'please add a description field'],
    },
    category: {
      type: String,
      required: [true, 'please add a category field'],
    },
    tags: {
      type: Array,
      required: [true, 'please add a tag field'],
    },
    excerpt: {
      type: String,
      required: [true, 'please add an excerpt field'],
    },
    image: {
      public_id: {
        type: String,
        required: [true, 'please add a image field'],
      },
      url: {
        type: String,
        required: [true, 'please add a blob URL'],
      },
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, 'please send the token'],
      ref: 'User',
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, 'please send the token'],
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);
module.exports = model('Post', postSchema);
