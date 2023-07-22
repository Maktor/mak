import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cors from "cors";
import path from "path";

dotenv.config();

const app = express();
const port = 3000;

app.use(cors({
  origin: "https://mak-self-development.vercel.app",
  optionsSuccessStatus: 200,
  credentials: true
}))

app.use(express.json());
app.use(express.static(path.join(__dirname, "../client/build")));


// Connecting to MongoDB
mongoose.connect(process.env.MONGODB_URI!, {})
    .then(() => console.log("Successfully connected to MongoDB"))
    .catch((error) => console.error("Error connecting to MongoDB", error));

// Creating a Mongoose schema for User and UserExtension
const UserSchema = new mongoose.Schema({
  firstName: String,
  username: String,
  age: Number,
  email: String,
  password: String,
  intro: { type: Boolean, default: false },
});

const User = mongoose.model("User", UserSchema);


app.get("/", (req, res) => {
    res.send("Server running");
});

// Route for user registration
app.post("/api/register", async (req, res) => {
  const { firstName, username, age, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(400).json({ message: "Username already taken. Please try a different one." });
    }
    
    const existingEmail = await User.findOne({ email })

    if (existingEmail) {
      return res.status(400).json({ message: "Email already taken. Please try a different one." });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      firstName,
      username,
      age,
      email,
      password: hashedPassword,
    });
  
    await newUser.save();
  
    const token = jwt.sign(
      { id: newUser._id, username: newUser.username },
      process.env.JWT_SECRET!,
      { expiresIn: "1h" }
    );
  
    res.status(201).json({ message: "User created successfully", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

console.log("Environment JWT_SECRET:", process.env.JWT_SECRET);

// Route for user login
app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user || !user.password) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET!,
      { expiresIn: "1h" }
    );

    res.status(200).json({ message: "Logged in successfully", intro: user.intro, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

// Route for marking the intro page as seen
app.post("/intro", async (req, res) => {
  const { username } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    user.intro = true;
    await user.save();

    res.status(200).json({ message: "Intro page has been marked as seen" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});


// A default route to handle 404 errors
app.use((req, res, next) => {
  res.status(404).send("Sorry, page not found.");
});

app.listen(port, () => {
    console.log(`Port: ${port}`);
});
