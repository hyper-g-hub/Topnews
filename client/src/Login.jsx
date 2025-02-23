// Ts component handles user login and does the login yk

import { useState } from "react"; // react hooks
import { login } from "./api/auth"; // login function from API
import { useNavigate } from "react-router-dom"; // nav hook

export default function Login() {
  // State to store email + password input
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const navigate = useNavigate(); // the nav hook

  // handles form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // prevent page reload when submit form
    await login(credentials); // call login to api
    navigate("/dashboard"); // redirect to dashboard
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
