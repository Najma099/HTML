import mongoose from "mongoose";
import { isPasswordCorrect } from "../utils/password";
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    trim: true,
    required: true
  },
  lastName: {
    type: String,
    trim: true,
    required: true
  },
  refreshedToken: {
    type: String
  }
});
UserSchema.methods.checkPassword = async (userPassword) => {
  return await isPasswordCorrect(userPassword, this.userPassword);
};
export const User = mongoose.model('User', UserSchema);