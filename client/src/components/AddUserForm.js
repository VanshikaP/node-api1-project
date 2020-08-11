import React, {useState} from 'react'
import axios from 'axios'

const AddForm = ({users, setUsers}) => {
    const [newUser, setNewUser] = useState({})

    const handleChanges = e => {
        setNewUser({
            ...newUser,
            [e.target.name]: e.target.value
        })
    }

    const addUser = (e,u) => {
        e.preventDefault();
        axios.post('http://localhost:3000/api/users', u)
        .then(res => {
            setUsers(res.data)
            setNewUser({
                name: '',
                bio: ''
            })
        }).catch(err => console.log(err))
        
    }

    const cancel = e => {
        e.preventDefault();
        setNewUser({
            name: '',
            bio: ''
        })
    }

    return (
        <form style={{width: "40rem", margin: "5% auto"}}>
            <div className='form-group'>
                <label htmlFor='name'>Name </label>
                <input type='text' className='form-control' id='name' name='name' value={newUser.name} onChange={handleChanges}></input>
            </div>
            <div className='form-group'>
                <label htmlFor='bio'>Bio </label>
                <input type='text' className='form-control' id='bio' name='bio' value={newUser.bio} onChange={handleChanges}></input>
            </div>
            <div className='container' style={{display: "flex", justifyContent: 'space-evenly'}}>
                <button className='btn btn-primary' onClick={(e) => addUser(e, newUser)}>Add User</button>
                <button className='btn btn-secondary' onClick={cancel}>Cancel</button>
            </div>
        </form>
    )

}

export default AddForm