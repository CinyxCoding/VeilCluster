// src/pages/Register.js
import React, { useState } from "react";
import { register } from "../api/auth";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [faction, setFaction] = useState("Neutral");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(username, password, faction);
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-16 p-6 bg-white rounded-xl shadow-md">
      <h1 className="text-2xl mb-4">Register</h1>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          className="w-full px-3 py-2 border rounded"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="w-full px-3 py-2 border rounded"
          required
        />
        <select
          value={faction}
          onChange={e => setFaction(e.target.value)}
          className="w-full px-3 py-2 border rounded"
        >
          <option value="Order">Order</option>
          <option value="Dissent">Dissent</option>
          <option value="Neutral">Neutral</option>
        </select>
        <button type="submit" className="w-full py-2 bg-blue-600 text-white rounded">
          Register
        </button>
      </form>
      <p className="mt-4 text-center">
        Already have an account?{" "}
        <button onClick={() => navigate("/login")} className="text-blue-600">
          Login
        </button>
      </p>
    </div>
  );
}
