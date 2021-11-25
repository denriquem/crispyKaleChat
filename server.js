const express = require('express')
const path = require('path')
const http = require('http')
const socketio = require('socket.io') 

const app = express()
const server = http.createServer(app)
const io = socketio(server)

// set static folder
app.use(express.static(path.join(__dirname, 'public')))

// run when a client connects
io.on('connection', socket => {

    // Weclome current user
    socket.emit('message', 'Welcome to CrispyKaleChat')

    socket.broadcast.emit('message', 'A user has joined the chat')

    // Runs when a client disconnects
    socket.on('disconnect', () => {
        io.emit('message', 'A user has left the chat')
    })

})

const PORT = 3000 || process.env.PORT

server.listen(PORT, () => console.log(`server running on port ${PORT}`))