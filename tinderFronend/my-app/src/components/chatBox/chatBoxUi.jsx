import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

const ChatPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { user, connectionId } = state || {}; // Get connectionId from state for the chat

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null); // For auto-scroll to bottom

  // Fetch messages on load
  useEffect(() => {
    if (!user || !connectionId) {
      navigate("/"); // Redirect to home or login if user or connectionId is not found
      return;
    }

    const fetchMessages = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3002/chat/${connectionId}`,
          { withCredentials: true }
        );
        setMessages(
          response.data.messages.map((msg) => ({
            ...msg,
            time: new Date(msg.timestamp).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
          }))
        );
      } catch (error) {
        console.error("Error fetching messages:", error);
        setError("Failed to load messages. Please try again later.");
      }
    };

    fetchMessages();
  }, [user, connectionId]);

  // Scroll to bottom when messages are updated
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return; // Prevent sending empty messages

    try {
      const response = await axios.post(
        `http://localhost:3002/chat/${connectionId}`,
        { message: newMessage },
        { withCredentials: true }
      );

      setMessages([
        ...messages,
        {
          ...response.data.newMessage,
          time: new Date(response.data.newMessage.timestamp).toLocaleTimeString(
            [],
            { hour: "2-digit", minute: "2-digit" }
          ),
        },
      ]);
      setNewMessage(""); // Clear input after sending
    } catch (error) {
      console.error("Error sending message:", error);
      setError("Failed to send message. Please try again.");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  if (!user) return <p className="text-red-500 text-center">{error || "No user selected"}</p>;

  return (
    <div className="flex flex-col h-screen bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300">
      {/* Chat Header */}
      <div className="flex items-center gap-4 bg-gradient-to-r from-[#075e54] to-[#128C7E] p-4 text-white shadow-lg rounded-b-lg">
        <img
          src={user.avatar || "https://via.placeholder.com/150"}
          alt="Profile"
          className="w-12 h-12 rounded-full object-cover"
        />
        <h2 className="text-xl font-semibold">{user.firstName || "User"}</h2>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url("https://cdn.wallpapersafari.com/46/78/exDpS7.jpg")` }}>
        {error && <p className="text-red-500 text-center">{error}</p>}
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex gap-2 items-start mb-3 ${
              msg.fromUserId === user._id ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`p-3 rounded-xl max-w-[75%] text-sm shadow-lg ${
                msg.fromUserId === user._id ? "bg-gradient-to-r from-[#25d366] to-[#128C7E]" : "bg-white"
              }`}
            >
              <p className="text-gray-800">{msg.message}</p>
              <span className="text-xs text-gray-500 block text-right">{msg.time}</span>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} /> {/* Reference for auto-scroll */}
      </div>

      {/* Chat Input */}
      <div className="flex items-center p-4 bg-white border-t border-gray-300 shadow-md rounded-t-lg">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Type a message..."
          className="flex-1 p-3 rounded-full border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400 transition duration-200"
        />
        <button
          onClick={handleSendMessage}
          className={`ml-4 p-3 rounded-full bg-gradient-to-r from-[#25d366] to-[#128C7E] text-white ${
            !newMessage.trim() && "opacity-50 cursor-not-allowed"
          } transition duration-300 transform hover:scale-105`}
          disabled={!newMessage.trim()}
        >
          <FontAwesomeIcon icon={faPaperPlane} />
        </button>
      </div>
    </div>
  );
};

export default ChatPage;
