const express = require('express')
const shortid = require('shortid')

const server = express()

//middleware
server.use(express.json())

let users = [
    {
        id: shortid.generate(),
        name: 'User 1',
        bio: 'This is user 1'
    },
    {
        id: shortid.generate(),
        name: 'User 2',
        bio: 'This is user 2'
    },
    {
        id: shortid.generate(),
        name: 'User 3',
        bio: 'This is user 3'
    }
]

//endpoints

server.get('/', (req, res) => {
    res.json({
        api: 'running...'
    })
})

server.get('/api/users', (req,res) => {
    res.json(users);
})

server.get('/api/users/:id', (req,res) => {
    const id = req.params.id
    const user = users.find(u => u.id == id);
    if (user) {
        res.status(201).json(user)
    } else {
        res.status(404).json({
            error: 'User not found'
        })
    }
})

const port = 3000;
server.listen(port, () => console.log(`\n --- Server running on ${port} ---\n`))