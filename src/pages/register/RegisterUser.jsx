import React from 'react'
import '../register/RegisterUser.css'
import Form from '../../components/formRegister/Form'
import Navbar from "../../components/navBar/Navbar";



const RegisterUser = () => {
  return (
    <>  
      <Navbar />
      <section className="min-vh-100 d-flex  flex-column">
        {/* <header className="bg-danger d-flex justify-content-between align-items-center">
          <h1>Pagina de Registro</h1>              
        </header> */}

        <main className="container-fluid">
          < Form />
          <div className="container-fluid w-100">
            <hr className="text-white" />
          </div>
        </main>

        {/* <footer className="bg-danger mt-auto">
          <h1>FOOTER REGISTRO</h1>
        </footer> */}

        

      </section>
    </>
  )
}

export default RegisterUser

