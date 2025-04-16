import express from 'express';
const app = express();

app.use(express.json());
app.use('/signup', (req, res) => {
  
})

app.use('/signin',(req, res) => {
  
})

app.post('/addTodo', middleware, async (req, res) => {
  try {
    const newTodo = req.body;
    const createdTodo = await Todo.create(newTodo);

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


app.delete('/removeTodo/:id', middleware,async (req, res) => {
  try{
    const id = req.params.id;
    const deletedTodo = await Todo.findByIdAndDelete(id);
    if(!deletedTodo) {
      return res.status(400).send({
        ok:false,
        message: "No Todo exits"
      })
    }
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
    const todo = await Todo.find({});
    if(!todo.length === 0) {
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