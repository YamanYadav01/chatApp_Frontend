import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import { useEffect} from 'react'
function GroupchatModal({show, setShow}) {
  // const [show, setShow] = useState();
  const [contactList, setContactList] = useState([]);
  const [groupname, setGroupname] = useState('');
  const [selectedMembers, setSelectedMembers] = useState([]);
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
  const adminId = JSON.parse(localStorage.getItem("userId")|| "");
  // console.log("send",senderId)

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleChange = (e)=>{
    setGroupname(e.target.value)
  }
  const handleMemberChange = (e)=>{
   const member = Array.from(
      e.target.selectedOptions,
      (option)=>option.value
   )
  
      setSelectedMembers(member)
  }
  const handleCreate = (e)=>{
     e.preventDefault();
      console.log("clicked", e)
      console.log("groupname", groupname, selectedMembers)
      const grpData = {
        admin: adminId,
        groupname: groupname,
        members: [...new Set([...selectedMembers, adminId])]
      }

      axios.post(`${API_URL}/user/creategroup`,grpData,{
        withCredentials:true,
        headers:{
          "Content-Type": "application/json"
        }
      })
  }

  useEffect(()=>{
       axios.get(`${API_URL}/user/contactlist`)
       .then((res)=>{
           setContactList(res.data.ContactData);
        })
    },[]);
 console.log(contactList)
  return (
    <>
      {/* <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button> */}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleCreate}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Group Name</Form.Label>
              <Form.Control
                type="text"
                name='groupName'
                autoFocus
                onChange={handleChange}
                value={groupname}
                required
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Select Members</Form.Label>
             
              <Form.Select aria-label="Default select example" multiple name='members'  onChange={handleMemberChange}>
                {contactList.map((list)=>(
                <option value={list._id}>{list.username}</option>
              ))}
              </Form.Select>

              
            </Form.Group>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancle
          </Button>
          <Button type='submit' variant="primary" onClick={handleClose}>
            Create
          </Button>
        </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default GroupchatModal;