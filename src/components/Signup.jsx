import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../Firebase"; // import firebase config
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import "../styles/signup.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import bcrypt from "bcryptjs";
import { serverTimestamp } from "firebase/firestore";

// import { query, where, getDocs } from "firebase/firestore";

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
  });
  const name=formData.firstName
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    // Validation
    if (formData.password !== formData.confirmPassword) {
      toast.error("⚠️ Password Mismatch");
      return;
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const phoneRegex = /^(?:\+91|0)?[6-9]\d{9}$/;

    if (!emailRegex.test(formData.email)) {
      toast.error("Invalid email format");
      return;
    }

    if (!passwordRegex.test(formData.password)) {
      toast.error(
        "Password must have 8+ chars, 1 uppercase, 1 number & 1 special char"
      );
      return;
    }

    if (!phoneRegex.test(formData.mobile)) {
      toast.error("Enter valid 10-digit mobile number");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      const user = userCredential.user;
      const hashedPassword = await bcrypt.hash(formData.password, 10);

      await setDoc(doc(db, "users", user.uid), {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        mobile: formData.mobile,
        password: hashedPassword,
        createdAt: serverTimestamp(), // 👈 Correct way
      });

      toast.success("🎉 Signup successful!");
      navigate("/home",{state:{name}});
    } catch (error) {
      console.error("Signup Error: ", error);
      toast.error("Account Already exists");
    }
  };

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
          maxWidth: "900px",
          width: "100%",
          background: "rgba(255,255,255,0.15)",
          //   boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          border: "1px solid rgba(255, 255, 255, 0.18)",
          zIndex: 1,
        }}
      >
        <h1 className="text-center mb-4 text-white">Create an Account</h1>

        <div className="row g-3">
          {/* Left side */}
          <div className="col-12 col-md-6">
            <input
              type="text"
              name="firstName"
              className="form-control mb-3"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              style={{ borderRadius: "10px", padding: "12px" }}
            />
            <input
              type="text"
              name="lastName"
              className="form-control mb-3"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              style={{ borderRadius: "10px", padding: "12px" }}
            />
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              style={{ borderRadius: "10px", padding: "12px" }}
            />
          </div>

          {/* Right side */}
          <div className="col-12 col-md-6">
            <input
              type="text"
              name="mobile"
              className="form-control mb-3"
              placeholder="Mobile Number"
              value={formData.mobile}
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
            <input
              type="password"
              name="confirmPassword"
              className="form-control"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              style={{ borderRadius: "10px", padding: "12px" }}
            />
          </div>
        </div>

        {/* Center */}
        <div className="text-center mt-4">
          <div className="form-check mb-3 d-flex justify-content-center align-items-center">
            <input type="checkbox" className="form-check-input me-2" />
            <label className="form-check-label text-white">
              Agree with <Link to="#">Terms & Conditions</Link>
            </label>
          </div>
          <p className="mb-3 text-white">
            Already have an account? <Link to="/login">Login</Link>
          </p>
          <button
            onClick={handleSubmit}
            className="btn btn-success btn-lg w-50"
          >
            Sign up
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
