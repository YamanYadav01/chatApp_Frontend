import { useState } from 'react'
// import './App.css'
import SignUp from './Authentication/SignUp'
import SignIn from './Authentication/SignIn'
import Navbar from './MainSection.jsx/Navbar'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Mainsection from './MainSection.jsx/Mainsection'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Router>
      <Routes>
      <Route path="/" element={<SignUp></SignUp>}/>
      <Route path="/chat" element={<Mainsection></Mainsection>}/>
      <Route path="/signin" element={<SignIn></SignIn>}/>
      </Routes>
    </Router>
          {/* <h1>chat app</h1>
          <SignUp></SignUp>
          <SignIn></SignIn> */}
    </>
  )
}

export default App
