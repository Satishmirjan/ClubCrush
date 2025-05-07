import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

function Register() {
  const { isAuthenticated, setIsAuthenticated, setProfile } = useAuth();

  const navigateTo = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [club, setClub] = useState("");
  const [photo, setPhoto] = useState("");
  const [photoPreview, setPhotoPreview] = useState("");

  const changePhotoHandler = (e) => {
    console.log(e);
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setPhotoPreview(reader.result);
      setPhoto(file);
    };
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    
    if (!name || !email || !phone || !password || !role || !club || !photo) {
      toast.error("Please fill all fields and upload a photo");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("password", password);
    formData.append("role", role);
    formData.append("club", club);
    formData.append("photo", photo);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/register`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      
      if (response && response.data) {
        toast.success(response.data.message || "Registration successful");
        setProfile(response.data.user);
        setIsAuthenticated(true);
        setName("");
        setEmail("");
        setPhone("");
        setPassword("");
        setRole("");
        setClub("");
        setPhoto("");
        setPhotoPreview("");
        navigateTo("/");
      }
    } catch (error) {
      console.error("Registration error:", error);
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        if (error.response.status === 400) {
          toast.error(error.response.data.message || "Please check your input");
        } else if (error.response.status === 500) {
          toast.error("Server error. Please try again later");
        } else {
          toast.error(error.response.data.message || "Registration failed");
        }
      } else if (error.request) {
        // The request was made but no response was received
        toast.error("No response from server. Please check your connection");
      } else {
        // Something happened in setting up the request that triggered an Error
        toast.error("An error occurred during registration");
      }
    }
  };

  return (
    <div>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="w-full max-w-md bg-white shadow-md rounded-lg p-8">
          <form onSubmit={handleRegister}>
            <div className="font-semibold text-xl items-center text-center">
              CAMPUS<span className="text-blue-500">BUZZ</span>
            </div>
            <h1 className="text-xl font-semibold mb-6">Register</h1>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full p-2 mb-4 border rounded-md"
            >
              <option value="">Select Role</option>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
            <div className="mb-4">
              <input
                type="text"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2  border rounded-md"
              />
            </div>
            <div className="mb-4">
              <input
                type="email"
                placeholder="Your Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2  border rounded-md"
              />
            </div>
            <div className="mb-4">
              <input
                type="number"
                placeholder="Your Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full p-2  border rounded-md"
              />
            </div>
            <div className="mb-4">
              <input
                type="password"
                placeholder="Your Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2  border rounded-md"
              />
            </div>
            <select
              value={club}
              onChange={(e) => setClub(e.target.value)}
              className="w-full p-2 mb-4 border rounded-md"
            >
              <option value="">Select Your Club or Favourite Club</option>
              <option value="CSI">CSI</option>
              <option value="LCC">LCC</option>
              <option value="IEEE">IEEE</option>
              <option value="DSC">DSC</option>
              <option value="SAHAS">SAHAS</option>
            </select>
            <div className="flex items-center mb-4">
              <div className="photo w-20 h-20 mr-4">
                <img
                  src={photoPreview ? `${photoPreview}` : "photo"}
                  alt="photo"
                />
              </div>
              <input
                type="file"
                onChange={changePhotoHandler}
                className="w-full p-2  border rounded-md"
              />
            </div>
            <p className="text-center mb-4">
              Already registered?{" "}
              <Link to={"/login"} className="text-blue-600">
                Login Now
              </Link>
            </p>
            <button
              type="submit"
              className="w-full p-2 bg-blue-500 hover:bg-blue-800 duration-300 rounded-md text-white"
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
