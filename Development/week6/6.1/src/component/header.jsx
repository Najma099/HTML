import React from "react"
// export function Header({ title }) {
//   return(
//     <h3>{ title}</h3>
//   )
// }


export const Header = React.memo(
  function Header({ title }) {
    return(
      <h3>{ title}</h3>
    )
  }
)