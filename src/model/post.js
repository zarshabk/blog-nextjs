import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    images: {
      type: Array,
    },

    category_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    author_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    views: {
      type: Number,
      default: 0,
    },

    status: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.models.Post || mongoose.model("Post", postSchema);
export default Post;
