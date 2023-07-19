import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import bcrypt from "bcrypt";
import cors from "cors";

dotenv.config();

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

mongoose.connect(process.env.MONGODB_URI!, {})
    .then(() => console.log("Successfully connected to MongoDB"))
    .catch((error) => console.error("Error connecting to MongoDB", error));

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

app.post("/register", async (req, res) => {
  const { firstName, username, age, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(400).json({ message: "Username already taken. Please try a different one." });
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

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});



app.post("/login", async (req, res) => {
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

    res.status(200).json({ message: "Logged in successfully", intro: user.intro });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

app.post("/introDone", async (req, res) => {
  const { username } = req.body;

  console.log(req.body);

  try {
    const user = await User.findOne({ username });

    console.log(user);

    if (!user) {
      
      return res.status(400).json({ message: "Invalid username" });
    }

    user.intro = true;
    await user.save();

    res.status(200).json({ message: "Intro viewed" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

app.listen(port, () => {
    console.log(`Port: ${port}`);
});
