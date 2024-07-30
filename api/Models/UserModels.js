import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  {
    toJSON: {
      transform: (doc, ret) => {
        delete ret.__v;
        delete ret._id;
        delete ret.password;
        return ret;
      },
    },
  },
  { timestamps: true }
);

export const User = mongoose.model("users", UserSchema);
