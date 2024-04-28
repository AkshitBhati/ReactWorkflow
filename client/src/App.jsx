import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Signup from './pages/signup/Signup'
import Signin from './pages/signin/Signin'
import Workflow from './pages/workflow/Workflow'
import AllWorkflow from './pages/allWorkflow/AllWorkflow'
import Home from './pages/home/Home'
import Navbar from './components/Navbar/Navbar'
import {Toaster} from "react-hot-toast"
import UploadFile from './components/uploadFile/UploadFile'
import Profile from './pages/profile/Profile'


const App = () => {
  return (
    <>
    <Navbar />
    <Toaster />
    <Routes>
    <Route path='/' element={<Home />}/>
    <Route path='/signin' element={<Signin />} />
    <Route path='/signup' element={<Signup />} />
    <Route path='/workflow' element={<Workflow />} />
    <Route path='/execution' element={<UploadFile />} />
    <Route path='/profile' element={<Profile />} />
    <Route path='/workflow/:id' element={<AllWorkflow />}/>
    </Routes>
    </>
    

  )
}

export default App
