const mongoose = require("mongoose");

const contactSchema = mongoose.Schema({
  email: {
    type: String,
    trim: true,
  },
  message: {
    type: String,
    trim: true,
  }
});

const Contact = mongoose.model("Contact", contactSchema);

module.exports = Contact;