import express from 'express';
import { createTodo, updateTodo } from "./zod.js";
import todo from "./db.js"
const app = express();

app.use(express.json());

app.post('/addTodo',  async (req, res) => {
  try {
    const newTodo = req.body;
    const response = createTodo.safeParse(newTodo);
    if(!response.success) {
      return res.status(400).send({
        ok:false,
        message: 'please enter a valid Input'
      })
    }
    const { title, description } = response.data;
    const createdTodo = await todo.create({ title, description });

    if (createdTodo) {
      return res.status(200).send({
        ok: true,
        message: "New Todo added successfully",
        data: createdTodo
      });
    } else {
      return res.status(400).send({
        ok: false,
        message: "New Todo couldn't be added. Please try again!"
      });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).send({
      ok: false,
      message: "Server error while adding Todo"
    });
  }
});


app.delete('/removeTodo/:id',async (req, res) => {
  try{
    const id = req.params.id;
    const response = updateTodo.safeParse(id);
    if(!response.success) {
      return res.status(400).send({
        ok: false,
        message: "pass valid Id"
      })
    }
    const deletedTodo = await todo.findByIdAndDelete(id);
    return res.status(200).send({
      ok: true,
      message:"Todos removed Successfully"
    })   
  }
  catch(err) {
    return res.status(404).send({
      ok:false,
      message:`Internal server error ${err.message}`
    })
  }
})

app.get('/Alltodo', middleware, async(req, res) => {
  try{
    const todos = await todo.find({});
    if(!todos.length === 0) {
      return res.status(400).send({
        ok: false,
        message: "Couldn't load the todo"
      })
    }
    return res.status(200).send({
      ok: true,
      message: `Your loaded Todo`,
      todo
    })
  }
  catch(err) {
    return res.status(404).send({
      ok:false,
      message: `Couldn't load Todo due to internal server issue ${err.message}`
    })
  }
})

app.listen(3000,()=> {
  console.log(`Server is running at the port 3000`);
  })