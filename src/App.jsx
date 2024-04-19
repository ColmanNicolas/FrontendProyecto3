import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

import Home from './pages/Home'
import PrincipalAuth from '../src/pages/principalPages/PrincipalAuth'
import LandingPage from './pages/principalPages/LandingPage'
import PrincipalMyAccount from './pages/principalPages/PrincipalMyAccount'
import PrincipalAdminPage from './pages/principalPages/PrincipalAdminPage'
import '../src/App.css'

import ServiceAdminPage from '../src/pages/ServiceAdminPage'

function App() {
  
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Navigate to={"/bar-app/home"} />} />
          <Route path='/bar-app/home' element={<Home />} />
          <Route path='/bar-app/landing-page' element={<LandingPage/>} />
          <Route path='/bar-app/landing-page/auth' element={<PrincipalAuth/>} />
          <Route path='/bar-app/mi-cuenta/:id' element={<PrincipalMyAccount/>} />
          <Route path='/bar-app/principal-admin-controls' element={<PrincipalAdminPage/>} />
          <Route path='/service/admin-controls' element={<ServiceAdminPage/>} />
          <Route />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
