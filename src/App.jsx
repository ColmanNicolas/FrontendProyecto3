import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

import Home from './pages/Home'
import ServiceAdminPage from '../src/pages/ServiceAdminPage'
import '../src/App.css'
import PrincipalAuth from '../src/pages/principalPages/PrincipalAuth'
import LandingPage from './pages/principalPages/LandingPage'
import PrincipalMyAccount from './pages/principalPages/PrincipalMyAccount'

function App() {
  
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Navigate to={"/bar-app/home"} />} />
          <Route path='/bar-app/home' element={<Home />} />
          <Route path='/service/admin-controls' element={<ServiceAdminPage/>} />
          <Route path='/bar-app/landing-page' element={<LandingPage/>} />
          <Route path='/bar-app/landing-page/auth' element={<PrincipalAuth/>} />
          <Route path='/bar-app/mi-cuenta/:id' element={<PrincipalMyAccount/>} />
          <Route />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
