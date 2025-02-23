// src/About.jsx
import { Link } from "react-router-dom"; // Import link to enable navigation within the app

export default function About() {
  return (
    <div>
      <h1>About Page</h1>
      <Link to="/">Go to Home</Link>
    </div>
  );
}
