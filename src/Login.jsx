import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import BubbleChat from "./BubbleChat";

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (username === "admin" && password === "admin") {
      onLogin("admin");
      navigate("/admin");
    } else if (username === "customer" && password === "customer") {
      onLogin("customer");
      navigate("/customer");
    } else {
      alert("Invalid username or password");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-r from-blue-400 to-purple-500">
      <Navbar />

      <div className="bg-white p-8 items-center  rounded shadow-md m-20">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <label className="block mb-2">
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border p-2 w-full"
          />
        </label>
        <label className="block mb-4">
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border p-2 w-full"
          />
        </label>
        <button onClick={handleLogin} className="bg-blue-500 text-white p-2 rounded">
          Login
        </button>

        {/* BubbleChat Component */}
        <BubbleChat />
      </div>
    </div>
  );
};

export default Login;
