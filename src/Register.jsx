import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function Register({ onClose, onSwitchToLogin }) {
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
    repassword: "",
    phone: ""
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const { fname, lname, email, password, repassword, phone } = formData;

    if (!fname || !lname || !email || !password || !repassword || !phone) {
      setError("Please fill in all fields.");
      return;
    }

    if (password !== repassword) {
      setError("Passwords do not match.");
      return;
    }
    if (password.length < 8){
      setError("Password must be at least 8 characters")
      return;
    }

    try {
      const check = await axios.get(`http://localhost:3001/users?email=${email}`);
      if (check.data.length > 0) {
        setError("This email is already registered.");
        return;
      }

      await axios.post("http://localhost:3001/users", {
        name: `${fname} ${lname}`,
        email,
        password,
        phone
      });
      toast.success("Registration successful!");
      onSwitchToLogin(); 
    } catch (err) {
      console.error(err);
      toast.error("حدث خطأ أثناء عملية التسجيل.");
    }
  };

  return (
    <div className="overlay">
      <div className="register">
        <button className="close-btn" onClick={onClose}>×</button>
        <form onSubmit={handleSubmit}>
          <h2>Sign Up</h2>
          <p>If you already have an account, you can:</p>
          <div>
            <button type="button" className="switch-btn" onClick={onSwitchToLogin}>
              Login here
            </button>
          </div>

          <label htmlFor="fname">First Name:</label>
          <input id="fname" type="text" placeholder="Enter your first name" onChange={handleChange} />

          <label htmlFor="lname">Last Name:</label>
          <input id="lname" type="text" placeholder="Enter your last name" onChange={handleChange} />

          <label htmlFor="email">Email:</label>
          <input id="email" type="email" placeholder="Enter your email address" onChange={handleChange} />

          <label htmlFor="password">Password:</label>
          <input id="password" type="password" placeholder="Enter your password" onChange={handleChange} />

          <label htmlFor="repassword">Confirm Password:</label>
          <input id="repassword" type="password" placeholder="Confirm your password" onChange={handleChange} />

          <label htmlFor="phone">Phone Number:</label>
          <input id="phone" type="text" placeholder="Enter your phone number" onChange={handleChange} />

          {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}

          <div className="btn">
            <button type="submit">Register</button>
          </div>
        </form>
      </div>
    </div>
  );
}
