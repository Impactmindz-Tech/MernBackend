import mongoose from "mongoose";

import AutoIncrement from "mongoose-sequence";
const ProductSchema = new mongoose.Schema({
  p_id: {
    type: Number,
  },
  cat_id: {
    type: Number,
  },
  cat_name: {
    type: String,
  },
  user_id: {
    type: Number,
  },
  p_image: {
    type: String,
  },
  p_name: {
    type: String,
    required: true,
    uppercase: true,
  },

  p_desc: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  type: {
    type: String,
  },
  status: {
    type: Number,
    enum: [0, 1],
    default: 1,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

ProductSchema.plugin(AutoIncrement(mongoose), { inc_field: "p_id" });
export const Product = mongoose.model("Product", ProductSchema);
