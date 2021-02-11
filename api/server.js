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





module.exports = server; // EXPORT YOUR SERVER instead of {}
