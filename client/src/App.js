import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const [editing, setEditing ] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:3000/api/users')
    .then(res => {
      // console.log(res);
      setUsers(res.data)
    })
    .catch(err => console.log(err))
  })

  const handleUserChange = e => {
    setUser({
      ...user,
      [e.target.name] : e.target.value
    })
  }

  async function handleUserUpdate(user) {
    await axios.put(`http://localhost:3000/api/users/${user.id}`, {
      name: user.name,
      bio: user.bio
    }).then(res => {
      setUsers(res.data)
    }).catch(err => console.log(err))
    setEditing(false);
  }

  const deleteUser = user => {
    axios.delete(`http://localhost:3000/api/users/${user.id}`)
    .then(res => {
      setUsers(users.filter(u => u.id == res.data.id))
    }).catch(err => console.log(err));
  }
  return (
    <div className="App">
      <h2 className='text-center red-text'>Users Here</h2>
      {users 
      ? (
        <div className='container' style={{display: "flex", justifyContent: 'space-around'}} >
          {users.map(u => {
            return (
              <div className='card' style={{width: "18rem"}} key={u.id}>
                {!editing 
                ? (
                  <div className='card-body'>
                    <h3 className="text-center"> {u.name} </h3>
                    <p className="text-center"> {u.bio} </p>
                    <div className='container' style={{display: "flex", justifyContent: 'space-evenly'}}>
                      <button className='btn btn-primary' onClick = {(e) => {
                        e.preventDefault();
                        deleteUser(u)
                        }}>Delete</button>
                      <button className='btn btn-primary' onClick = {(e) => {
                        e.preventDefault();
                        setUser(u);
                        setEditing(true)
                        }}>Edit</button>
                    </div>
                  </div>
                )
                : (
                  <form>
                    <div className='form-group'>
                      <label htmlFor='name'>Name </label>
                      <input type='text' className='form-control' id='name' name='name' value={user.name} onChange={handleUserChange}></input>
                    </div>
                    <div className='form-group'>
                      <label htmlFor='bio'>Bio </label>
                      <input type='text' className='form-control' id='bio' name='bio' value={user.bio} onChange={handleUserChange}></input>
                    </div>
                    <div className='container' style={{display: "flex", justifyContent: 'space-evenly'}}>
                      <button className='btn btn-primary' onClick={(e) => {
                        e.preventDefault()
                        handleUserUpdate(user)
                      }}>Save Changes</button>
                      <button className='btn btn-secondary' onClick={(e) => {
                        e.preventDefault();
                        setEditing(false)
                        }}>Cancel</button>
                    </div>
                  </form>
                )}
              </div>
            )
          })}
        </div>
      )
      : <h2 className = 'alert alert-warning'>Users not found</h2>
      }
    </div>
  );
}

export default App;
