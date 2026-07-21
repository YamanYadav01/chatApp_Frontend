import React, { useEffect, useState } from 'react'
import Form from 'react-bootstrap/Form';
import { AiOutlineSend } from "react-icons/ai";
import './chat.css'
import Message from '../Chat/Message';
import socket from '../socket'
import axios from 'axios'
function ChatSection({selectedFriend,selectedGroup}) {
  const [message, setMessage] = useState()
  const [grpmessage, setGrpMessage] = useState()

  const senderId = JSON.parse(localStorage.getItem("userId")|| "");
  
  const handleChange = (e)=>{
        setMessage(e.target.value);
  }

  const sendMessage = (id)=>{
         
        const messageData = {
              senderId : senderId,
              ReceverId : id,
              messages  :  message,
              date :  Date.now(),
              msgType:"Private"
            }
            socket.emit("Chat",messageData);
      
        setGrpMessage("");
  }

//   Group Message
  const sendGroupMessage = (id)=>{
         
        const messageData = {
              senderId : senderId,
              GroupName: selectedGroup.groupname,
              groupId : id,
            //   senderName: 
              messages  :  message,
              date :  Date.now(),
              msgType:"Group"

            }
            socket.emit("Group",messageData);

            console.log("messageData: ",messageData)
      ;
        setMessage("");
  }
  return (
          <>
         {selectedGroup ?
            (<>
            <div className='chatArea'>
            <Message selectedGroup={selectedGroup._id}></Message>
           
            </div>
            <Form.Control type="text" style={{width:"60vw"}} className='chatfield' placeholder="write your message" value={message} onChange={handleChange} name="Message"/>
            <span><AiOutlineSend className='sendBtn' onClick={()=>sendGroupMessage(selectedGroup._id)}/></span>
            </>)
         :selectedFriend ?
           ( <>
            <div className='chatArea'>
            <Message selectedFriend={selectedFriend._id}></Message>
           
            </div>
            <Form.Control type="text" style={{width:"60vw"}} className='chatfield' placeholder="write your message" value={message} onChange={handleChange} name="Message"/>
            <span><AiOutlineSend className='sendBtn' onClick={()=>sendMessage(selectedFriend._id)}/></span>
            </>)
            :
           ( <p>Not here any chat</p>)
         }
        </> 
      )
}

export default ChatSection
