import React from 'react';
import LoginComp from '../../components/login/LoginComp';
import Navbar from "../../components/navBar/Navbar";

const LoginUser = () => {
    return (
        <>
          <Navbar />
          
             
            <main className="container-fluid">
              <LoginComp />
            </main>
    
            {/* <footer className="mt-auto">
              <h1>FOOTER INICIO DE SESION</h1>
            </footer> */}
         
        </>
    );
};

export default LoginUser;