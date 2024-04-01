import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

import Home from './pages/Home'
import ServiceAdminPage from './pages/ServiceAdminPage'
import LandingPage from './pages/LandingPage'
import './App.css'
import PrincipalAuth from './pages/PrincipalAuth'

function App() {
  
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Navigate to={"/bar-app/home"} />} />
          <Route path='/bar-app/home' element={<Home />} />
          <Route path='/admin-controls' element={<ServiceAdminPage/>} />
          <Route path='/bar-app/landing-page' element={<LandingPage/>} />
          <Route path='/bar-app/landing-page/auth' element={<PrincipalAuth/>} />
          <Route />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
