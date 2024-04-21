import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

import Home from './pages/Home'
import ServiceAdminPage from './pages/ServiceAdminPage'
import LandingPage from './pages/LandingPage'
import './App.css'
import PrincipalAuth from './pages/PrincipalAuth'
import './../node_modules/bootstrap/dist/css/bootstrap.min.css'
import RegisterUser from './pages/register/RegisterUser'
import Login from './pages/login/LoginUser'


function App() {
  
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Navigate to={"home"} />} />
          <Route path='/home' element={<Home />} />
          <Route path='/admin-controls' element={<ServiceAdminPage/>} />
          <Route path='/landing-page' element={<LandingPage/>} />
          <Route path='/landing-page/auth' element={<PrincipalAuth/>} />
          <Route path='/register' element={<RegisterUser/>} />
          <Route path='/login' element={<Login/>} />
          <Route />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
