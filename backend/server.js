const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { body, validationResult } = require("express-validator");
const rateLimit = require("express-rate-limit");

dotenv.config();

// Initialize Express app
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

// Rate limiting for auth endpoints
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit to 100 requests per window
  message: { error: "Too many requests, please try again later" },
});
app.use("/api/auth", authLimiter);

// MongoDB Atlas Connection
const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);
const dbName = process.env.DB_NAME || "keypulse";

async function connectDB() {
  try {
    await client.connect();
    console.log("Connected to MongoDB Atlas");
    const db = client.db(dbName);
    await db.createCollection("users");
    await db.createCollection("passwords");
    // Create indexes
    await db.collection("users").createIndex({ username: 1 }, { unique: true });
    await db.collection("passwords").createIndex({ userId: 1, id: 1 });
    console.log("Collections and indexes ready: users, passwords");
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    process.exit(1);
  }
}
connectDB();

// Password encryption/decryption with IV
const algorithm = "aes-256-cbc";
const key = Buffer.from(process.env.ENCRYPTION_KEY, "hex"); // Ensure 32-byte key

const encryptPassword = (password) => {
  if (typeof password !== "string" || !password) {
    throw new Error("Password must be a non-empty string");
  }
  const iv = crypto.randomBytes(16); // Generate random IV
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(password, "utf8", "hex");
  encrypted += cipher.final("hex");
  return `${iv.toString("hex")}:${encrypted}`; // Store IV with encrypted data
};

const decryptPassword = (encryptedData) => {
  if (typeof encryptedData !== "string" || !encryptedData.includes(":")) {
    throw new Error("Invalid encrypted data format");
  }
  const [ivHex, encrypted] = encryptedData.split(":");
  const iv = Buffer.from(ivHex, "hex");
  const decipher = crypto.createDecipheriv(algorithm, key, iv);
  let decrypted = decipher.update(encrypted, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
};

// Middleware to verify JWT
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "Access denied, no token provided" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.error("JWT verification error:", error.message);
    res.status(403).json({ error: "Invalid or expired token" });
  }
};

// Validation middleware
const validateAuth = [
  body("username").trim().notEmpty().withMessage("Username is required"),
  body("password").trim().notEmpty().withMessage("Password is required"),
];

const validatePassword = [
  body("site").trim().notEmpty().withMessage("Site is required"),
  body("username").trim().notEmpty().withMessage("Username is required"),
  body("password").trim().notEmpty().withMessage("Password is required"),
];

// Auth Routes
app.post("/api/auth/register", validateAuth, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { username, password } = req.body;
  try {
    const db = client.db(dbName);
    const usersCollection = db.collection("users");
    const existingUser = await usersCollection.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: "Username already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = { username, password: hashedPassword };
    const result = await usersCollection.insertOne(user);
    res.status(201).json({ success: true, userId: result.insertedId });
  } catch (error) {
    console.error("Registration error:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/api/auth/login", validateAuth, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { username, password } = req.body;
  try {
    const db = client.db(dbName);
    const usersCollection = db.collection("users");
    const user = await usersCollection.findOne({ username });
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({ success: true, token });
  } catch (error) {
    console.error("Login error:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Password Routes (Protected)
app.get("/api/passwords", authenticateToken, async (req, res) => {
  try {
    const db = client.db(dbName);
    const collection = db.collection("passwords");
    const passwords = await collection
      .find({ userId: new ObjectId(req.user.userId) })
      .toArray();
    // Decrypt passwords before sending
    const decryptedPasswords = passwords.map((p) => {
      try {
        return {
          ...p,
          password: decryptPassword(p.password),
        };
      } catch (error) {
        console.error(
          "Decryption error for password ID:",
          p._id,
          error.message
        );
        return { ...p, password: "[Decryption Failed]" };
      }
    });
    res.json(decryptedPasswords);
  } catch (error) {
    console.error("Error fetching passwords:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post(
  "/api/passwords",
  authenticateToken,
  validatePassword,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { site, username, password, id } = req.body;
    try {
      const db = client.db(dbName);
      const collection = db.collection("passwords");
      const newPassword = {
        id: id || require("uuid").v4(),
        site,
        username,
        password: encryptPassword(password),
        userId: new ObjectId(req.user.userId),
        createdAt: new Date(),
      };
      const result = await collection.insertOne(newPassword);
      res.json({
        success: true,
        result,
        password: { ...newPassword, password },
      });
    } catch (error) {
      console.error("Error saving password:", error.message, {
        body: req.body,
      });
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

app.put(
  "/api/passwords/:id",
  authenticateToken,
  validatePassword,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { site, username, password } = req.body;
    try {
      const db = client.db(dbName);
      const collection = db.collection("passwords");
      const result = await collection.updateOne(
        { id: req.params.id, userId: new ObjectId(req.user.userId) },
        {
          $set: {
            site,
            username,
            password: encryptPassword(password),
            updatedAt: new Date(),
          },
        }
      );
      if (result.matchedCount === 0) {
        return res
          .status(404)
          .json({ error: "Password not found or unauthorized" });
      }
      res.json({ success: true, result });
    } catch (error) {
      console.error("Error updating password:", error.message, {
        body: req.body,
      });
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

app.delete("/api/passwords/:id", authenticateToken, async (req, res) => {
  try {
    const db = client.db(dbName);
    const collection = db.collection("passwords");
    const result = await collection.deleteOne({
      id: req.params.id,
      userId: new ObjectId(req.user.userId),
    });
    if (result.deletedCount === 0) {
      return res
        .status(404)
        .json({ error: "Password not found or unauthorized" });
    }
    res.json({ success: true, result });
  } catch (error) {
    console.error("Error deleting password:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

// Graceful shutdown
process.on("SIGTERM", async () => {
  console.log("Shutting down...");
  await client.close();
  process.exit(0);
});
