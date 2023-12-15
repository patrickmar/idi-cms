const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const bannerSchema = new mongoose.Schema({
  public_id: {
    type: String,
    required: [true, "Please add a banner field"],
  },
  url: {
    type: String,
    required: [true, "Please add a blob URL"],
  },
});

const postSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "please add a title field"],
    },
    description: {
      type: String,
      required: [true, "please add a description field"],
    },
    category: {
      type: String,
      required: [true, "please add a category field"],
    },
    tags: {
      type: Array,
      required: [true, "please add a tag field"],
    },
    excerpt: {
      type: String,
      required: [true, "please add an excerpt field"],
    },
    image: {
      public_id: {
        type: String,
        required: [true, "please add a image field"],
      },
      url: {
        type: String,
        required: [true, "please add a blob URL"],
      },
    },
    banners: {
      type: [bannerSchema], // Array of objects with public_id and url
      required: true,
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "please send the token"],
      ref: "User",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "please send the token"],
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);
module.exports = model("Post", postSchema);
