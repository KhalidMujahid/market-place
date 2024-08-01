require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const Payment = require("./models/payment");
const Contact = require("./models/contact");
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
  res.status(200).render("contact",{ error: false });
});

app.get("/view", (req, res) => {
  return res.status(200).render("view");
});

app.get("/payment", (req, res) => {
  return res.status(200).render("payment");
});

app.post("/payment", async (req, res, next) => {
  try {
    const { email, mode, amount } = req.body;
    console.log(req.body);
    if (!email) {
      return res.status(400).render("error", {
        error: "Please provide an email",
      });
    }

    if (!mode) {
      return res.status(400).render("error", {
        error: "Please provide a mode",
      });
    }

    if (!amount) {
      return res.status(400).render("error", {
        error: "Please provide an amount",
      });
    }

    await Payment.create({
      email,
      mode,
      amount,
    })
      .then(() => res.status(200).render("done"))
      .catch(() =>
        res.status(400).render("error", {
          error: "Something went wrong",
        }),
      );
  } catch (error) {
    next(error);
  }
});

app.post("/contact", async (req, res, next) => {
  try {
    const { email, message } = req.body;

    if (!email) {
      return res.status(400).render("contact", {
        error: "Please provide an email",
      });
    }

    if (!message) {
      return res.status(400).render("contact", {
        error: "Please provide a message",
      });
    }

    await Contact.create({
      email,
      message,
    })
      .then(() => res.status(200).render("contactmessage"))
      .catch(() =>
        res.status(400).render("contact", {
          error: "Something went wrong",
        }),
      );
  } catch (error) {
    next(error);
  }
});

app.get("*", (req, res) => {
  res.status(301).redirect("/");
});

app.listen(PORT, () => console.log("Server running on port....", PORT));
