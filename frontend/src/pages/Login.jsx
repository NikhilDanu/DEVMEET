import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";
import {login} from "../api/api";

const Login = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await login(form);
    const user = res.data.user;

    localStorage.setItem("token", res.data.token);
    localStorage.setItem("user", JSON.stringify(user));

    alert("Login successfully");

    if (user.role === "admin") {
      navigate("/createHackathon");
    } else {
      navigate("/");
    }

  } catch (error) {
    alert(error.response?.data?.message || "Login failed");
  }
};

  return (
    <div className="container">
      <div className="card">
        <h2>Login</h2>
        <p>Welcome back 👋</p>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Enter email"
            value={form.email}
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Enter password"
            value={form.password}
            onChange={handleChange}
          />

          <button type="submit">Login</button>
        </form>

        <p className="switch">
          Don't have an account?
          <span onClick={() => navigate("/signup")}>Signup</span>
        </p>
      </div>
    </div>
  );
};

export default Login;