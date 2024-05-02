import React from 'react';
import LoginComp from '../../components/login/LoginComp';
import Navbar from "../../components/navBar/Navbar";
import Footer from '../../components/Footer';

const LoginUser = () => {
    return (
        <>
          <Navbar />
          
             
            <main className="container-fluid">
              <LoginComp />
            </main>
            <Footer></Footer>
            
         
        </>
    );
};

export default LoginUser;