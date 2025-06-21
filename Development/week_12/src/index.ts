interface User {
  namee: string,
  id: string,
  age: number,
  email: string,
  password: string
}

type UpdateProps = Pick< User, 'namee'|'id'|'age'>
type  UpdatePropsOptional = Partial <UpdateProps>

function updateUser(props:  UpdatePropsOptional) {
  //Updating
  console.log("Updating user with:", props);
}

updateUser({
  namee: 'najma'
})