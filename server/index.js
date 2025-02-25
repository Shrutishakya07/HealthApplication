/* eslint-disable no-undef */
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
// const fileUpload = require('express-fileupload');
const path = require('path');
const fs = require('fs');
const multer = require('multer');  // ✅ Ensure Multer is correctly used


const app = express();

// ✅ Ensure uploads folder exists
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
    console.log("📁 'uploads' directory created");
}


app.use(cors({
  origin: ['http://localhost:4000', 'http://127.0.0.1:4000'], // Add both origins
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']  // ✅ Allow all required methods
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// app.use(fileUpload({
//     useTempFiles: true,
//     tempFileDir: '/tmp/', // Temporary folder for file uploads
// }));

app.use('/uploads', express.static(uploadDir));

const cloudinary = require('./config/cloudinary')
cloudinary.cloudinaryConnect();

require('dotenv').config();
const PORT = process.env.PORT || 4000;

require('./config/database').connect();

const user = require('./routes/user')
const profile = require('./routes/profile')
const provider = require('./routes/provider')
const review = require('./routes/review')
const reportanalysis = require('./routes/reportanalysis');
const admin = require('./routes/admin')

app.use('/api/v1/auth',user);
app.use('/api/v1/profile',profile);
app.use('/api/v1/provider',provider);
app.use('/api/v1/review',review);
app.use('/api/v1/report', reportanalysis);
app.use('/api/v1/admin',admin);

// const allowedOrigins = [
//     "http://127.0.0.1:3000",
//     "http://localhost:3000",
//     "http://127.0.0.1:4000",
//     "http://localhost:4000"
//   ];
  
  // app.use(cors({
  //   origin: function (origin, callback) {
  //     if (!origin || allowedOrigins.includes(origin)) {
  //       callback(null, true);
  //     } else {
  //       callback(new Error("Not allowed by CORS"));
  //     }
  //   },
  //   credentials: true
  // }));

// Serve frontend build files
app.use(express.static(path.join(__dirname, "../dist")));

// Handle all unknown routes by serving React app
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../dist", "index.html"));
});

app.get('/', (req, res) => {
    return res.json({
        success:true,       
        message: 'API is running'
    })
})

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});

