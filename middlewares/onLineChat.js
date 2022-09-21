



module.exports = (server) => {
  // const http = require("http");
  /// const {Server}  = require("socket.io");
    var socketio =require("socket.io");
    var chat = require('../middlewares/chat');

 //  const httpServer = http.createServer(app);
 ///// const io = new Server(httpServer, { transports: ['websocket', 'polling', 'flashsocket'] });

  ///var server = http.createServer(app);
var io = socketio(server,{ transports: ['websocket', 'polling', 'flashsocket'],
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});
chat(io);


   // const socket = io(server, { transports: ['websocket', 'polling', 'flashsocket'] });
   // const appSocket = socket.of("/socket");
  //  let io = require('socket.io').listen(server, { transports: ['websocket', 'polling', 'flashsocket'] });
  //  const socketPort = process.env.ONLINECHATPORT ||80;  //800
    
  //  server.listen(socketPort, ()=>{
  //   console.log(`Server is running on port ${socketPort}`);
  // });

    
  //  io.on("connection", (socket) => {
  //       console.log(`user connected.${socket.id}`);
    
    
  //       socket.on("newMessage", (message) => {
  //           console.log(message.msg);
  //           io.sockets.emit("newMessage", {...message, date: new Date(), id: Math.floor(Math.random() * Math.pow(10, 7))});
  //         });
  //         socket.on("deleteMsg", (id) => {
  //           console.log(id);
  //           io.sockets.emit("deleteMsg",id);
  //         });
        
  //         socket.on("disconnect", () => {
  //           console.log("User disconnected")
  //         })
    
  //         socket.on("connect_error", (err) => {
  //           console.log(`connect_error due to ${err.message}`);
  //         });
  //   });
}