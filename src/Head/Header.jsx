import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './header.css'
import { useNavigate } from 'react-router-dom';
import { TbLogout2 } from "react-icons/tb";

function Header({selectedFriend,IsOpen,isOpen}) {

  const Navigate = useNavigate();

  // const toggleBtn = document.querySelector(".manubar");
  // toggleBtn.addEventListener("click", () => {
  // sidebar.classList.toggle("active");
  // });
  
  const handleClick = () => {
    // sidebar.classList.toggle("active");
    if(isOpen==false){
      IsOpen(true);
    }
    else{
      IsOpen(false);
    }
  }
  
  return ( 
    <>
      <div className='chatHeader'>
    <Navbar bg="primary" data-bs-theme="dark">
        <Container>
          <Nav className="me-auto">
          <div className='chatUser'>
          {selectedFriend ? (
                <div className='messageHeader'>
                     <span className='manubar' onClick={handleClick}>☰</span>&nbsp;
                    <div className='circle'></div><span className='username' id={selectedFriend._id}>{selectedFriend.username}</span>
                </div>)
               :(
        <h2><span className='manubar"' onClick={handleClick}>☰</span>&nbsp;Select a friend to start chatting</h2>
      )
          }
          </div>
          </Nav>
        </Container>
      </Navbar>
      </div>
    </>
  )
}

export default Header
