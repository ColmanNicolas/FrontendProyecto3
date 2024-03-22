import { useState } from "react";

import AdminMenuControls from "../components/AdminMenuControls";
import AdminOrderControls from "../components/AdminOrderControls";
import AdminUserControls from "../components/AdminUserControls";
import Footer from "../components/Footer";
import Header from "../components/Header";
import NavbarAdmin from "../components/NavbarAdmin";

import '../pages/ServiceAdminPage.css';

const ServiceAdminPage = () => {

    const [opcionSeleccionada, setOpcionSeleccionada] = useState(null);

    const mostrarTablasAdmin = (opcion) => {
        setOpcionSeleccionada(opcion);
    };

    function SwitchComponenteAdmin({ opcion }) {
        switch (opcion) {
            case "USUARIOS":
                return <AdminUserControls />;
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
                <main className="container-fluid py-4 px-4">
                    <article className="bg-secondary text-white p-3 d-block">
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
