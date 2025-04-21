import { atomFamily, RecoilRoot, useRecoilValue } from "recoil";
import todosAtomFamily from './atom.js'
function App() {
  return(
    <RecoilRoot>
      <Todo id={1} ></Todo>
      <Todo id={2}></Todo>
    </RecoilRoot>
  )
}

function Todo({id}) {
  const currentTodo = useRecoilValue(todosAtomFamily(id));
  
  return(
    <>
      <h3>{currentTodo.title }</h3>
      <p>{currentTodo.description}</p>
    </>
  )
}
export default App;