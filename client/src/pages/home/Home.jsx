import React from 'react'
import asset from "../../assets/note.svg"
import "./Home.css"


const Home = () => {
  return (
    <div className='home'>
      <img src={asset} alt='logo' />
      <p>Create your first workflow!</p>
      <button>Create Board</button>
    </div>
  )
}

export default Home
