const express = require("express");
const cors = require("cors");
const { MongoClient, ObjectId } = require("mongodb");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB setup
const MONGO_URL = "mongodb+srv://userjr:uqFJtmlBVxVceTHM@cluster0.yhgtmxy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const DB_NAME = "mern_todolist";
const client = new MongoClient(MONGO_URL);
let db;

// JWT Secret
const JWT_SECRET = "your_jwt_secret_key";

// Connect to DB
async function start() {
  try {
    await client.connect();
    db = client.db(DB_NAME);
    console.log("✅ Connected to MongoDB");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error);
  }
}
start();

// Middleware to verify token
function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader?.split(" ")[1];

  if (!token) return res.status(401).json({ message: "Unauthorized" });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid token" });
    req.user = user;
    next();
  });
}

// ---------------- AUTH -------------------

// Register
app.post("/api/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    // Validation
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if user already exists
    const existing = await db.collection("users").findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Hash password
    const hashed = await bcrypt.hash(password, 10);
    
    // Insert user
    const result = await db.collection("users").insertOne({ 
      name, 
      email, 
      password: hashed,
      bio: '',
      phone: '',
      profileImage: '',
      createdAt: new Date()
    });
    
    res.status(201).json({ 
      message: "User registered successfully", 
      userId: result.insertedId 
    });
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ message: "Server error during registration" });
  }
});

// Login
app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Validation
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }
    
    // Find user
    const user = await db.collection("users").findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Check password
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Generate token
    const token = jwt.sign(
      { id: user._id, name: user.name, email: user.email }, 
      JWT_SECRET, 
      { expiresIn: "24h" }
    );
    
    res.json({ 
      message: "Login successful", 
      token,
      name: user.name,
      email: user.email
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error during login" });
  }
});

// Get Profile (Protected)
app.get("/api/profile", authenticateToken, async (req, res) => {
  try {
    const user = await db.collection("users").findOne(
      { _id: new ObjectId(req.user.id) }, 
      { projection: { password: 0 } }
    );
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    
    res.json(user);
  } catch (error) {
    console.error("Profile error:", error);
    res.status(500).json({ message: "Server error fetching profile" });
  }
});

// Update Profile (Protected)
app.put("/api/profile", authenticateToken, async (req, res) => {
  try {
    const { name, email, bio, phone, profileImage } = req.body;
    
    // Validation
    if (!name || !email) {
      return res.status(400).json({ message: "Name and email are required" });
    }

    // Check if email is being changed and already exists
    const existingUser = await db.collection("users").findOne({ 
      email, 
      _id: { $ne: new ObjectId(req.user.id) } 
    });
    
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Update user profile
    const updateData = {
      name,
      email,
      bio: bio || '',
      phone: phone || '',
      profileImage: profileImage || '',
      updatedAt: new Date()
    };

    const result = await db.collection("users").updateOne(
      { _id: new ObjectId(req.user.id) },
      { $set: updateData }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    // Get updated user data (without password)
    const updatedUser = await db.collection("users").findOne(
      { _id: new ObjectId(req.user.id) },
      { projection: { password: 0 } }
    );

    res.json({
      message: "Profile updated successfully",
      ...updatedUser
    });
  } catch (error) {
    console.error("Update profile error:", error);
    res.status(500).json({ message: "Server error updating profile" });
  }
});

// ---------------- TO-DO CRUD -------------------

// Get Todos
app.get("/api/todos", authenticateToken, async (req, res) => {
  try {
    const todos = await db.collection("todos").find({ userId: req.user.id }).sort({ createdAt: -1 }).toArray();
    res.json(todos);
  } catch (error) {
    console.error("Get todos error:", error);
    res.status(500).json({ message: "Server error fetching todos" });
  }
});

// Add Todo
app.post("/api/todos", authenticateToken, async (req, res) => {
  try {
    const { task } = req.body;
    if (!task || task.trim() === '') {
      return res.status(400).json({ message: "Task is required" });
    }

    const newTodo = { 
      task: task.trim(), 
      userId: req.user.id, 
      done: false,
      createdAt: new Date()
    };

    const result = await db.collection("todos").insertOne(newTodo);
    
    // Return the created todo with its ID
    const createdTodo = {
      _id: result.insertedId,
      ...newTodo
    };
    
    res.status(201).json(createdTodo);
  } catch (error) {
    console.error("Add todo error:", error);
    res.status(500).json({ message: "Server error adding todo" });
  }
});

// Update Todo (for editing task text or toggling done status)
app.put("/api/todos/:id", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { task, done } = req.body;

    // Validate ObjectId
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid todo ID" });
    }

    // Build update object
    const updateData = { updatedAt: new Date() };
    if (task !== undefined) updateData.task = task.trim();
    if (done !== undefined) updateData.done = done;

    const result = await db.collection("todos").updateOne(
      { _id: new ObjectId(id), userId: req.user.id },
      { $set: updateData }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "Todo not found" });
    }

    // Get updated todo
    const updatedTodo = await db.collection("todos").findOne({ _id: new ObjectId(id) });
    
    res.json(updatedTodo);
  } catch (error) {
    console.error("Update todo error:", error);
    res.status(500).json({ message: "Server error updating todo" });
  }
});

// Toggle Todo Status (Quick toggle for done/undone)
app.patch("/api/todos/:id/toggle", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ObjectId
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid todo ID" });
    }

    // Get current todo
    const currentTodo = await db.collection("todos").findOne({ 
      _id: new ObjectId(id), 
      userId: req.user.id 
    });

    if (!currentTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    // Toggle done status
    const result = await db.collection("todos").updateOne(
      { _id: new ObjectId(id), userId: req.user.id },
      { 
        $set: { 
          done: !currentTodo.done,
          updatedAt: new Date()
        } 
      }
    );

    // Get updated todo
    const updatedTodo = await db.collection("todos").findOne({ _id: new ObjectId(id) });
    
    res.json(updatedTodo);
  } catch (error) {
    console.error("Toggle todo error:", error);
    res.status(500).json({ message: "Server error toggling todo" });
  }
});

// Delete Todo
app.delete("/api/todos/:id", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ObjectId
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid todo ID" });
    }

    const result = await db.collection("todos").deleteOne({ 
      _id: new ObjectId(id), 
      userId: req.user.id 
    });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.json({ message: "Todo deleted successfully", deletedId: id });
  } catch (error) {
    console.error("Delete todo error:", error);
    res.status(500).json({ message: "Server error deleting todo" });
  }
});

// Delete All Completed Todos
app.delete("/api/todos/completed", authenticateToken, async (req, res) => {
  try {
    const result = await db.collection("todos").deleteMany({ 
      userId: req.user.id,
      done: true
    });

    res.json({ 
      message: `${result.deletedCount} completed todos deleted successfully`,
      deletedCount: result.deletedCount
    });
  } catch (error) {
    console.error("Delete completed todos error:", error);
    res.status(500).json({ message: "Server error deleting completed todos" });
  }
});

// ---------------- DASHBOARD/STATS -------------------

// Get User Stats (for dashboard)
app.get("/api/stats", authenticateToken, async (req, res) => {
  try {
    const todos = await db.collection("todos").find({ userId: req.user.id }).toArray();
    
    const totalTodos = todos.length;
    const completedTodos = todos.filter(todo => todo.done).length;
    const pendingTodos = totalTodos - completedTodos;
    const completionRate = totalTodos > 0 ? Math.round((completedTodos / totalTodos) * 100) : 0;

    res.json({
      totalTodos,
      completedTodos,
      pendingTodos,
      completionRate,
      recentTodos: todos.slice(-5).reverse() // Last 5 todos, newest first
    });
  } catch (error) {
    console.error("Get stats error:", error);
    res.status(500).json({ message: "Server error fetching stats" });
  }
});

// ---------------- ERROR HANDLING -------------------

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: "API endpoint not found" });
});

// Global error handler
app.use((error, req, res, next) => {
  console.error("Global error:", error);
  res.status(500).json({ message: "Internal server error" });
});

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('\n🔄 Gracefully shutting down...');
  try {
    await client.close();
    console.log('✅ MongoDB connection closed');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error during shutdown:', error);
    process.exit(1);
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});