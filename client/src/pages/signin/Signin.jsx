import React, { useState } from 'react'
import { IoMdEye, IoIosEyeOff } from "react-icons/io";
import "./Signin.css"

const Signin = () => {
    const [show, setShow] = useState(false)

    const showPassword = () => {
        setShow(!show)
    }
  return (
    <div className='signin-container'>
      <h1>SignIn</h1>

      <div className='signin-form'>
        

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

        <button>SignIn</button>
            <p style={{fontSize:"15px"}}>New Here? <span style={{color:"rgb(9, 106, 197)", cursor:"pointer", textDecoration:"underline"}}>SignUp</span></p>
      </div>
    </div>
  )
}

export default Signin
