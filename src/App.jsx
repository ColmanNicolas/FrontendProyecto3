import { useState } from 'react'

import './App.css'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import ServiceAdminPage from './pages/ServiceAdminPage'

function App() {

  ServiceAdminPage

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Navigate to={"home"} />} />
          <Route path='/home' element={<Home />} />
          <Route path='/admin-controls' element={<ServiceAdminPage/>} />
          <Route />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
