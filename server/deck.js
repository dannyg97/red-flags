// Helper functionality for deck
var whiteflags = [
    'A1',
    'A2',
    'A3',
    'A4',
    'A5',
    'A6',
    'A7',
    'A8',
    'A9'
];

var redflags = [
    'B1',
    'B2',
    'B3',
    'B4',
    'B5',
    'B6',
    'B7',
    'B8',
    'B9',
    'C1',
    'C2',
    'C3',
    'C4',
    'C5',
    'C6',
    'C7',
    'C8',
    'C9'
]


const distributeCard = ({ id, name, room }) => {
    // Javascript Mastery = javascriptmastery

    name = name.trim().toLowerCase();
    room = room.trim().toLowerCase();

    const existingUser = users.find((user => user.room === room && user.name === name));

    if (existingUser) {
        
        return { user };
    }
    
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

const resetDeck = (room) => {
    var whiteflags = [
        'A1',
        'A2',
        'A3',
        'A4',
        'A5',
        'A6',
        'A7',
        'A8',
        'A9'
    ];
    
    var redflags = [
        'B1',
        'B2',
        'B3',
        'B4',
        'B5',
        'B6',
        'B7',
        'B8',
        'B9',
        'C1',
        'C2',
        'C3',
        'C4',
        'C5',
        'C6',
        'C7',
        'C8',
        'C9'
    ]

}

module.exports = { resetDeck };