import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

import Home from './pages/Home'
import PrincipalAuth from './pages/principalPages/PrincipalAuth'
import LandingPage from './pages/principalPages/LandingPage'
import PrincipalMyAccount from './pages/principalPages/PrincipalMyAccount'
import PrincipalAdminPage from './pages/principalPages/PrincipalAdminPage'
import './App.css'
import './../node_modules/bootstrap/dist/css/bootstrap.min.css'
import ServiceMenuList from './pages/servicePages/ServiceMenuList'
import RegisterUser from './pages/servicePages/RegisterUser'
import LoginUser from './pages/servicePages/LoginUser'
import ServiceMenus from './pages/servicePages/ServiceMenus'
import ServiceAdminPage from './pages/servicePages/ServiceAdminPage'
import ServiceMyAccount from './pages/servicePages/ServiceMyAccount'




function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<Navigate to="/bar-app/home" />} />
          <Route path="/" element={<Navigate to="/bar-app/home" />} />
          <Route path='/bar-app/home' element={<Home />} />
          <Route path='/bar-app/landing-page' element={<LandingPage />} />
          <Route path='/bar-app/landing-page/auth' element={<PrincipalAuth />} />
          <Route path='/bar-app/mi-cuenta/:id' element={<PrincipalMyAccount />} />
          <Route path='/bar-app/principal-admin-controls' element={<PrincipalAdminPage />} />
          <Route path='/service/admin-controls' element={<ServiceAdminPage />} />
          <Route path='/service/register' element={<RegisterUser />} />
          <Route path='/service/login' element={<LoginUser />} />
          <Route path='/service/products-menu' element={<ServiceMenus />} />
          <Route path='/service/menu-list' element={<ServiceMenuList />} />
          <Route path='/service/mi-cuenta' element={<ServiceMyAccount />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
