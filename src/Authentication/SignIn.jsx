import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Auth.css'
import axios from 'axios';
import { ToastContainer,toast } from 'react-toastify';
function SignIn() {
  const Navigate = useNavigate();

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
  const notify = (message,navPath) => {
    toast(message);
    Navigate(navPath);
  }
  const [formData, setFormData] = useState({
      email:"",
      password:""
    })

  const handleChange = (e)=>{
        const {name,value} = e.target;
        setFormData((prev)=>({
          ...prev,
          [name]:value
        }))
  }

  const handleSubmit = (e)=>{
    e.preventDefault();
     const userData = {
      email: formData.email,
      password:formData.password
     }

     axios.post(`${API_URL}/user/signin`, userData, {
      withCredentials: true
    })    
    .then(res => {
      if(res.data){
        // set data in localStorage
        localStorage.setItem("usermail",JSON.stringify(res.data.email));
        localStorage.setItem("userId",JSON.stringify(res.data.id));
        notify(res.data.msg,'/chat');


      }

    })
    .catch(err => {
      alert("Sign-in error:", err.message);
    });
  }
  return (
    <>
       <ToastContainer/>
    <div className='FormContainer'>
    <Form className='auth' onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formGroupEmail">
        <Form.Label>Email address</Form.Label>
         <Form.Control type="email" name="email" value={formData.email} onChange={(e)=>handleChange(e)} placeholder="Enter email" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formGroupPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" name="password" value={formData.password} onChange={(e)=>handleChange(e)} placeholder="Password" />
      </Form.Group>
      <p className='goto'>Don't have an account?  <span><Link to={'/'}>sign up</Link></span></p>
      <Button type='submit' variant="primary">SignIn</Button>
    </Form> 
    </div>
    </>
  );
}

export default SignIn;