const express = require('express')
const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http)
const path = require('path')
const port = process.env.PORT || 3000
const design_file = 'index.html'


app.get('/', (req, res) => {
    app.use(express.static(__dirname + '/public'))
    res.sendFile(`${__dirname}${path.sep}${design_file}`)
})

io.on('connection', socket => {
    socket.on('user message', message => {
        io.emit("server message", message)
    })
})

http.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})