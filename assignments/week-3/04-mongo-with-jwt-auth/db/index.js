const mongoose = require('mongoose');
import {  isPasswordCorrect } from "../utils/password.js"
// Connect to MongoDB
mongoose.connect('your-mongodb-url');

// Define schemas
const AdminSchema = new mongoose.Schema({
    // Schema definition here
    username:{
      type: String,
      required: true,
      trim: true,
      unique: true,
      index: true
    },
    password:{
      type: String,
      required: true
    },
    refreshTokens:{
      type: String
    }
});

adminSchema.methods.checkPassword = async function(userPassword) {
  return await isPasswordCorrect(userPassword, this.password);
}

const UserSchema = new mongoose.Schema({
    // Schema definition here
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    index: true
  },
  password: {
    type: string,
    required: true
  },
  Courses: {
    type: mongoose.Schema.ObjectId,
    ref: Course
  }  
});
userSchema.methods.checkPassword = async function(userPassword) {
    return await isPasswordCorrect(userPassword, this.password);
}

const CourseSchema = new mongoose.Schema({
    // Schema definition here
  title:{
    type: String,
    required: true
  },
  descriptions:{
    type: String,
  },
  price:{
    type: Number,
    required: true
  },
  imagelink: {
    type: String,
    required: true
  }
});

const Admin = mongoose.model('Admin', AdminSchema);
const User = mongoose.model('User', UserSchema);
const Course = mongoose.model('Course', CourseSchema);

module.exports = {
    Admin,
    User,
    Course
}