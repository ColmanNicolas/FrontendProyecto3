import React from 'react'
import '../servicePages/RegisterUser.css'
import Form from '../../components/formRegister/Form'
import Navbar from "../../components/navBar/Navbar";
import Footer from '../../components/Footer';



const RegisterUser = () => {
  return (
    <>  
      <Navbar />
      <section className="d-flex  flex-column">
        {/* <header className="bg-danger d-flex justify-content-between align-items-center">
          <h1>Pagina de Registro</h1>              
        </header> */}

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

