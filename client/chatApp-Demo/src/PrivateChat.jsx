import { useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:5000");

function PrivateChat({ match }) {
  const chatId = match.params.chatId;
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.emit("joinRoom", chatId);

    socket.on("receiveMessage", (newMessage) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    return () => {
      socket.emit("leaveRoom", chatId);
    };
  }, [chatId]);

  const sendMessage = () => {
    if (message.trim()) {
      socket.emit("sendMessage", { chatId, sender: "userId", message });
      setMessage("");
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
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
          onKeyPress={(e) => e.key === "Enter" && sendMessage()}
        />
      </div>
    </div>
  );
}

export default PrivateChat;
