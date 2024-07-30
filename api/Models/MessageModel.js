import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema(
  {
    msg: { type: String },
    receiver: {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
      },
      name: { type: String, required: true },
      email: {
        type: String,
        required: true,
      },
    },
    sender: {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
      },
      name: { type: String, required: true },
      email: {
        type: String,
        required: true,
      },
    },
    replyMessage: {},
  },
  {
    toJSON: {
      transform: (doc, ret) => {
        delete ret.__v;
        return ret;
      },
    },
  },
  { timestamps: true }
);

export const Message = mongoose.model("messages", MessageSchema);
