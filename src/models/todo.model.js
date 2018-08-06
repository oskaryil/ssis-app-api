import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

const TodoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      min: 3,
    },
    dueDate: {
      type: Date,
      required: false,
    },
    done: {
      type: Boolean,
      required: true,
      default: false,
    },
    createdBy: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

TodoSchema.plugin(uniqueValidator);

export default mongoose.model("Todo", TodoSchema);
