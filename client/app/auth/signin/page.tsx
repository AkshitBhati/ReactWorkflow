"use client"

import React, { useState } from 'react'
import { IoIosEyeOff, IoMdEye } from "react-icons/io";


const SignUp = () => {
  const [show, setShow] = useState<boolean>(false)
  
  const showPassword = () => {
    setShow(!show)
  }
  
  return (
    <div className='border m-auto md:w-[35%] sm:w-[80%]  rounded-md p-2 mt-5 bg-slate-100'>
      <h1 className='font-Poppins-500 text-2xl'>Signup</h1>
        <div className='mt-6 flex flex-col'>
      <div className='mt-3'>
        <p className='text-sm'>Username</p>
        <input type="text" className='w-[85%]  rounded-sm p-0.5'/>
      </div>

      <div className='mt-3'>
        <p className='text-sm'>Email</p>
        <input type="text" className='w-[85%] rounded-sm p-0.5'/>
      </div>

      <div className='mt-3 '>
        <p className='text-sm'>Password</p>
        <div className='flex items-center gap-2'>

        <input type={show ? "text" : "password"} className='w-[85%] rounded-sm p-0.5'/>
        <p className='cursor-pointer text-xl' onClick={showPassword}> {show ? <IoMdEye /> :<IoIosEyeOff /> } </p>
        </div>
      </div>
      <button className='border  mt-6 p-2 bg-purple-600 text-white w-[96%] rounded-md'>Signup</button>

      <div className='mt-4'>
        <p className='text-sm ml-2'>Already have an account? <span className='underline text-blue-400 cursor-pointer'>Signin</span></p>
      </div>
        </div>
    </div>
  )
}

export default SignUp
