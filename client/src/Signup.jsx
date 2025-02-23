import { useState } from "react";
import { register } from "./api/auth";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [user, setUser] = useState({ username: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await register(user);
    navigate("/login");
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
