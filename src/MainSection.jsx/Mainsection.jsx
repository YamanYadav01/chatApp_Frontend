import React, { useState } from 'react'
import Navbar from './Navbar.jsx'
import Header from '../Head/Header'
// import ChatSection from './chatSection'
import ChatSection from './ChatSection'
import './Main.css'
import { useEffect } from 'react'
import GroupchatModal from '../GroupChat/GroupchatModal.jsx'
import { useNavigate } from 'react-router-dom'
function Mainsection() {
  const [selectedFriend, setSelectedFriend] = useState();
  const [selectedGroup, setSelectedGroup] = useState();
  const [isOpen, setisOpen] = useState(false);
  const Navigate = useNavigate();
  // const userdata = localStorage.getItem("usermail")|| "";
 
  useEffect(()=>{
    // if(userdata==""){
    //    Navigate("/signin")
    // }
  })
  return (
    <div className='main'>
      <Navbar onSelectedFriend={setSelectedFriend} setSelectedGroup={setSelectedGroup} IsOpen={isOpen}></Navbar>
      <div>
      <Header selectedFriend={selectedFriend} selectedGroup={selectedGroup} IsOpen={setisOpen} isOpen={isOpen}></Header>
      <ChatSection selectedFriend={selectedFriend} selectedGroup={selectedGroup}>

      </ChatSection>
      <GroupchatModal></GroupchatModal>
      </div>
    </div>
  )
}

export default Mainsection;
