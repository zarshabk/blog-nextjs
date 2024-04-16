import mongoose from "mongoose";

const catSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },

    status: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);
const Category =
  mongoose.models.Category || mongoose.model("Category", catSchema);

export default Category;
