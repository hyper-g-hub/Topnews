import { Routes, Route, Link } from "react-router-dom"; // Import necessary
import Signup from "./Signup";
import Login from "./Login";
import Dashboard from "./Dashboard";

export default function App() {
  return (
    <div>
      <nav>
        <Link to="/">Home</Link> |  
        <Link to="/signup">Sign Up</Link> |  
        <Link to="/login">Login</Link> |  
        <Link to="/dashboard">Dashboard</Link>  
      </nav>

      <Routes>
        <Route path="/" element={<h1>Welcome to Topnews</h1>} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  );
}
