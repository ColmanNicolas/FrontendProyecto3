import React from 'react'
import '../servicePages/RegisterUser.css'
import Form from '../../components/servicePageComponents/formRegister/Form'
import Navbar from "../../components//servicePageComponents/navBar/Navbar";
import Footer from '../../components/servicePageComponents/Footer';



const RegisterUser = () => {
  return (
    <>  
      <Navbar />
      <section className="d-flex  flex-column">
        <main className="container-fluid p-0">
          < Form />
          <div className="container-fluid w-100 ">
          </div>
        </main>

        <Footer></Footer>

        

        

      </section>
    </>
  )
}

export default RegisterUser

