import mongoose from "mongoose";

const ResultSchema = new mongoose.Schema(
  {
    userName: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    maths: {
      type: Number,
      required: true,
    },
    science: {
      type: Number,
      required: true,
    },
    sst: {
      type: Number,
      required: true,
    },
    english: {
      type: Number,
      required: true,
    },
    hindi: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Result || mongoose.model("Result", ResultSchema);
