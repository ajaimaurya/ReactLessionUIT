import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import SimpleList from './Component/SimpleList'
import ToDoList from './Component/ToDoList'
import PaginationList from './Component/PaginationList'
import UserList from './Component/UserList'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>Hello React</h1>
      {/* <SimpleList /> */}
      {/* <ToDoList /> */}
      {/* <table>
        <tr>
          <td><ToDoList /></td>
          <td><SimpleList /></td>
        </tr>
      </table> */}
      {/* <PaginationList/> */}
      <UserList/>
      
        
    </>
  )
}

export default App
