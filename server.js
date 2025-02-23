// server.js
// Ts sets up an express.js server with auth using JWT + MongoDB

const express = require("express"); // Import express framework 
const cors = require("cors"); // Import CORS for cross-origin requests
const mongoose = require("mongoose"); // mongoDB
const dotenv = require("dotenv"); // dotenv for enviroment vars
const bcrypt = require("bcryptjs"); // bcrypt for password hashing
const jwt = require("jsonwebtoken"); // jwt for authentication

dotenv.config(); // Load enviroment vars from .env file

const app = express();
app.use(cors()); // enable CORS
app.use(express.json()); // enable JSON rq body parsing

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI) // MONGO_URI is stored in the .env file
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error(err));

// User Model
const User = mongoose.model("User", new mongoose.Schema({
  username: String,
  email: String,
  password: String,
}));

// Register Route
app.post("/api/register", async (req, res) => {
  const { username, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10); // has password before saving to db (yes the passwords are safe right here guys!!)
  const user = new User({ username, email, password: hashedPassword });

  await user.save(); // Save user to MongoDB

  res.json({ message: "User registered successfully" });
});

// Login Route
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  // check if user exists
  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  // Generate a JWT token with User ID
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
  res.json({ token });
});

// Protected Route
const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) return res.status(401).json({ message: "Access Denied" });

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch {
    res.status(400).json({ message: "Invalid Token" });
  }
};

app.get("/api/protected", authMiddleware, (req, res) => {
  res.json({ message: "You are authenticated!" });
});

// Start Server
app.listen(5000, () => console.log("Server running on port 5000"));
