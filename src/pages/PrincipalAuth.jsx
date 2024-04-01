import FormPrincipalLogin from "../components/superAdminComponents/FormPrincipalLogin";
import FormPrincipalRegister from "../components/superAdminComponents/FormPrincipalRegister";
import "../pages/PrincipalAuth.css"
const PrincipalAuth = () => {
    return (
        <>
            <header className='headerLanding '>
                    <h1>PAGINA AUTH</h1>  
                </header>
                <main className="mainPrincipalAuth">
                    <FormPrincipalRegister />
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