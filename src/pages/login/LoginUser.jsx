import React from 'react'
import LoginComp from '../../components/login/LoginComp'


const LoginUser = () => {
    return (
        <>
          <section className="min-vh-100 d-flex  flex-column">
            <header className="bg-danger d-flex justify-content-between align-items-center">
              <h1>Inicio de sesión</h1>              
            </header>
    
            <main className="container-fluid   bg-dark">
              < LoginComp />
              <div className="container-fluid w-100">
                <hr className="text-white" />
              </div>
            </main>
    
            <footer className="bg-danger mt-auto">
              <h1>FOOTER INICIO DE SESION</h1>
            </footer>
    
            
    
          </section>
        </>
      )
}

export default LoginUser