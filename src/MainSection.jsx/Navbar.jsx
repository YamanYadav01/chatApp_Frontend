import React from 'react'
// import './Navbar.css'
import '../App.css'
import Logout from './Logout'
import axios from 'axios'
import { useEffect,useState } from 'react'
function Navbar({onSelectedFriend}) {
    const [contactList, setContactList] = useState([]);
    
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

    useEffect(()=>{
       axios.get(`${API_URL}/user/contactlist`)
       .then((res)=>{
           setContactList(res.data.ContactData);
        })
    },[]);

  return (
    <>
    <div className='Nav'>
        <div>
        <h3 className='NavHead'>Quick Chat</h3>
        </div>
        <hr></hr> 
        <div className='userlist'>
        {contactList.map((Data)=>(
          <div>
          <div className='user' onClick={()=>onSelectedFriend(Data)}>
          <div className='circle'></div><span className='username' >{Data.username}</span>
          </div>
          {/* <hr></hr> */}
          </div>
            ))
        }
        </div>
        <hr></hr> 
        <div className='logout'>
        <Logout></Logout>
        </div>
    </div>
    </>
  )
}

export default Navbar
