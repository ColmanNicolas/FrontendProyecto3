import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

import Home from './pages/Home'
import ServiceMyAccount from './pages/ServiceMyAccount'
import PrincipalAuth from '../src/pages/principalPages/PrincipalAuth'
import LandingPage from './pages/principalPages/LandingPage'
import PrincipalMyAccount from './pages/principalPages/PrincipalMyAccount'
import PrincipalAdminPage from '../src/pages/principalPages/PrincipalAdminPage'
import ServiceMenus from '../src/pages/ServiceMenus'
import ServiceAdminPage from '../src/pages/ServiceAdminPage'
import '../src/App.css'
import RegisterUser from './pages/register/RegisterUser'
import Login from './pages/login/LoginUser'
import './../node_modules/bootstrap/dist/css/bootstrap.min.css'
import ServiceMenuList from './pages/ServiceMenuList'




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
          <Route path='/service/register' element={<RegisterUser/>} />
          <Route path='/service/login' element={<Login/>} />
          <Route path='/service/products-menu' element={<ServiceMenus/>} />
          <Route path='/service/menu-list' element={<ServiceMenuList/>} />
          <Route path='/service/mi-cuenta' element={<ServiceMyAccount/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
