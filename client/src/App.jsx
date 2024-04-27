import React from 'react'
import Signup from './pages/signup/Signup'
import Signin from './pages/signin/Signin'
import Workflow from './pages/workflow/Workflow'
import UploadFile from './pages/uploadFile/UploadFile'
import AllWorkflow from './pages/allWorkflow/AllWorkflow'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/home/Home'
import Navbar from './components/Navbar/Navbar'



const App = () => {
  return (
    <>
    <Navbar />
    <Routes>
    <Route path='/' element={<Home />}/>
    <Route path='/signin' element={<Signin />} />
    <Route path='/signup' element={<Signup />} />
    <Route path='/workflow' element={<Workflow />} />

    </Routes>
    </>
    
  //  <Signup />
  // <Signin />
  // <Workflow />
  // <UploadFile />
  // <AllWorkflow />
  )
}

export default App
