// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "./Profile.css";

// const ProfileData = () => {
//   const [profile, setProfile] = useState({});
//   const [editMode, setEditMode] = useState(false);
//   const [passwordEdit, setPasswordEdit] = useState(false);
//   const [formData, setFormData] = useState({});
//   const [newPassword, setNewPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");

//   // Fetch user profile
//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const response = await axios.get("/profile/view", { withCredentials: true });
//         setProfile(response.data.profileData);
//       } catch (error) {
//         console.error("Error fetching profile:", error);
//       }
//     };

//     fetchProfile();
//   }, []);

//   // Handle input changes for editing
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   // Handle password input change
//   const handlePasswordChange = (e) => {
//     setNewPassword(e.target.value);
//   };

//   // Save updated profile
//   const saveProfile = async () => {
//     try {
//       setLoading(true);
//       const response = await axios.patch("/profile/edit", formData, { withCredentials: true });
//       setMessage(response.data.message);
//       setProfile((prev) => ({ ...prev, ...formData }));
//       setEditMode(false);
//     } catch (error) {
//       console.error("Error updating profile:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Save new password
//   const savePassword = async () => {
//     try {
//       setLoading(true);
//       const response = await axios.patch("/profile/password/edit", { password: newPassword }, { withCredentials: true });
//       setMessage(response.data.message);
//       setPasswordEdit(false);
//     } catch (error) {
//       console.error("Error updating password:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div>
//       <div className="profile-container">
//         <h1>Your Profile</h1>

//         {message && <p className="message">{message}</p>}

//         <div className="profile-card">
//           {/* Animated Profile Picture */}
//           <div className="profile-image-container">
//             <img
//               src={profile.image || "https://png.pngtree.com/png-vector/20240131/ourlarge/pngtree-man-profile-account-picture-character-png-image_11577305.png"} // Fallback image if no profile image is provided
//               alt={profile.firstName}
//               className="profile-image"
//             />
//           </div>

//           {editMode ? (
//             <div className="profile-edit-form">
//               <label>
//                 First Name:
//                 <input type="text" name="firstName" defaultValue={profile.firstName} onChange={handleChange} />
//               </label>
//               <label>
//                 Last Name:
//                 <input type="text" name="lastName" defaultValue={profile.lastName} onChange={handleChange} />
//               </label>
//               <label>
//                 Email:
//                 <input type="email" name="email" defaultValue={profile.email} onChange={handleChange} />
//               </label>
//               <button onClick={saveProfile} disabled={loading}>
//                 {loading ? "Saving..." : "Save Changes"}
//               </button>
//               <button onClick={() => setEditMode(false)}>Cancel</button>
//             </div>
//           ) : (
//             <div className="profile-info">
//               <p><strong>First Name:</strong> {profile.firstName}</p>
//               <p><strong>Last Name:</strong> {profile.lastName}</p>
//               <p><strong>Email:</strong> {profile.email}</p>
//               <button onClick={() => setEditMode(true)}>Edit Profile</button>
//             </div>
//           )}

//           {passwordEdit ? (
//             <div className="password-edit-form">
//               <label>
//                 New Password:
//                 <input type="password" onChange={handlePasswordChange} />
//               </label>
//               <button onClick={savePassword} disabled={loading}>
//                 {loading ? "Updating..." : "Update Password"}
//               </button>
//               <button onClick={() => setPasswordEdit(false)}>Cancel</button>
//             </div>
//           ) : (
//             <button onClick={() => setPasswordEdit(true)}>Change Password</button>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProfileData;


// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import Navbar from "../navbar/navbar";
// import "./Profile.css";

// const Profile = () => {
//   const [profile, setProfile] = useState({});
//   const [editMode, setEditMode] = useState(false);
//   const [passwordEdit, setPasswordEdit] = useState(false);
//   const [formData, setFormData] = useState({});
//   const [newPassword, setNewPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");

//   // Fetch user profile
//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const response = await axios.get("/profile/view", { withCredentials: true });
//         setProfile(response.data.profileData);
//       } catch (error) {
//         console.error("Error fetching profile:", error);
//       }
//     };

//     fetchProfile();
//   }, []);

//   // Handle input changes for editing
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   // Handle password input change
//   const handlePasswordChange = (e) => {
//     setNewPassword(e.target.value);
//   };

//   // Save updated profile
//   const saveProfile = async () => {
//     try {
//       setLoading(true);
//       const response = await axios.patch("/profile/edit", formData, { withCredentials: true });
//       setMessage(response.data.message);
//       setProfile((prev) => ({ ...prev, ...formData }));
//       setEditMode(false);
//     } catch (error) {
//       console.error("Error updating profile:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Save new password
//   const savePassword = async () => {
//     try {
//       setLoading(true);
//       const response = await axios.patch("/profile/password/edit", { password: newPassword }, { withCredentials: true });
//       setMessage(response.data.message);
//       setPasswordEdit(false);
//     } catch (error) {
//       console.error("Error updating password:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div>
//       <Navbar />
//       <div className="profile-container">
//         <h1>Your Profile</h1>

//         {message && <p className="message">{message}</p>}

//         <div className="profile-card">
//           {/* Animated Profile Picture */}
//           <div className="profile-image-container">
//             <img
//               src={profile.image || "https://via.placeholder.com/150"} // Fallback image if no profile image is provided
//               alt={profile.firstName}
//               className="profile-image"
//             />
//           </div>

//           {editMode ? (
//             <div className="profile-edit-form">
//               <label>
//                 First Name:
//                 <input type="text" name="firstName" defaultValue={profile.firstName} onChange={handleChange} />
//               </label>
//               <label>
//                 Last Name:
//                 <input type="text" name="lastName" defaultValue={profile.lastName} onChange={handleChange} />
//               </label>
//               <label>
//                 Email:
//                 <input type="email" name="email" defaultValue={profile.email} onChange={handleChange} />
//               </label>
//               <button onClick={saveProfile} disabled={loading}>
//                 {loading ? "Saving..." : "Save Changes"}
//               </button>
//               <button onClick={() => setEditMode(false)}>Cancel</button>
//             </div>
//           ) : (
//             <div className="profile-info">
//               <p><strong>First Name:</strong> {profile.firstName}</p>
//               <p><strong>Last Name:</strong> {profile.lastName}</p>
//               <p><strong>Email:</strong> {profile.email}</p>
//               <button onClick={() => setEditMode(true)}>Edit Profile</button>
//             </div>
//           )}

//           {passwordEdit ? (
//             <div className="password-edit-form">
//               <label>
//                 New Password:
//                 <input type="password" onChange={handlePasswordChange} />
//               </label>
//               <button onClick={savePassword} disabled={loading}>
//                 {loading ? "Updating..." : "Update Password"}
//               </button>
//               <button onClick={() => setPasswordEdit(false)}>Cancel</button>
//             </div>
//           ) : (
//             <button onClick={() => setPasswordEdit(true)}>Change Password</button>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Profile;

