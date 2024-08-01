const mongoose = require("mongoose");

const paymentSchema = mongoose.Schema(
  {
    email: {
      type: String,
      trim: true,
    },
    amount: {
      type: Number,
    },
    mode: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true },
);

const Payment = mongoose.model("Payment", paymentSchema);

module.exports = Payment;
