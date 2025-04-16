import zod from 'zod';
const createTodo = zod.object({
  title: zod.string().min(1, "Title is required"),
  description: zod.string()
})

const updateTodo = zod.object({
  id: zod.string()
})

export default{
   createTodo,
   updateTodo
}