// Helper functionality for users

const users = [];

const addUser = ({ id, name, room }) => {
    // Javascript Mastery = javascriptmastery

    name = name.trim().toLowerCase();
    room = room.trim().toLowerCase();

    const existingUser = users.find((user => user.room === room && user.name === name));

    if (existingUser) {
        return { error: 'Username is taken' };
    }

    var point = 0;
    var isHost = false;
    var isCurrent = false;

    const user = { 
        id,         // unique id of user
        name,       // user name
        room,       // user room
        point,      // user point total
        isHost,     // if they are the host, they choose when to start the game
        isCurrent   // if they are the current player, they decide?
    };

    users.push(user);

    return { user };
}

const removeUser = (id) => {
    const index = users.findIndex((user) => user.id === id);
    if (index !== -1 ) {
        return users.splice(index, 1)[0];
    }
}

const getUser = (id) => {
    return users.find((user) => user.id === id);
}

const getUsersInRoom = (room) => {
    return users.filter((user) => user.room === room);
}

module.exports = { addUser, removeUser, getUser, getUsersInRoom };