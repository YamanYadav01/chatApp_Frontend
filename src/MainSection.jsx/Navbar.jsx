import React from 'react'
import './Navbar.css'
import Logout from './Logout'
import axios from 'axios'
import { CiCirclePlus } from "react-icons/ci";
import { useNavigate } from 'react-router-dom';
import GroupchatModal from '../GroupChat/GroupchatModal';
import { useEffect,useState } from 'react'
function Navbar({onSelectedFriend,IsOpen,setSelectedGroup}) {
    const [contactList, setContactList] = useState([]);
    const [groupList, setGroupList] = useState([]);
    const [show, setShow] = useState(false);   //create group 

    const senderId = JSON.parse(localStorage.getItem("userId")|| "");
    const sidebar = document.querySelector(".active");
    
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

    useEffect(()=>{
       axios.get(`${API_URL}/user/contactlist`)
       .then((res)=>{
           setContactList(res.data.ContactData);
        })
         axios.get(`${API_URL}/user/getgroups`)
       .then((res)=>{
         setGroupList(res.data.GroupData);
        })
    },[]);

  return (
    <>
    <GroupchatModal show={show} setShow={setShow}/>
    <div className={`Nav ${IsOpen? 'active':""}`} >
        <div>
        <h3 className='NavHead'>Quick Chat</h3>
        <button onClick={()=>setShow(prev=>!prev)}>New Group <CiCirclePlus /></button>
        </div>
        <hr></hr> 
        <div className='userlist'>
          {groupList
          .filter(group => group.members.includes(senderId)).
          map((grplist)=>(
            <div>
              <div className='user' onClick={()=>{setSelectedGroup(grplist);
               onSelectedFriend(null); sidebar.classList.remove("active");}}> 
              <div className='circle'></div><span className='username' >@-{grplist.groupname}</span>
              </div>
            </div>
          ))

          }
        {contactList.map((Data)=>(
          <div>
          <div className='user' onClick={()=>{onSelectedFriend(Data);
           setSelectedGroup (null);  sidebar.classList.remove("active");}}>
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
