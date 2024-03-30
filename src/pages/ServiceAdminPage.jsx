import { useState } from "react";

import AdminMenuControls from "../components/AdminMenuControls";
import AdminOrderControls from "../components/AdminOrderControls";
import AdminUserControls from "../components/AdminUserControls";
import Footer from "../components/Footer";
import Header from "../components/Header";
import NavbarAdmin from "../components/NavbarAdmin";

import '../pages/ServiceAdminPage.css';
import '../components/ModalEstructura.css';

const ServiceAdminPage = () => {

    const [opcionSeleccionada, setOpcionSeleccionada] = useState(null);

    const mostrarTablasAdmin = (opcion) => {
        setOpcionSeleccionada(opcion);
    };

    function SwitchComponenteAdmin({ opcion }) {
        switch (opcion) {
            case "CLIENTES":
                return <AdminUserControls userList={opcion} />;
            case "EMPLEADOS":
                return <AdminUserControls userList={opcion}/>;
            case "MENU":
                return <AdminMenuControls />;
            case "PEDIDOS":
                return <AdminOrderControls />;
            default:
                return null;
        }
    }

    return (
        <>
            <Header />
            <section className="d-flex ">
                <NavbarAdmin devolverTabla={mostrarTablasAdmin} />
                <main className="mainServiceAdmin ">
                    <article >
                        {!opcionSeleccionada && <h3 className="text-center">ADMINISTRADOR</h3>}
                        {opcionSeleccionada && (
                            <SwitchComponenteAdmin opcion={opcionSeleccionada} />
                        )}
                    </article>

                </main>
            </section>


            <Footer />

        </>
    )
};
export default ServiceAdminPage;
