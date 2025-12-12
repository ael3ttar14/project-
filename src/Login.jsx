import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function Login({ onClose, onSwitchToRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [generalError, setGeneralError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setEmailError("");
    setPasswordError("");
    setGeneralError("");

    if (!email.trim()) {
      setEmailError("Please enter your email");
      return;
    }
    if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters");
      return;
    }

    try {
      const res = await axios.get(
        `http://localhost:3001/users?email=${email}&password=${password}`
      );
      const data = res.data;

      if (data.length > 0) {
        localStorage.setItem("user", JSON.stringify(data[0]));

        onClose();
        toast.success("Login successful!");
      } else {
        setGeneralError("incorrect email or password");
      }
    } catch (err) {
      console.error(err);
      setGeneralError("حدث خطأ أثناء محاولة تسجيل الدخول.");
    }
  };

  return (
    <div className="overlay">
      <div className="login">
        <button className="close-btn" onClick={onClose}>
          ×
        </button>
        <form onSubmit={handleLogin}>
          <h2>Sign In</h2>
          <p>If you don’t have an account, you can:</p>
          <div>
            <button
              type="button"
              className="switch-btn"
              onClick={onSwitchToRegister}
            >
              Register here!
            </button>
          </div>

          <label>Email:</label>
          <input
            id="email"
            type="email"
            placeholder="Please enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {emailError && (
            <p style={{ color: "red", fontSize: "14px", marginTop: "5px" }}>
              {emailError}
            </p>
          )}

          <label>Password:</label>
          <input
            id="password"
            type="password"
            placeholder="Please enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {passwordError && (
            <p style={{ color: "red", fontSize: "14px", marginTop: "5px" }}>
              {passwordError}
            </p>
          )}

          {generalError && (
            <p style={{ color: "red", fontSize: "15px", marginTop: "10px" }}>
              {generalError}
            </p>
          )}

          <div className="btn">
            <button type="submit">Login</button>
          </div>
        </form>
      </div>
    </div>
  );
}
