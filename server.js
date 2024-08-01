require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();

const PORT = process.env.PORT || 3000;

// middlewares
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// connect to mongodb
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.status(200).render("index");
});

app.get("/contact", (req, res) => {
  res.status(200).render("contact");
});

app.get("/view", (req, res) => {
  return res.status(200).render("view");
});

app.get("/payment", (req, res) => {
  return res.status(200).render("payment");
});

app.listen(PORT, () => console.log("Server running on port....", PORT));
