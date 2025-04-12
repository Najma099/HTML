const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

// Connect to MongoDB
mongoose.connect('your-mongodb-url');


// Define schemas
const AdminSchema = new mongoose.Schema({
    // Schema definition here
  username: String,
  password: String
});

const UserSchema = new mongoose.Schema({
    // Schema definition here
    username: String,
    password: String,
    coursePurchased: {
      type: [Number],
      default: []
    }
});

const CourseSchema = new mongoose.Schema({
    // Schema definition here
    title: String,
    description: String,
    price: Number,
    imagelink: String,
    published:{
      type: Boolean,
      default: true
    }
});
CourseSchema.plugin(AutoIncrement, { inc_field: 'courseId' });

const Admin = mongoose.model('Admin', AdminSchema);
const User = mongoose.model('User', UserSchema);
const Course = mongoose.model('Course', CourseSchema);

module.exports = {
    Admin,
    User,
    Course
}