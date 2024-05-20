import mongoose from "mongoose";
import AutoIncrement from "mongoose-sequence";

const CategorySchema = new mongoose.Schema(
  {
    cat_id: {
      type: Number,
    },
    cat_name: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,

      trim: true,
    },
    cat_desc: {
      type: String,
      required: true,
      trim: true,
      uppercase: true,
    },
    create_at: {
      type: Date,
      default: Date.now,
    },
    status:{
      type:Number,
      enum:[0,1],
      default:1
    }
  },
  
);
CategorySchema.plugin(AutoIncrement(mongoose), { inc_field: "cat_id" });
export const Category = mongoose.model("Category", CategorySchema);
