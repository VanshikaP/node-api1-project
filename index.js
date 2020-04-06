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
    users == undefined 
    ? res.status(500).json({ errorMessage: "The users information could not be retrieved." }) 
    : res.json(users)
})

server.get('/api/users/:id', (req,res) => {
    const id = req.params.id
    if (users == undefined) {
        res.status(500).json({ errorMessage: "The user information could not be retrieved." })
    } else {
        const user = users.find(u => u.id == id);
        if (user) {
            res.status(201).json(user)
        } else {
            res.status(404).json({
                message: "The user with the specified ID does not exist."
            })
        }
    }
})

server.post('/api/users', (req, res) => {
    const userInfo = req.body;
    if (!userInfo.hasOwnProperty('name') || !userInfo.hasOwnProperty('bio')) {
        res.status(400).json({ errorMessage: 'Please provide name and bio for the user.' })
    } else {
        const newUser = {
            id: shortid.generate(),
            ...userInfo
        }
        users.push(newUser)
        if (users.find(u => u.id == newUser.id)) {
            res.status(201).json(newUser)
        } else {
            res.status(500).json({ errorMessage: "There was an error while saving the user to the database" })
        }
    }
})

const port = 3000;
server.listen(port, () => console.log(`\n --- Server running on ${port} ---\n`))