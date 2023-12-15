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
    ,
    author_id : {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Post must have the Author Id"]
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Post", PostSchema);
