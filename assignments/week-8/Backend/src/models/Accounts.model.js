import mongoose from "mongoose";
const accountSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",  
    required: true,
    unique: true,
  },
  balance: {
    type: Number,
    required: true,
    trim: true,
    default: 0,
    min: [0, "Balance cannot be negative"] 
  }
}, {
  timestamps: true 
});

const Account = mongoose.model("Account", accountSchema);
export { Account };
