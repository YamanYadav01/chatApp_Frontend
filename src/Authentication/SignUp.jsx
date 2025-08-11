import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link, Navigate } from "react-router-dom";
import './Auth.css'
import axios from 'axios'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

function SignUp() {
    const [message, setMessage] = useState("");
    const Navigate = useNavigate();
    const notify = (message) => toast(message);
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

  const [formData, setFormData] = useState({
    email:"",
    username:"",
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
      username: formData.username,
      password:formData.password
     }

   axios.post(`${API_URL}/user/signup`,userData)
   .then(res=>{
    if(res.data.message){
      // alert(res.data.message);
      setMessage(res.data.message);
      notify();
      Navigate('/signin')
    }
  
   })
  }
  return (
    <>
    <ToastContainer />
    <div className='FormContainer'>
    <Form className='auth'>
      <Form.Group className="mb-3" controlId="formGroupEmail">
        <Form.Label>Email address</Form.Label> 
        <Form.Control type="email" name="email" value={formData.email} onChange={(e)=>handleChange(e)} placeholder="Enter email" />
      </Form.Group>
      <Form.Group className="mb-3"  controlId="formGroupEmail">
        <Form.Label>Username</Form.Label>
        <Form.Control type="text" name="username" value={formData.username} onChange={(e)=>handleChange(e)} placeholder="Enter username" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formGroupPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" name="password" value={formData.password} onChange={(e)=>handleChange(e)} placeholder="Password" />
      </Form.Group>
      <p className='goto'>Already have an account? <span><Link to={'/signin'}>sign in</Link></span></p>
      <Button type='submit' className="signupBtn" variant="primary" onClick={handleSubmit}>SignUp</Button>
    </Form> 
    </div>
    </>
  );
}

export default SignUp;