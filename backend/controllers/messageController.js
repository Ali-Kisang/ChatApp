const Message = require("../models/Message");

exports.sendMessage = async (req, res) => {
  const { chatId, sender, receiver, message } = req.body;

  const newMessage = new Message({ chatId, sender, receiver, message });
  try {
    const savedMessage = await newMessage.save();
    res.status(200).json(savedMessage);
  } catch (error) {
    res.status(500).json({ message: "Error sending message" });
  }
};

exports.getMessages = async (req, res) => {
  try {
    const messages = await Message.find({ chatId: req.params.chatId });
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving messages" });
  }
};
