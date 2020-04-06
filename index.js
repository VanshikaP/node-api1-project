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
            res.status(201).json(users)
        } else {
            res.status(500).json({ errorMessage: "There was an error while saving the user to the database" })
        }
    }
})

server.delete('/api/users/:id', (req, res) => {
    if (users == undefined){
        res.status(500).json({ errorMessage: "The user could not be removed" })
    } else {
        const id = req.params.id;
        const currUser = users.find(u => u.id == id);
        if (currUser == undefined) {
            res.status(404).json({ message: "The user with the specified ID does not exist." })
        } else {
            users = users.filter(u => u !== currUser);
            res.status(201).json(currUser);
        }
    }
})

server.put('/api/users/:id', (req, res) => {
    const id = req.params.id
    const userUpdate = req.body;
    if (users == undefined) {
        res.status(500).json({ errorMessage: "The user information could not be modified." })
    } else {
        if(!userUpdate.hasOwnProperty('name') || !userUpdate.hasOwnProperty('bio')) {
            res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
        } else {
            // users.map(u => {
            //     if (u.id == id) {
            //         return {
            //             id: u.id,
            //             // ...userUpdate
            //             name: 'New',
            //             bio: "New bio"
            //         }
            //     }
            // })
            for(let i = 0; i < users.length; i++){
                if (users[i].id == id){
                    users[i].name = userUpdate.name
                    users[i].bio = userUpdate.bio
                }
            }
            const user = users.find(u => u.id == id);
            if (user) {
                res.status(200).json(users)
            } else {
                res.status(404).json({
                    message: "The user with the specified ID does not exist."
                })
            }
        }
        
    }
})

const port = 3000;
server.listen(port, () => console.log(`\n --- Server running on ${port} ---\n`))