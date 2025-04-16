import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
  title: {
    required: true,
    type: String,
    unique: true
  },
  description: {
    type: String
  },
  completed: {
    type: Boolean,
    default: false
  }
})

// const Todos = new mongoose.Schene({
//   todos: {
//     type: mongoose.Schema.ObjectId,
//     ref: "todo"
//   }
// })
// 

const todo = mongoose.model("todo", todoSchema  )
export default todo;