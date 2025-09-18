import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import { db } from "../Firebase"; // import firebase config
// import { collection, query, where, getDocs } from "firebase/firestore";
// import bcrypt from "bcryptjs";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../Firebase";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("⚠️ Invalid email format");
      return;
    }

    try {
      // Login with Firebase Authentication
      const userCredential = await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      const user = userCredential.user;

      // Optional: Save user info in localStorage
      localStorage.setItem(
        "user",
        JSON.stringify({
          uid: user.uid,
          email: user.email,
        })
      );

      toast.success("✅ Login successful!");
      navigate("/home");
    } catch (error) {
      console.error("Login error:", error);
      if (error.code === "auth/user-not-found") {
        toast.error("❌ No user found with this email");
      } else if (error.code === "auth/wrong-password") {
        toast.error("❌ Incorrect password");
      } else {
        toast.error("😭 Something went wrong");
      }
    }
  };

  // Generate random stars (same as signup)
  const starCount = 150;
  const stars = Array.from({ length: starCount }, () => ({
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    size: `${Math.random() * 2 + 1}px`,
    opacity: Math.random(),
    duration: `${2 + Math.random() * 3}s`,
  }));

  return (
    <div className="animated-background d-flex justify-content-center align-items-center flex-column">
      {/* Stars */}
      {stars.map((star, idx) => (
        <div
          key={idx}
          style={{
            position: "absolute",
            top: star.top,
            left: star.left,
            width: star.size,
            height: star.size,
            backgroundColor: `rgba(255,255,255,${star.opacity})`,
            borderRadius: "50%",
            pointerEvents: "none",
            animation: `twinkle ${star.duration} infinite alternate`,
            zIndex: 0,
          }}
        />
      ))}

      {/* Glass Card */}
      <div
        className="p-5 rounded-4"
        style={{
          maxWidth: "500px",
          width: "100%",
          background: "rgba(255,255,255,0.15)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          border: "1px solid rgba(255, 255, 255, 0.18)",
          zIndex: 1,
        }}
      >
        <h1 className="text-center mb-4 text-white">Welcome Back</h1>

        <input
          type="email"
          name="email"
          className="form-control mb-3"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          style={{ borderRadius: "10px", padding: "12px" }}
        />
        <input
          type="password"
          name="password"
          className="form-control mb-3"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          style={{ borderRadius: "10px", padding: "12px" }}
        />

        <div className="text-center mt-4">
          <p className="mb-3 text-white">
            Don’t have an account? <Link to="/">Sign Up</Link>
          </p>
          <button onClick={handleLogin} className="btn btn-success btn-lg w-50">
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
