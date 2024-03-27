import FormPrincipalLogin from "../components/FormPrincipalLogin";
import FormPrincipalRegister from "../components/FormPrincipalRegister";
import NavbarDeDesarrollo from "../components/NavbarDeDesarrollo";

const PrincipalAuth = () => {
    NavbarDeDesarrollo
    return (
        <>
            <section className="min-vh-100 d-flex  flex-column">

                <header className="bg-danger d-flex justify-content-between align-items-center">
                    <h1>PAGINA AUTH</h1>
                    <NavbarDeDesarrollo />
                    
                </header>
                <main className="container-fluid   bg-dark">
                    <FormPrincipalRegister />
                    <div className="container-fluid w-100">
                        <hr className="text-white" />
                    </div>
                    <FormPrincipalLogin />
                </main>
                <footer className="bg-danger mt-auto">
                    <h1>FOOTER PAGINA AUTH</h1>
                </footer>
            </section>
        </>
    )
};
export default PrincipalAuth;