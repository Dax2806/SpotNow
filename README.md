# 🗺️ SpotNow | City Discovery Platform

<div align="center">
  <h3>Discover and Share the Hidden Gems of Your City.</h3>
  <p>A modern, community-driven platform for finding tucked-away cafés, secret gardens, rooftop views, and street art.</p>
  <p>
    <a href="https://spotnow-backend.netlify.app/" target="_blank"><strong>View Live Demo ↗</strong></a>
  </p>
</div>

---

## 📖 Overview

**SpotNow** is a full-stack web application designed to connect local explorers with travelers by providing an interactive, map-based interface for authentic urban exploration. Users can explore a curated grid of locations, view them on an interactive Leaflet.js map, and contribute their own findings to the community.

## ✨ Key Features

- **Interactive Map Exploration:** Browse a filterable grid of spots (Cafés, Parks, Viewpoints, Art) accompanied by real-time map markers powered by Leaflet.js.
- **Geographical Pinning:** A dedicated "Add Spot" interface allows users to click directly on the map to capture precise latitude and longitude coordinates.
- **Community Contributions:** Registered users can submit new spots by providing a name, location description, category, and photo upload.
- **Secure Authentication:** Features a complete signup and login system with hashed passwords (bcrypt) to protect user identities.
- **Privacy & Access Control:** Implements a global "Auth Guard" that redirects unauthorized visitors to the login page, ensuring the platform's content remains exclusive to the community.
- **Glassmorphism Design:** High-end visual effects achieved using semi-transparent backgrounds and soft shadows to create a layered "glass" feel.

---

## 🛠️ Tech Stack

### Frontend (Client)
- **Structure & Styling:** HTML5, CSS3, Bootstrap 5
- **Interactivity:** Vanilla JavaScript (ES6+)
- **Mapping:** Leaflet.js & OpenStreetMap

### Backend (Server)
- **Runtime & Framework:** Node.js, Express.js
- **Database:** MongoDB Atlas (Mongoose ORM)
- **Authentication:** JSON Web Tokens (JWT) & bcryptjs
- **File Storage:** Multer (for handling multipart/form-data image uploads)

---

## 🚀 Local Development

To run SpotNow locally on your machine, follow these steps:

### Prerequisites
- [Node.js](https://nodejs.org/en/) (v14 or higher)
- [MongoDB](https://www.mongodb.com/) (Local or Atlas Cluster)

### 1. Clone the repository
```bash
git clone https://github.com/Dax2806/SpotNow.git
cd SpotNow
```

### 2. Environment Setup
Create a `.env` file in the root directory:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_jwt_key
```

### 3. Install Dependencies & Run
```bash
npm install
npm run dev
```

The application backend and frontend will be served concurrently.

---

<div align="center">
  <i>Designed and developed by <a href="https://github.com/Dax2806">Daksh Patadia</a></i>
</div>
