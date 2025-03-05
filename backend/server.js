const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes");
const movieRoutes = require("./routes/movieRoutes");
const userRoutes = require("./routes/userRoutes");
const errorHandler = require("./utils/errorHandler");
const connectDB = require("./config/db");

dotenv.config();

const app = express();


const corsOptions = {
  origin: "http://localhost:5173", 
  optionsSuccessStatus: 200, 
};
app.use(cors(corsOptions));


app.use(express.json());


connectDB();


app.use("/api/auth", authRoutes);
app.use("/api/movies", movieRoutes);
app.use("/api/user", userRoutes);


app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));