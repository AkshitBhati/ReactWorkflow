import React, { useState } from 'react'
import { IoMdEye, IoIosEyeOff } from "react-icons/io";
import { Link, useNavigate } from 'react-router-dom';
import { ClipLoader } from "react-spinners"
import "./Signup.css"

const Signup = () => {
    const [show, setShow] = useState(false)
    const [formData, setFormData] = useState({});
    const [errMessage, setErrMessage] = useState(null)
    const [loading, setLoading] = useState(false)

    const showPassword = () => {
        setShow(!show)
    }
    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
    };

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
      e.preventDefault();
      if (!formData.username || !formData.email || !formData.password) {
        return setErrMessage('Please fill out all fields');
      }
      try {
        setLoading(true)
        setErrMessage(null)
        const res = await fetch('/api/auth/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
    
        const data = await res.json();
        if (data.success === false) {
          return setErrMessage(data.message);
        }
        setLoading(false)
        if(res.ok){
          navigate('/signin')
        }
      } catch (err) {
        setErrMessage(err.message)
        setLoading(false)
      }
    };
    
  return (
    <div className='signup-container'>
      <h1>Signup</h1>

      <div className='signup-form'>
        <div className='form-section'>
            <p>Username</p>
            <input type="text" id='username' onChange={handleChange} value={formData.username}/>
        </div>

        <div className='form-section'>
            <p>Email</p>
            <input type="text" id='email' onChange={handleChange} value={formData.email}/>
        </div>

        <div className='form-section'>
            <p>Password</p>
            <div style={{display:"flex", alignItems:"center"}}>
            <input type={show ? "text" : "password"} id='password' onChange={handleChange} value={FormData.password}/>
            <p style={{fontSize:"19px", cursor:"pointer"}} onClick={showPassword}>{show ? <IoMdEye />:<IoIosEyeOff />}</p>
            </div>
        </div>

        <button onClick={handleSubmit}> {loading ? (
              <div style={{display:"flex", alignItems:"center", justifyContent:"center", gap:"10px"}}>
              <ClipLoader size={15} color='#fff'/>
              <span className='pl-3'>Loading ...</span>
              </div>
            ) : "Sign Up"}</button>
            <p style={{fontSize:"15px"}}>Already have account?<Link to={"/signin"}><span style={{color:"rgb(9, 106, 197)", cursor:"pointer", textDecoration:"underline"}}> SignIn</span></Link></p>

            {errMessage && (
              <div className='failure'>
          <p >{errMessage}</p>
                </div>
        )}
      </div>
    </div>
  )
}

export default Signup
