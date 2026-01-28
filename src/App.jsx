import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import SimpleList from './Component/SimpleList'
import ToDoList from './Component/ToDoList'
import PaginationList from './Component/PaginationList'
import UserList from './Component/UserList'
import { InfiniteScrolling } from './Component/InfiniteScrolling'
import { SearchWithDebounce } from './Component/SearchWithDebounce'
import { PaginationList1 } from './Component/PaginationList1'
import LiveSearchAPI from './Component/LiveSearchApi'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>My name is Ajai</h1>
      {/* <SimpleList /> */}
      {/* <ToDoList /> */}
      {/* <table>
        <tr>
          <td><ToDoList /></td>
          <td><SimpleList /></td>
        </tr>
      </table> */}
      {/* <PaginationList/> */}
      {/* <InfiniteScrolling/> */}
      {/* <UserList/> */}
      {/* <SearchWithDebounce/> */}
      {/* <PaginationList1/> */}
      <LiveSearchAPI/>
      
        
    </>
  )
}

export default App
