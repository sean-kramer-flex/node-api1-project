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





module.exports = server; // EXPORT YOUR SERVER instead of {}
