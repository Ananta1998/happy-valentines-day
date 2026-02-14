require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// Mongo connect
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB connected ❤️"))
.catch(console.error);

// Schema
const SurpriseSchema = new mongoose.Schema({
  title: String,
  message: String,
  unlockAt: Date,
  createdAt: { type: Date, default: Date.now }
});

const Surprise = mongoose.model("Surprise", SurpriseSchema);

// Add surprise
app.post("/surprise", async (req,res)=>{
  const data = await Surprise.create(req.body);
  res.json(data);
});

// Get surprises
app.get("/surprises", async (req,res)=>{
  const data = await Surprise.find();
  res.json(data);
});

app.listen(process.env.PORT, ()=>{
  console.log("Server running on 5000");
});