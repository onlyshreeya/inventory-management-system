import { useState } from "react";
import API from "../api/axios";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/register", formData);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);
      toast.success(`Registered successfully as ${res.data.role}`);
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.response?.data?.message || "Error registering");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-lg w-96"
      >
        <h2 className="text-3xl font-bold mb-6">Register</h2>

        <input
          type="text"
          placeholder="Name"
          required
          className="w-full border p-3 rounded-lg mb-4"
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />

        <input
          type="email"
          placeholder="Email"
          required
          className="w-full border p-3 rounded-lg mb-4"
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />

        <input
          type="password"
          placeholder="Password"
          required
          className="w-full border p-3 rounded-lg mb-4"
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        />

        <select
          className="w-full border p-3 rounded-lg mb-4 bg-white"
          value={formData.role}
          onChange={(e) => setFormData({ ...formData, role: e.target.value })}
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>

        <button className="bg-black text-white w-full py-3 rounded-lg mb-4">
          Register
        </button>

        <p className="text-center text-sm">
          Already have an account? <Link to="/" className="text-blue-500">Login</Link>
        </p>
      </form>
    </div>
  );
}
