const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const multer = require('multer'); 
const path = require('path');
const fs = require('fs');
const bcrypt = require('bcryptjs'); 

require('dotenv').config(); // Unlocks the .env file

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// --- IMAGE UPLOAD SETUP ---
const dir = './uploads';
if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
}
app.use('/uploads', express.static('uploads'));

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/') 
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)) 
    }
});
const upload = multer({ storage: storage });

// --- DATABASE SETUP ---
const MONGO_URI = process.env.MONGO_URI;

// 🚨 NEW: SAFETY DEBUG CHECK 🚨
if (!MONGO_URI) {
    console.error("\n🔴 ERROR: Your server cannot find MONGO_URI in the .env file.");
    process.exit(1); // Stop the server
} else if (!MONGO_URI.startsWith("mongodb")) {
    console.error("\n🔴 ERROR: Your link is missing the 'mongodb+srv://' prefix!");
    console.error("👉 What your server is currently reading from .env: ", MONGO_URI);
    console.error("Fix your .env file and try again.\n");
    process.exit(1); // Stop the server
}

mongoose.connect(MONGO_URI)
    .then(() => console.log("🟢 Connected to MongoDB!"))
    .catch(err => console.error("🔴 Could not connect to MongoDB:", err));

// --- SCHEMAS ---
const spotSchema = new mongoose.Schema({
    name: String,
    location: String,
    description: String,
    category: String,
    imageUrl: String, 
    lat: Number, 
    lng: Number  
});
const Spot = mongoose.model('Spot', spotSchema);

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});
const User = mongoose.model('User', userSchema);

// --- API ROUTES ---

// 1. SIGNUP Route
app.post('/api/signup', async (req, res) => {
    try {
        const existingUser = await User.findOne({ username: req.body.username });
        if (existingUser) {
            return res.status(400).json({ message: "Username already taken!" });
        }
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const newUser = new User({
            username: req.body.username,
            password: hashedPassword
        });
        await newUser.save();
        res.status(201).json({ message: "User created successfully!" });
    } catch (error) {
        res.status(500).json({ message: "Error signing up." });
    }
});

// 2. LOGIN Route
app.post('/api/login', async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        if (!user) {
            return res.status(400).json({ message: "User not found!" });
        }
        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Incorrect password!" });
        }
        res.json({ message: "Login successful!", username: user.username });
    } catch (error) {
        res.status(500).json({ message: "Error logging in." });
    }
});

// 3. GET Spots
app.get('/api/spots', async (req, res) => {
    try {
        const filter = {};
        if (req.query.category) {
            filter.category = req.query.category;
        }
        const spots = await Spot.find(filter); 
        res.json(spots);
    } catch (error) {
        res.status(500).json({ message: "Error fetching spots." });
    }
});

// 4. POST Spot
app.post('/api/spots', upload.single('image'), async (req, res) => {
    try {
        const newSpot = new Spot({
            name: req.body.name,
            location: req.body.location,
            description: req.body.description,
            category: req.body.category,
            lat: req.body.lat, 
            lng: req.body.lng, 
            imageUrl: req.file ? `/uploads/${req.file.filename}` : '/Cafe.jpg' 
        });
        await newSpot.save(); 
        res.status(201).json({ message: "Spot added successfully!", spot: newSpot });
    } catch (error) {
        res.status(500).json({ message: "Error saving spot." });
    }
});

// 5. DELETE Spot
app.delete('/api/spots/:id', async (req, res) => {
    try {
        await Spot.findByIdAndDelete(req.params.id);
        res.json({ message: "Spot deleted successfully!" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting spot." });
    }
});

app.listen(PORT, () => {
    console.log(`SpotNow Backend is running on http://localhost:${PORT}`);
});