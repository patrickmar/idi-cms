const mongoose = require("mongoose");

const videoPostSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please add a title field"],
    },

    category: {
      type: String,
      required: [true, "Please add a category field"],
    },
    tags: {
      type: Array,
      required: [true, "please add a tag field"],
    },

    image: {
      public_id: {
        type: String,
        required: [true, "Please add a image field"],
      },
      url: {
        type: String,
        required: [true, "Please add a blob URL for the image"],
      },
    },
    description: {
      type: String,
      required: [true, "please add a description field"],
    },
    youtubeLink: {
      type: String,
      require: [true, "Please add a youtube link"],
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "Please send the token"],
      ref: "User",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "Please send the token"],
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("VideoLink", videoPostSchema);
