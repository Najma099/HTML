import mongoose from "mongoose";
const TransactionSchema = mongoose.Schema({
  from: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  to: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  amount: {
    type: Number,
    required: true,
    min: [0, "Amount must be greater than zero"] 
  }
}, { timestamps: true });

export const Transaction = mongoose.model("Transaction", TransactionSchema);
