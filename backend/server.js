import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { MongoClient, ObjectId } from "mongodb";
import { v2 as cloudinary } from "cloudinary";

const app = express();

dotenv.config();

app.use(cors());
app.use(express.json());



cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


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


// Get Cloudinary usage statistics
app.get("/cloudinary/stats", async (req, res) => {
    try {
        const result = await cloudinary.api.usage();

        res.json({
            storage: result.storage.usage,
            bandwidth: result.bandwidth.usage,
            requests: result.requests,
            transformations: result.transformations.usage
        });

    } catch (error) {
        console.error("Cloudinary stats error:", error);

        res.status(500).json({
            error: "Failed to fetch Cloudinary statistics"
        });
    }
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