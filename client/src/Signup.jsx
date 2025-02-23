import { useState } from "react";
import { register } from "./api/auth";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  // State to store user input (username, email, password)
  const [user, setUser] = useState({ username: "", email: "", password: "" });

  // Hook to nav to different pages
  const navigate = useNavigate();

  // Handles form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents page reload
    await register(user); // Sends user data to backend
    navigate("/login"); // Redirects to login page after registeration
  };

  return (
    <div>
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Username" onChange={(e) => setUser({ ...user, username: e.target.value })} />
        <input type="email" placeholder="Email" onChange={(e) => setUser({ ...user, email: e.target.value })} />
        <input type="password" placeholder="Password" onChange={(e) => setUser({ ...user, password: e.target.value })} />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}
