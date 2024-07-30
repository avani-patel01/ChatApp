import { Message } from "../Models/MessageModel.js";

export const saveMessage = async (data) => {
  try {
    const message = new Message(data);

    const savedMsg = await message.save();
    return savedMsg;
  } catch (error) {
    console.error("Error in saveMessage:", error);
    throw error;
  }
};

export const getMessages = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "User Id required." });
    }
    const message = await Message.find({
      $or: [{ "sender.id": id }, { "receiver.id": id }],
    });
    res.status(200).json(message);
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
    });
  }
};

export const deleteMessage = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "User Id required." });
    }
    const delMessage = await Message.findByIdAndDelete(id);
    res.status(200).json({ data: delMessage });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
    });
  }
};
