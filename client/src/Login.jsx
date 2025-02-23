import { useState } from "react";
import { login } from "./api/auth";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(credentials);
    navigate("/dashboard");
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" onChange={(e) => setCredentials({ ...credentials, email: e.target.value })} />
        <input type="password" placeholder="Password" onChange={(e) => setCredentials({ ...credentials, password: e.target.value })} />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
