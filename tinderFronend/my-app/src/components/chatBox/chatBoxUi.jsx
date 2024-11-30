import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./ChatBox.css";
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

  if (!user) return <p className="error">No user selected</p>;

  return (
    <div className="chat-page">
      {/* Chat Header */}
      <div className="chat-header">
        <img
          src={user.avatar || "https://via.placeholder.com/150"}
          alt="Profile"
          className="user-avatar"
        />
        <h2>{user.firstName || "User"}</h2>
      </div>

      {/* Chat Messages */}
      <div className="chat-messages">
        {error && <p className="error">{error}</p>}
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message ${msg.fromUserId === user._id ? "sent" : "received"}`}
          >
            <span className="message-text">{msg.message}</span>
            <span className="message-time">{msg.time}</span>
          </div>
        ))}
        <div ref={messagesEndRef} /> {/* Reference for auto-scroll */}
      </div>

      {/* Chat Input */}
      <div className="chat-input">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
        />
        <button
          onClick={handleSendMessage}
          className="send-button"
          disabled={!newMessage.trim()}
        >
          <FontAwesomeIcon icon={faPaperPlane} />
        </button>
      </div>
    </div>
  );
};

export default ChatPage;
