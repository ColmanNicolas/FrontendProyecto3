import React from 'react';
import LoginComp from '../../components/servicePageComponents/login/LoginComp';
import Navbar from "../../components/servicePageComponents/navBar/Navbar";
import Footer from '../../components/servicePageComponents/Footer';

const LoginUser = () => {
  return (
    <>
      <Navbar />
      <main className="container-fluid p-0">
        <LoginComp />
      </main>
      <Footer></Footer>


    </>
  );
};

export default LoginUser;