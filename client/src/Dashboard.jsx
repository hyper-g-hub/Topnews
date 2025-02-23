// Ts component is the protected dashboard page that requries authentication to enter
///
import { getProtectedData, logout } from "./api/auth"; // Import API for fetching protected data (MongoDB)
import { useNavigate } from "react-router-dom"; // Import navigation hook for redirecting 

export default function Dashboard() {
  const [message, setMessage] = useState(""); // State to store response from MongoDB
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    // Fetch protected data when compound mounts (first rendered)
    getProtectedData()
      .then((res) => setMessage(res.data.message)) // Set message if success
      .catch(() => navigate("/login")); // Redirect to login page if fails (not authenticated)
  }, []);

  return (
    <div>
      <h2>Dashboard</h2>
      <p>{message}</p>
      <button onClick={() => { logout(); navigate("/login"); }}>Logout</button>
    </div>
  );
}
