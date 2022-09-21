const uuidv4 = require('uuid').v4;
var fs = require('fs');
const fetch = require("node-fetch");

const messages = new Set();
const users = new Map();
let chat_E ;

///UTC DATE
let nowTime = new Date().toISOString().
replace(/T/, ' ').      // replace T with a space
replace(/\..+/, '')     // delete the dot and everything after;

function getCookie(req){
 ////   var userEmail = req.cookies['email'];
  ///  var userName = req.cookies['name'];
 // console.log('qqqqqqqqqqqqqqqqq')
 /// console.log(req.cookies['email'])
    if(req.cookies['email']){
       chat_E= req.cookies['email'];
    } else {
      chat_E= 'Anonymous';
    }
   
}

////const usrN = {userN}? {userN}:'Anonymous';

const defaultUser = {
  id: 'anon',
  name: 'Anonymous',
};

const messageExpirationTimeMS = 60 * 1000;

class Connection {
  constructor(io, socket) {
    this.socket = socket;
    this.io = io;

    socket.on('getMessages', () => this.getMessages());
    socket.on('message', (value) => this.handleMessage(value));

    socket.on('loginName', (data) => {
      console.log('loginName' , object.value(data));
    } )
    socket.on("typing", (data) => {
        socket.to(data.roomNumber).emit("typing", data);
    });
    socket.on('disconnect', () => this.disconnect());
    socket.on('connect_error', (err) => {
      console.log(`connect_error due to ${err.message}`);
    });
  }
  
  sendMessage(message) {
    this.io.sockets.emit('message', message);
  }
  
  getMessages() {
    messages.forEach((message) => this.sendMessage(message));
  }

  async handleMessage(value) {
    // console.log('value', value);
    // console.log(users.get(this.io.socket) || defaultUser);
   /// const response = await fetch('http://localhost:8000/getCookie'
  //  const response = await fetch('https://api.softestingca.com/getCookie'
  //   , {
    
  //     credentials:'false',
  //      mode:'same-origin',
          
  // })
  // console.log('json1', response)
  

    
   
  // if (json.success) {

  // }

    const message = {
      id: uuidv4(),
      user: users.get(this.io.sockets) || defaultUser,
      value,
      time: nowTime
    };

    messages.add(message);
    this.sendMessage(message);

    fs.appendFile('OnLineChat.txt', JSON.stringify(message) , function (err) {
      if (err) throw err;
      console.log('Saved!');
    });


    setTimeout(
      () => {
        messages.delete(message);
        this.io.sockets.emit('deleteMessage', message.id);
      },
      messageExpirationTimeMS,
    );
  }

  disconnect() {
    users.delete(this.socket);
  }
}

function chat(io) {
  io.on('connection', (socket) => {
    new Connection(io, socket);   
  });
};

module.exports = chat;