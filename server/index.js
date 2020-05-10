const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const cors = require('cors');

const { addUser, removeUser, getUser, getUsersInRoom } = require('./users.js');

const PORT = process.env.PORT || 5000;

const router = require('./router');

const app = express(); // Instantiate app as an express class
const server = http.createServer(app); // Create a server based off the express app
const io = socketio(server); // Create sockets for your server

const perks = [
    'A1',
    'A2',
    'A3',
    'A4',
    'A5',
    'A6',
    'A7',
    'A8',
    'A9',
    'B1',
    'B2',
    'B3',
    'B4',
    'B5',
    'B6',
    'B7',
    'B8',
    'B9'
];

const redflags = [
    'C1',
    'C2',
    'C3',
    'C4',
    'C5',
    'C6',
    'C7',
    'C8',
    'C9',
    'D1',
    'D2',
    'D3',
    'D4',
    'D5',
    'D6',
    'D7',
    'D8',
    'D9',
]

app.use(router);
app.use(cors());

io.on('connection', (socket) => {
    console.log('We have a new connection.');
    
    socket.on('join', ({ name, room }, callback) => {
        const { error, user } = addUser({ id: socket.id, name, room});

        if (error) return callback(error);
        
        socket.join(user.room);
        socket.emit('message', { user: 'admin', text: `${user.name}, welcome to the room ${user.room}!` });
        // sends a message to everyone BESIDES that specific user
        socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name}, has joined!`});
        
        // remember that the user object is currently in the format of
        // user = { id, name, room} -- so calling user.room is just accessing
        // that key/value pair of the user object

        io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });

        callback();
    });

    // user generated message function. we emit an event from backend to frontend, 
    // but in sendMessage we're expecting something from the frontend to the backend
    socket.on('sendMessage', (message, callback) => {
        // socket is a specific instance of the user, so we're just getting that user's id
        const user = getUser(socket.id);
        io.to(user.room).emit('message', { user: user.name, text: message });
        callback();
    });

    socket.on('disconnect', () => {
        const user = removeUser(socket.id);

        if (user) {
            io.to(user.room).emit('message', { user: 'admin', text: `${user.name} has left.`});
            io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });
        }
        console.log('User has left.');
    });

    // Distribute cards
    socket.on('distribute', (message, callback) => {
        // pass
        const user = getUser(socket.id);
        
        // Card is an array that contains: 4 perks, 3 red flagss
        var playerHand = [];
        for (var i = 0; i < 4; i++) {
            const card = perks[Math.floor(Math.random() * perks.length)];
            playerHand.push(card);
        }
        for (var i = 0; i < 3; i++) {
            const card = redflags[Math.floor(Math.random() * redflags.length)];
            playerHand.push(card);
        }
        
        // Return the user's hand as an array
        io.to(user.room).emit('message', { user: user.name, text: playerHand});

        callback();
    });

    // Send two perks
    socket.on('whitecard', () => {
        // pass
    });
    
    // Send one red flag
    socket.on('redcard', () => {
        // pass
    });

    // Host goes to next person to make their case
    socket.on('confirm', () => {
        // pass
    });

    // Host starts, games begin
    socket.on('ready', () => {
        // Instantiate a deck. 
    });

    // Show individual card, probably a broadcast
    socket.on('reveal', () => {
        // pass
    });
})

server.listen(PORT, () => console.log(`Server has started on port ${PORT}`));