// BUILD YOUR SERVER HERE
const express = require('express')
const db = require('./users/model')

const server = express()

server.use(express.json())

//get home message
server.get('/', (req, res) => {
  res.json({message: 'Welcome to users api'})
})

//get all users
server.get('/users', async(req, res) => {
  const users = await db.find()
   if(users) {
     res.json(users)
   } else {res.status(500).json({
    message: "The users information could not be retrieved"
   })}
})

//get user by id
server.get('/users/:id', async(req, res) => {
  const user = await db.findById(req.params.id)
  console.log(req.params.id)
  if(user) {
    res.json(user)
  } else {
    res.status(404).json({
      message: "The user with the specified ID does not exist"
    })
  }
})

//add new user
server.post('/users', async(req, res) => {
  const newUser = await db.insert(req.body)
  console.log('newUser: ', newUser);
  if(!newUser.name || !newUser.bio) {
    res.status(400).json({ message: "Please provide name and bio for the user" })
  } else if (newUser){
    res.status(201).json(newUser)
  } else {
    res.status(500).json({ message: "There was an error while saving the user to the database" })
  }
})

//edit a user
server.put('/users/:id', async (req, res) => {
const user = await db.findById(req.params.id)
if (!user) {
  res.status(404).json({ message: "The user with the specified ID does not exist" })}
  else if (user) {
    const editedUser = await db.update(req.params.id, req.body)
    res.status(200).json(editedUser)
  } else {
    res.status(500).json({ message: "The user information could not be modified" })

  }

  
})





module.exports = server; // EXPORT YOUR SERVER instead of {}
