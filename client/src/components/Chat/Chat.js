import React, { useState, useEffect } from 'react';
import queryString from 'query-string'; // For getting data from the URL
import io from 'socket.io-client';

import './Chat.css';

import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';
import Messages from '../Messages/Messages';
import TextContainer from '../TextContainer/TextContainer';

let socket;

// location comes from react router, you basically get a URL back
const Chat = ({ location }) => {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [message, setMessage] = useState('');
    const [users, setUsers] = useState('');
    const [messages, setMessages] = useState([]);
    const ENDPOINT = 'localhost:5000';

    useEffect(() => {
        // location.search to see what you're getting back

        // const data = queryString.parse(location.search);
        // console.log(location.search);    //?name=danny&room=hi
        // console.log(data);               //Object

        const { name, room } = queryString.parse(location.search);

        socket = io(ENDPOINT);
        setName(name);
        setRoom(room);

        // you can emit events from the client-side socket
        socket.emit('join', { name, room }, (error) => {
            if (error) {
                alert(error);
            }
        });
    }, [ENDPOINT, location.search]);
    // the array, if present, will activate and create a callback but only if the values in the list change
    // if ENDPOINT or location.search changes, we re-render the useEffect. no more unnecessary side effects occurs

    useEffect(() => {
        // when the socket receives a 'message' 
        socket.on('message', message => {
            setMessages([...messages, message ]);
        });

        // when the socket receives a notification on room data
        socket.on('roomData', ({ users }) => {
            setUsers(users);
        })

        // used for unmounting and disconnect effects
        return () => {
            socket.emit('disconnect');
            socket.off();
        }
    }, [messages]);
    // only when messages changes

    const sendMessage = (event) => {
        event.preventDefault();

        if (message) {
            socket.emit('sendMessage', message, () => setMessage(''));
        }
    }

    const cardDistribute = (event) => {
        event.preventDefault();
        
        socket.emit('distribute', message, () => setMessage(''));
    }

    console.log(message, messages);

    return (
        <div className="outerContainer">
            <div className="container">
                <InfoBar room={room}/>
                <Messages messages={messages} name={name}/>
                <Input message={message} cardDistribute={cardDistribute} setMessage={setMessage} sendMessage={sendMessage}/>
            </div>
            <TextContainer users={users}/>
        </div>
    )
}

export default Chat;