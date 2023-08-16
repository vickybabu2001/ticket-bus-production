import { Server } from 'socket.io';

const io = new Server(9000, {
    cors: {
        origin: 'http://localhost:3000',
    },
})


let user = [];
const addUser = (userData, socketId) => {
    !user.some(user => user.sub === userData.sub) && user.push({ ...userData, socketId });
}
const removeUser = (socketId) => {
    user = user.filter(user => user.socketId !== socketId);
}

io.on('connection', (socket) => {
    console.log('user connected', socket.id)
    //connect
    socket.on("addUser", userData => {
        console.log("userdta", userData);
        addUser(userData, socket.id);
        io.emit("getUser", user);
    })
    socket.on("sendMsg", data => {
        console.log("data", data);
       console.log("user.socketId", user[0].socketId);
       const TO=user[0].socketId
     const data12=io.to(TO).emit('getMsg',data);
      console.log("data1",data12);
         
    })

    //disconnect
    socket.on('disconnect', () => {
        console.log('user disconnected');
        removeUser(socket.id);
    })
})