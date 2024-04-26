import React, { useState } from 'react'
import { IoMdEye, IoIosEyeOff } from "react-icons/io";
import "./Signup.css"

const Signup = () => {
    const [show, setShow] = useState(false)

    const showPassword = () => {
        setShow(!show)
    }
  return (
    <div className='signup-container'>
      <h1>Signup</h1>

      <div className='signup-form'>
        <div className='form-section'>
            <p>Username</p>
            <input type="text" />
        </div>

        <div className='form-section'>
            <p>Email</p>
            <input type="text" />
        </div>

        <div className='form-section'>
            <p>Password</p>
            <div style={{display:"flex", alignItems:"center"}}>
            <input type={show ? "text" : "password"} />
            <p style={{fontSize:"19px", cursor:"pointer"}} onClick={showPassword}>{show ? <IoMdEye />:<IoIosEyeOff />}</p>
            </div>
        </div>

        <button>SignUp</button>
            <p style={{fontSize:"15px"}}>Already have account? <span style={{color:"rgb(9, 106, 197)", cursor:"pointer", textDecoration:"underline"}}>SignIn</span></p>
      </div>
    </div>
  )
}

export default Signup
