// Ts is the start page

import axios from "axios"; 
import { useEffect, useState } from "react";
import { Routes, Route, Link } from "react-router-dom"; // Import necessary components for routing
import Signup from "./Signup"; 
import Login from "./Login";
import Dashboard from "./Dashboard";
console.log(import.meta.env.NEWS_API_KEY);
const API_URL = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${import.meta.env.VITE_NEWS_API_KEY}`;

export default function App() {
  // do stuff when site loads
  const [news, setNews] = useState([]);

  useEffect(() => {
    axios
      .get(API_URL) // gets api 
      .then((res) => setNews(res.data.articles)) // yay success
      .catch((err) => console.error(err));
  }, []);

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

      <div>
        {news.map((article, index) => (
          <h2 key={index}>{article.title}</h2>
        ))}
      </div>
    </div>
  );
}
