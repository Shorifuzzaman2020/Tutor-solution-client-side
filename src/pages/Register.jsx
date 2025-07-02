
import React, { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase.init";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useUser } from "../UserContext";  


const Register = () => {
  
  const { setIsLoggedIn } = useUser();  
  const [formData, setFormData] = useState({ name: "", email: "", photoURL: "", password: "" });
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validatePassword = (password) => {
    return /[A-Z]/.test(password) && /[a-z]/.test(password) && password.length >= 6;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!validatePassword(formData.password)) {
      setError("Password must have at least one uppercase, one lowercase letter, and be at least 6 characters long.");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      await updateProfile(userCredential.user, { displayName: formData.name, photoURL: formData.photoURL });

      setSuccessMessage("Successfully registered! Please log in.");
      setError(""); 
      setFormData({ name: "", email: "", photoURL: "", password: "" });

      setIsLoggedIn(false);

      setTimeout(() => {
        navigate("/login"); 
      }, 2000);
    } catch (err) {
      setError("Registration failed. Please try again.");
      setSuccessMessage(""); 
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-600 text-white p-6">
      <div className="bg-white text-black p-8 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center mb-4">Register</h2>
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        {successMessage && <p className="text-green-500 text-sm text-center">{successMessage}</p>}
        <form onSubmit={handleRegister} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Name"
            onChange={handleChange}
            value={formData.name}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            value={formData.email}
            className="w-full p-2 border rounded"
            required
          />
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              onChange={handleChange}
              value={formData.password}
              className="w-full p-2 border rounded"
              required
            />
            <div
              className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-700"
          >
            Register
          </button>
        </form>
        <p className="text-center mt-4 text-gray-600">
          Already have an account? <a href="/login" className="text-blue-500 hover:underline">Login</a>
        </p>
      </div>
    </div>
  );
};

export default Register;

// //WORKING CODE