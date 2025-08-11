import React, { useEffect, useState } from 'react'
import axios from 'axios'
import socket from '../socket'
import './Message.css'

function Message({selectedFriend}) {
  const [chats, setChats] = useState(["no chats yet"]);
  const senderId = JSON.parse(localStorage.getItem("userId")|| "");

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
  // Listen for incoming messages (real-time)
  useEffect(() => {
    const handleMessage = (msg) => {
      // Assume msg is a single message object
      const newMessage = {
        message: msg.messages,
        createDate: new Date(msg.date),
        sender: msg.senderId,
      };
       setChats(prevChats => {
      if (!prevChats || !Array.isArray(prevChats.messageData)) {
        return {
          ...prevChats,
          messageData: [newMessage]
        };
      }

      
      return {
        ...prevChats,
        messageData: [...prevChats.messageData, newMessage]
      };
    });
    };
    socket.on("message", handleMessage);

    return () => {
      socket.off("message", handleMessage);
    };
  }, []);
  
  // fetch messages
  useEffect(() => {
  const fetchConversation = async () => {
    try {
      const res = await axios.get(`${API_URL}/user/converstation/${selectedFriend}/${senderId}`);
      setChats(res.data.conversations);
      
      // setChats(prevChats => [...prevChats, res.data.conversations]);

    } catch (error) {
      alert("Failed to fetch conversation:", error);
    }
  };

  if (selectedFriend && senderId) {
      fetchConversation();
    }
}, [selectedFriend,senderId]); // Add these dependencies if they change

  return (
       <div>
        <div className='message'>
          {chats && chats.messageData && chats.messageData.map((chat, index) => (
            <div key={index} className={`chat-bubble ${chat.sender === senderId ? 'sender' : 'receiver'}`}>
              <span style={{fontSize:"15px"}}>{new Date(chat.createDate).toLocaleTimeString()}</span>
              <p>{chat.message}</p>
            </div>
          ))}
        </div>
      </div>

  )
}

export default Message
