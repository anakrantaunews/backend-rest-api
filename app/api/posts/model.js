const mongoose = require("mongoose");
const PostSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Post Name must be Insert"],
    },
    description: {
      type: String,
      default: "",
    },
    view: {
      type: Number,
      default : 0,
    },
    thumbnail: {
      type: String,
      required: [true, "Post must have thumbnail"],
    },
    thumbnailUrl: {
      type: String,
      default: "",
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Post", PostSchema);
