import express from 'express';
import mongoose from 'mongoose';
import {  isPasswordCorrect } from "../utils/password.js"
import dotenv from 'dotenv';
dotenv.config({
  path:"../.env"
});
const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch(err => {
    console.error("Error connecting to MongoDB", err);
});

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

AdminSchema.methods.checkPassword = async function(userPassword) {
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
    type: String,
    required: true
  },
  Courses: {
    type: mongoose.Schema.ObjectId,
    ref: "Course"
  },
  refreshTokens:{
    type: String
  }
});
UserSchema.methods.checkPassword = async function(userPassword) {
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

export {  Admin, User, Course };

import AdminRoute from "../routes/admin.js";
app.use("/api/admin", AdminRoute);

import UserRoute from "../routes/user.js";
app.use("/api/user", UserRoute);

app.listen(3000, async () => {
    try {
        console.log("Server is running on: https://localhost:3000/");     
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
})