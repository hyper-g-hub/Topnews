import { useEffect, useState } from "react";
import { getProtectedData, logout } from "./api/auth";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    getProtectedData().then((res) => setMessage(res.data.message)).catch(() => navigate("/login"));
  }, []);

  return (
    <div>
      <h2>Dashboard</h2>
      <p>{message}</p>
      <button onClick={() => { logout(); navigate("/login"); }}>Logout</button>
    </div>
  );
}
