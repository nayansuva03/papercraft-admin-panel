import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { MongoClient, ObjectId } from "mongodb";

const app = express();

dotenv.config();

app.use(cors());
app.use(express.json());

// MongoDB connection
const client = new MongoClient(process.env.mongodb);
let db;

client.connect().then(() => {
  db = client.db("users");
  console.log("MongoDB connected");
});

app.listen(5000, () => {
  console.log("server has started.");
});

app.get("/", (req, res) => {
  res.send("backend is running");
});

// Get all users (username, email, createdAt)
app.get("/users", async (req, res) => {
  try {
    const users = await db
      .collection("users")
      .find({})
      .project({ name: 1, email: 1, createdAt: 1 })
      .toArray();

    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete user by ID
app.delete("/users/:id", async (req, res) => {
  try {
    const userId = req.params.id;

    // Validate MongoDB ObjectId
    if (!ObjectId.isValid(userId)) {
      return res.status(400).json({ error: "Invalid user ID" });
    }

    const result = await db
      .collection("users")
      .deleteOne({ _id: new ObjectId(userId) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ message: "User deleted successfully", deletedId: userId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all feedback (name, email, message, createdAt)
app.get("/feedback", async (req, res) => {
  try {
    const feedbacks = await db
      .collection("feedbacks")
      .find({})
      .project({ name: 1, email: 1, message: 1, createdAt: 1 })
      .toArray();

    res.json(feedbacks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});