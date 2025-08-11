import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './header.css'

function Header({selectedFriend}) {
  
  return ( 
    <>
      <div className='chatHeader'>
    <Navbar bg="primary" data-bs-theme="dark">
        <Container>
          <Nav className="me-auto">
          <div className='chatUser'>
          {selectedFriend ? (
                <div className='messageHeader'>
                    <div className='circle'></div><span className='username' id={selectedFriend._id}>{selectedFriend.username}</span>
                </div>)
               :(
        <h2>Select a friend to start chatting</h2>
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
