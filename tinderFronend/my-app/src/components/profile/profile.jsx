import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../navbar/navbar";
import "./Profile.css";

const Profile = () => {
  const [profile, setProfile] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [imageFile, setImageFile] = useState(null); // State to store the selected image
  const [isImageUploadVisible, setIsImageUploadVisible] = useState(false); // State for toggling image upload form visibility
  const [passwordFormVisible, setPasswordFormVisible] = useState(false); // State to show password change form
  const [newPassword, setNewPassword] = useState(""); // State to store the new password

  // Fetch user profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get("/profile/view", { withCredentials: true });
        setProfile(response.data.profileData);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Save updated profile details
  const saveProfile = async () => {
    try {
      setLoading(true);
      const response = await axios.patch("/profile/edit", formData, { withCredentials: true });
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

  // Save new profile image
  const saveProfileImage = async () => {
    if (!imageFile) {
      setMessage("Please select an image to upload.");
      return;
    }

    try {
      setLoading(true);
      const imageFormData = new FormData();
      imageFormData.append("image", imageFile);

      const response = await axios.patch("/profile/image", imageFormData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });

      setMessage(response.data.message);
      setProfile((prev) => ({ ...prev, image: response.data.image })); // Update profile with new image
      setIsImageUploadVisible(false); // Hide the upload section after successful upload
    } catch (error) {
      console.error("Error uploading profile image:", error);
      setMessage(error.response?.data?.error || "Failed to upload image.");
    } finally {
      setLoading(false);
    }
  };

  // Handle image selection
  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  // Handle password update
  const handlePasswordUpdate = async () => {
    try {
      setLoading(true);
      const response = await axios.patch("/profile/password/edit", { password: newPassword }, { withCredentials: true });

      setMessage(response.data.message); // Success message
      setPasswordFormVisible(false); // Hide password form after successful update
      setNewPassword(""); // Clear the password field
    } catch (error) {
      console.error("Error updating password:", error);
      setMessage(error.response?.data?.error || "Failed to update password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="profile-container">
        <h1>Your Profile</h1>

        {message && <p className="message">{message}</p>}

        <div className="profile-card">
          {/* Profile Image Section */}
          <div className="profile-image-container">
            <img
              src={profile.image || "https://via.placeholder.com/150"} // Default image if no profile picture exists
              alt="Profile"
              className="profile-image"
            />
            <div className="upload-image">
              {/* Single button for adding or updating image */}
              <button onClick={() => setIsImageUploadVisible(true)}>
                {profile.image ? "Update Image" : "Add Image"}
              </button>

              {/* Show the file input and save button if the upload form is visible */}
              {isImageUploadVisible && (
                <>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    style={{ display: "block", margin: "10px 0" }}
                  />
                  <button onClick={saveProfileImage} disabled={loading}>
                    {loading ? "Uploading..." : "Save Image"}
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Profile Information */}
          {editMode ? (
            <div className="profile-edit-form">
              <label>
                First Name:
                <input
                  type="text"
                  name="firstName"
                  defaultValue={profile.firstName}
                  onChange={handleChange}
                />
              </label>
              <label>
                Last Name:
                <input
                  type="text"
                  name="lastName"
                  defaultValue={profile.lastName}
                  onChange={handleChange}
                />
              </label>
              <label>
                Email:
                <input
                  type="email"
                  name="email"
                  defaultValue={profile.email}
                  onChange={handleChange}
                />
              </label>
              <button onClick={saveProfile} disabled={loading}>
                {loading ? "Saving..." : "Save Changes"}
              </button>
              <button onClick={() => setEditMode(false)}>Cancel</button>
            </div>
          ) : (
            <div className="profile-info">
              <p><strong>First Name:</strong> {profile.firstName}</p>
              <p><strong>Last Name:</strong> {profile.lastName}</p>
              <p><strong>Email:</strong> {profile.email}</p>
              <button onClick={() => setEditMode(true)}>Edit Profile</button>
            </div>
          )}

          {/* Update Password Section */}
          <div className="update-password-section">
            {passwordFormVisible ? (
              <>
                <label>
                  New Password:
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </label>
                <button onClick={handlePasswordUpdate} disabled={loading}>
                  {loading ? "Updating..." : "Update Password"}
                </button>
                <button onClick={() => setPasswordFormVisible(false)}>Cancel</button>
              </>
            ) : (
              <button onClick={() => setPasswordFormVisible(true)}>Update Password</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
