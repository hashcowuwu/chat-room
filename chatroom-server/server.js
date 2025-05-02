// const {Server} = require("socket.io");


import { createServer } from "http";
import { Server } from "socket.io";

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000"
  }
});


io.on("connection", (socket) => {
    console.log(socket.id + 'connected!');
    socket.on('message',(message) => { //¼àÌımessage
        console.log(`${socket.id}:${message}`)
        socket.broadcast.emit('message',JSON.stringify({
        user:socket.id,
        message:message
        }))
    });

});
io.listen(4000);
