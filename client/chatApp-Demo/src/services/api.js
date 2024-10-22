import axios from "axios";

export const sendMessage = async (messageData) => {
  return axios.post("http://localhost:5000/api/messages", messageData);
};

export const getMessages = async (chatId) => {
  return axios.get(`http://localhost:5000/api/messages/${chatId}`);
};
