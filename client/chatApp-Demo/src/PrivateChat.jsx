import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import io from "socket.io-client";
import { sendMessage, getMessages } from "./services/api";

const socket = io("http://localhost:5000");

function PrivateChat() {
  const { chatId } = useParams();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  console.log(chatId);

  useEffect(() => {
    // Fetch the chat history when the component mounts
    const fetchMessages = async () => {
      try {
        const response = await getMessages(chatId);
        setMessages(response.data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();
    socket.emit("joinRoom", chatId);

    // Listen for new incoming messages
    socket.on("receiveMessage", (newMessage) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    return () => {
      socket.emit("leaveRoom", chatId); // Leave the room on unmount
    };
  }, [chatId]);

  const handleSendMessage = async () => {
    if (message.trim()) {
      try {
        await sendMessage({ chatId, sender: "userId", message }); // Sending message to API
        socket.emit("sendMessage", { chatId, sender: "userId", message });
        setMessage(""); // Clear the input field after sending
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  };

  return (
    <div className="flex flex-col  bg-gray-100">
      <div className="flex-grow overflow-y-auto p-4 bg-white shadow-lg rounded-md">
        {messages.map((msg, index) => (
          <div key={index} className="mb-2">
            <span className="font-bold text-blue-600">{msg.sender}:</span>
            <span className="ml-2">{msg.message}</span>
          </div>
        ))}
      </div>
      <div className="p-4 bg-gray-200">
        <input
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="text"
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSendMessage()} // Updated to onKeyDown
        />
      </div>
    </div>
  );
}

export default PrivateChat;
