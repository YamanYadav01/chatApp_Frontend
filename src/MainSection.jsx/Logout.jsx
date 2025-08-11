import React from 'react'
import { TbLogout2 } from "react-icons/tb";
import axios from 'axios';
import cookie from 'js-cookie'
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { ToastContainer,toast } from 'react-toastify';

function Logout() {
 const Navigate = useNavigate();
const handleClick = () => {

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
  const notify = (message)=>toast(message);
  axios.get(`${API_URL}/user/logout`, { withCredentials: true }) // important if cookie is HttpOnly
    .then((res) => {
      alert("logout response:", res);
      // Remove the cookie from browser
      Cookies.remove("tokenData");
      if(res.data.msg){
        notify(res.data.msg);
        Navigate('/signin');
      }
    })
    .catch((err) => {
      alert("Logout error:", err);
    });
};

  return (
    <div>
        <ToastContainer />
     <div className="logout-container" onClick={handleClick}>
       { <TbLogout2 />}
        <span className="logout-icons">&nbsp;Logout</span>
      </div>
    </div>
  )
}

export default Logout
