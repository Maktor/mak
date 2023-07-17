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
});

const User = mongoose.model("User", UserSchema);

app.get("/", (req, res) => {
    res.send("Server running");
});

app.post("/register", async (req, res) => {
  const { firstName, username, age, email, password } = req.body;

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
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

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
