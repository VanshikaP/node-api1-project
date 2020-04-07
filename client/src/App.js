import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'

import UserCard from './components/UserCard'
import AddUserForm from './components/AddUserForm'

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/api/users')
    .then(res => {
      // console.log(res);
      setUsers(res.data)
    })
    .catch(err => console.log(err))
  })

  
  return (
    <div className="App">
      <h2 className='text-center red-text'>Users Here</h2>
      {users 
      ? (
        <div className='container' style={{display: "flex", justifyContent: 'space-around'}} >
          {users.map(u => {
            return <UserCard key={u.id} u={u} users={users} setUsers={setUsers} />
          })}
        </div>
        )
      : <h2 className = 'alert alert-warning'>Users not found</h2>
      }
      <h2 className='text-center'>Add User Form</h2>
      <AddUserForm users={users} setUsers={setUsers} />
    </div>
  )
}

export default App;
