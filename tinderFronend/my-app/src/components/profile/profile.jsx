import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../navbar/navbar";

const Profile = () => {
  const [profile, setProfile] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [isImageUploadVisible, setIsImageUploadVisible] = useState(false);
  const [passwordFormVisible, setPasswordFormVisible] = useState(false);
  const [newPassword, setNewPassword] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/profile/view`, { withCredentials: true });
        setProfile(response.data.profileData);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const saveProfile = async () => {
    try {
      setLoading(true);
      const response = await axios.patch(`${process.env.REACT_APP_API_URL}/profile/edit`, formData, { withCredentials: true });
      setMessage(response.data.message);
      setProfile((prev) => ({ ...prev, ...formData }));
      setEditMode(false);
    } catch (error) {
      console.error("Error updating profile:", error);
      setMessage("Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  const saveProfileImage = async () => {
    if (!imageFile) {
      setMessage("Please select an image to upload.");
      return;
    }

    try {
      setLoading(true);
      const imageFormData = new FormData();
      imageFormData.append("image", imageFile);

      const response = await axios.patch(`${process.env.REACT_APP_API_URL}/profile/image`, imageFormData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });

      setMessage(response.data.message);
      setProfile((prev) => ({ ...prev, image: response.data.image }));
      setIsImageUploadVisible(false);
    } catch (error) {
      console.error("Error uploading profile image:", error);
      setMessage(error.response?.data?.error || "Failed to upload image.");
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handlePasswordUpdate = async () => {
    try {
      setLoading(true);
      const response = await axios.patch(
        `${process.env.REACT_APP_API_URL}/profile/password/edit`,
        { password: newPassword },
        { withCredentials: true }
      );
      setMessage(response.data.message);
      setPasswordFormVisible(false);
      setNewPassword("");
    } catch (error) {
      console.error("Error updating password:", error);
      setMessage(error.response?.data?.error || "Failed to update password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center py-6 px-4">
      <Navbar />
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-xl p-8 space-y-6 mt-8 w-full sm:w-3/4 md:w-2/3">
        <h1 className="text-3xl font-semibold text-center text-gray-800">Your Profile</h1>

        {message && <p className="text-green-600 text-center font-semibold">{message}</p>}

        <div className="flex flex-col items-center">
          {/* Profile Image Section */}
          <div className="relative">
            <img
              src={profile?.image?.url || "https://via.placeholder.com/150"} 
              alt="Profile"
              className="w-32 h-32 rounded-full border-4 border-purple-600 shadow-lg object-cover"
            />
            <button
              onClick={() => setIsImageUploadVisible(!isImageUploadVisible)}
              className="absolute bottom-0 right-0 bg-purple-600 text-white p-2 rounded-full shadow-md transform hover:scale-110 transition duration-200"
            >
              {isImageUploadVisible ? "Cancel" : profile.image ? "Update Image" : "Add Image"}
            </button>
            {isImageUploadVisible && (
              <div className="mt-4 space-y-2">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
                <button
                  onClick={saveProfileImage}
                  disabled={loading}
                  className="w-full p-2 bg-purple-600 text-white rounded-lg disabled:opacity-50 hover:bg-purple-700 transition duration-200"
                >
                  {loading ? "Uploading..." : "Save Image"}
                </button>
              </div>
            )}
          </div>

          {/* Profile Info */}
          {editMode ? (
            <div className="space-y-4 mt-6">
              <label className="block text-gray-700">First Name:</label>
              <input
                type="text"
                name="firstName"
                defaultValue={profile.firstName}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-600"
              />
              <label className="block text-gray-700">Last Name:</label>
              <input
                type="text"
                name="lastName"
                defaultValue={profile.lastName}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-600"
              />
              <label className="block text-gray-700">Email:</label>
              <input
                type="email"
                name="email"
                defaultValue={profile.email}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-600"
              />
              <div className="flex space-x-4">
                <button
                  onClick={saveProfile}
                  disabled={loading}
                  className="w-1/2 bg-purple-600 text-white p-3 rounded-lg disabled:opacity-50 hover:bg-purple-700 transition duration-200"
                >
                  {loading ? "Saving..." : "Save Changes"}
                </button>
                <button
                  onClick={() => setEditMode(false)}
                  className="w-1/2 bg-gray-400 text-white p-3 rounded-lg disabled:opacity-50 hover:bg-gray-500 transition duration-200"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4 mt-6">
              <p><strong>First Name:</strong> {profile.firstName}</p>
              <p><strong>Last Name:</strong> {profile.lastName}</p>
              <p><strong>Email:</strong> {profile.email}</p>
              <button
                onClick={() => setEditMode(true)}
                className="mt-4 bg-purple-600 text-white p-3 rounded-lg shadow-md hover:bg-purple-700 transition duration-200"
              >
                Edit Profile
              </button>
            </div>
          )}

          {/* Password Update */}
          <div className="mt-6">
            {passwordFormVisible ? (
              <div className="space-y-4">
                <label className="block text-gray-700">New Password:</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
                <div className="flex space-x-4">
                  <button
                    onClick={handlePasswordUpdate}
                    disabled={loading}
                    className="w-1/2 bg-purple-600 text-white p-3 rounded-lg disabled:opacity-50 hover:bg-purple-700 transition duration-200"
                  >
                    {loading ? "Updating..." : "Update Password"}
                  </button>
                  <button
                    onClick={() => setPasswordFormVisible(false)}
                    className="w-1/2 bg-gray-400 text-white p-3 rounded-lg disabled:opacity-50 hover:bg-gray-500 transition duration-200"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => setPasswordFormVisible(true)}
                className="bg-purple-600 text-white p-3 rounded-lg shadow-md hover:bg-purple-700 transition duration-200"
              >
                Update Password
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
