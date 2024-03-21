import { useState } from 'react'

import './App.css'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'

function App() {

Home

  return (
    <>
  <BrowserRouter>
    <Routes>
    <Route path='/' element={<Navigate to={"landingPage"}/>}/>
      
      <Route path='/' element={<Navigate to={"home"} />} />
      <Route path='/home' element={<Home/>} />
      <Route/>
      <Route/>
    </Routes>
  </BrowserRouter>
    </>
  )
}

export default App
