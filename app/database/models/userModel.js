import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    fathersName: { type: String, required: true },
    school: { type: String, required: true },
    className: { type: String, required: true },
    roll: { type: Number, required: true, unique: true },
    email: { type: String, unique: true, required: true },
    contact: { type: String, unique: true, required: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.user || mongoose.model("user", UserSchema);
