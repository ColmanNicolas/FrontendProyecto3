import { useState } from "react";
import FormPrincipalLogin from "../components/superAdminComponents/FormPrincipalLogin";
import FormPrincipalRegister from "../components/superAdminComponents/FormPrincipalRegister";
import "../pages/PrincipalAuth.css"
const PrincipalAuth = () => {

    const [opcionSeleccionada, setOpcionSeleccionada] = useState("LOGIN");

    const setearFormulario = (opcion) => {
        setOpcionSeleccionada(opcion);
    };

    function SwitchFormulario({ opcion }) {
        switch (opcion) {
            case "LOGIN":
                return <FormPrincipalLogin cambiarComponente={setearFormulario} />;
            case "REGISTER":
                return <FormPrincipalRegister cambiarComponente={setearFormulario} />;
            default:
                return null;
        }
    }
    return (
        <>
            <header className='headerLanding '>
                    <h1>PAGINA AUTH</h1>  
                </header>
                <main className="mainPrincipalAuth">
                {opcionSeleccionada && (
                            <SwitchFormulario opcion={opcionSeleccionada} />
                        )}                  
                </main>
                <footer className="footerLanding">
                <a href="tel:+543819999999">3819999999</a>
                <a href="mailto:bar_app@gmail.com.ar">bar_app@gmail.com.ar</a>
                <p>Copyright ©, Bar App Service</p>
            </footer>
        </>
    )
};
export default PrincipalAuth;