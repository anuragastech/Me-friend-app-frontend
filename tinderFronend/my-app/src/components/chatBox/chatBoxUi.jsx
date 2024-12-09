import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane, faEllipsisV, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { toast, ToastContainer } from 'react-toastify'; // Correct imports
import 'react-toastify/dist/ReactToastify.css';

const ChatPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { user, connectionId } = state || {}; // Get connectionId from state for the chat

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [error, setError] = useState(null);
  const [wallpaper, setWallpaper] = useState("https://cdn.wallpapersafari.com/46/78/exDpS7.jpg"); // Default wallpaper
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Track menu visibility
  const [showWallpaperOptions, setShowWallpaperOptions] = useState(false); // Track wallpaper options visibility
  const messagesEndRef = useRef(null);

  // Fetch messages on load
  useEffect(() => {
    if (!user || !connectionId) {
      navigate("/"); // Redirect to home or login if user or connectionId is not found
      return;
    }

    const fetchMessages = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/chat/${connectionId}`,
          { withCredentials: true }
        );
        console.log(response.data.messages); // Check if it's an array and contains messages
        if (Array.isArray(response.data.messages)) {
          setMessages(
            response.data.messages.map((msg) => ({
              ...msg,
              time: new Date(msg.timestamp).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              }),
            }))
          );
        } else {
          setError("No messages found.");
        }
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
    if (!newMessage.trim()) return;

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/chat/${connectionId}`,
        { message: newMessage },
        { withCredentials: true }
      );

      setMessages((prevMessages) => [
        ...prevMessages,
        {
          ...response.data.newMessage,
          time: new Date(response.data.newMessage.timestamp).toLocaleTimeString(
            [],
            { hour: "2-digit", minute: "2-digit" }
          ),
        },
      ]);
      setNewMessage("");
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

  // Function to handle Clear Chat (for Premium users only)
  const handleClearChat = () => {
    if (user?.isPremium) {  // Check if user has 'isPremium' flag
      setMessages([]);  // Clear messages for demo purpose
      toast.success("Chat cleared!", {
        position: "bottom-center", // Direct string for position
        autoClose: 3000,
      });
    } else {
      toast.info("Clear Chat is a Premium Feature!", {
        position: "bottom-center", // Direct string for position
        autoClose: 3000,
      });
    }
  };

  const handleWallpaperChange = (wallpaperUrl) => {
    setWallpaper(wallpaperUrl);
    setShowWallpaperOptions(false); // Close the wallpaper options after selection
  };

  const handleOptionsMenu = () => {
    setIsMenuOpen((prevState) => !prevState); // Toggle the menu visibility
  };

  const handleWallpaperMenuClick = () => {
    setShowWallpaperOptions((prevState) => !prevState); // Toggle wallpaper options visibility
  };

  const handleMuteNotifications = () => {
    toast.success("Notifications muted.", {
      position: "bottom-center", // Direct string for position
      autoClose: 3000,
    });
  };

  const handleAddToList = () => {
    toast.success("Added to your list.", {
      position: "bottom-center", // Direct string for position
      autoClose: 3000,
    });
  };

  const handleReport = () => {
    toast.success("Successfully reported.", {
      position: "bottom-center", // Direct string for position
      autoClose: 3000,
    });
  };

  // New function for Search (Dummy feature)
  const handleSearchOption = () => {
    toast.info("Search is a Premium Feature!", {
      position: "bottom-center",
      autoClose: 3000,
    });
  };

  if (!user) return <p className="text-red-500 text-center">{error || "No user selected"}</p>;

  return (
    <div className="flex flex-col h-screen bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300">
      {/* Chat Header */}
      <div className="flex items-center gap-4 bg-gradient-to-r from-[#075e54] to-[#128C7E] p-4 text-white shadow-md rounded-b-lg">
        <FontAwesomeIcon
          icon={faArrowLeft}
          className="cursor-pointer text-2xl"
          onClick={() => navigate("/")} // Back Button Action
        />
        <img
          src={user.image?.url || "https://via.placeholder.com/150"} // Ensure image exists
          alt="Profile"
          className="w-12 h-12 rounded-full object-cover"
        />
        <h2 className="text-xl font-semibold">{user.firstName || "User"}</h2>
        <div className="ml-auto relative">
          <FontAwesomeIcon
            icon={faEllipsisV}
            className="cursor-pointer text-xl"
            onClick={handleOptionsMenu}
          />
          {/* Options Menu */}
          {isMenuOpen && (
            <div id="options-menu" className="absolute top-8 right-0 bg-gray-800 text-white shadow-lg rounded-lg z-10 w-48">
              <ul className="p-2 text-sm">
                <li
                  className="py-2 px-4 cursor-pointer hover:bg-gray-700"
                  onClick={handleClearChat}
                >
                  Clear Chat
                </li>
                <li
                  className="py-2 px-4 cursor-pointer hover:bg-gray-700"
                  onClick={handleWallpaperMenuClick}
                >
                  <p className="font-semibold">Wallpaper</p>
                  {/* Show/Hide Wallpaper Options */}
                  {showWallpaperOptions && (
                    <div className="space-y-2 mt-2">
                      <button
                        onClick={() => handleWallpaperChange("https://cdn.wallpapersafari.com/46/78/exDpS7.jpg")}
                        className="w-full text-left px-2 py-1 hover:bg-gray-600"
                      >
                        Wallpaper 1
                      </button>
                      <button
                        onClick={() => handleWallpaperChange("https://img.freepik.com/premium-vector/cowboy-hand-drawn-seamless-pattern-background_153454-576.jpg")}
                        className="w-full text-left px-2 py-1 hover:bg-gray-600"
                      >
                        Wallpaper 2
                      </button>
                      <button
                        onClick={() => handleWallpaperChange("https://img.pikbest.com/wp/202347/featured-background-social-media-illustration-3d-design-featuring-the-whatsapp-logo_9741920.jpg!w700wp")}
                        className="w-full text-left px-2 py-1 hover:bg-gray-600"
                      >
                        Wallpaper 3
                      </button>
                      <button
                        onClick={() => handleWallpaperChange("https://wallpapershome.com/images/pages/ico_h/26418.jpg")}
                        className="w-full text-left px-2 py-1 hover:bg-gray-600"
                      >
                        Wallpaper 4
                      </button>
                    </div>
                  )}
                </li>
                <li className="py-2 px-4 cursor-pointer hover:bg-gray-700" onClick={handleMuteNotifications}>
                  Mute Notifications
                </li>
                <li className="py-2 px-4 cursor-pointer hover:bg-gray-700" onClick={handleAddToList}>
                  Add to List
                </li>
                <li className="py-2 px-4 cursor-pointer hover:bg-gray-700" onClick={handleReport}>
                  Report
                </li>
                <li className="py-2 px-4 cursor-pointer hover:bg-gray-700" onClick={handleSearchOption}>
                  Search
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Chat Messages */}
      <div
        className="flex-1 overflow-auto p-4 bg-cover"
        style={{ backgroundImage: `url(${wallpaper})` }}
      >
        {error && <p className="text-red-500 text-center">{error}</p>}
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.sender === user.id ? "justify-start" : "justify-start"} mb-4`}>
            <div
              className={`rounded-lg p-2 max-w-[60%] ${msg.sender === user.id ? "bg-green-500 text-white" : "bg-gray-300 text-black"}`}
            >
              <p>{msg.message}</p>
              <span className="text-xs text-gray-500">{msg.time}</span>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="flex items-center p-4 bg-white shadow-md">
        <input
          type="text"
          className="flex-1 p-2 rounded-lg border border-gray-300 focus:outline-none"
          placeholder="Type a message"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button onClick={handleSendMessage} className="ml-4 p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
          <FontAwesomeIcon icon={faPaperPlane} />
        </button>
      </div>

      <ToastContainer />
    </div>
  );
};

export default ChatPage;
