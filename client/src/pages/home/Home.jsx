import React, { useState } from 'react'
import asset from "../../assets/note.svg"
import { useSelector } from 'react-redux'
import {  useNavigate, Navigate } from 'react-router-dom'
import "./Home.css"


const Home = () => {
  const { currentUser } = useSelector(state => state.user)

  const navigate = useNavigate()
  
  const navigateHandler = () => {
    if (!currentUser) {
      navigate("/signin")
    }
    else navigate("/workflow")
  }

  return (
    <div className='home'>
      <img src={asset} alt='logo' />
      <p>Create your first workflow!</p>
      <button onClick={navigateHandler}>Create Workflow</button>
    </div>
  )
}

export default Home
