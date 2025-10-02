import React, { useState } from 'react'
import Navbar from './Navbar.jsx'
import Header from '../Head/Header'
// import ChatSection from './chatSection'
import ChatSection from './ChatSection'
import './Main.css'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
function Mainsection() {
  const [selectedFriend, setSelectedFriend] = useState();
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
      <Navbar onSelectedFriend={setSelectedFriend} IsOpen={isOpen}></Navbar>
      <div>
      <Header selectedFriend={selectedFriend} IsOpen={setisOpen} isOpen={isOpen}></Header>
      <ChatSection selectedFriend={selectedFriend}></ChatSection>
      </div>
    </div>
  )
}

export default Mainsection;
