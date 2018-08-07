import mongoose from "mongoose";

const EventSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    meta: {
      type: Object,
      required: false,
    },
  },
  { timestamps: true },
);

export default mongoose.model("Event", EventSchema);
