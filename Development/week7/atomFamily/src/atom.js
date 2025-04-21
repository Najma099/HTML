import { atomFamily } from "recoil";
import {TODOS} from "./todo.js"

const todosAtomFamily = atomFamily({
  key:"todosAtomFamily",
  default: id => {
    return TODOS.find((x) => x.id === id)
  }
})
export default todosAtomFamily;