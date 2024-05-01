import React, { useState, memo } from 'react';

import AdminMenuControls from "../components/AdminMenuControls";
import AdminOrderControls from "../components/AdminOrderControls";
import AdminUserControls from "../components/AdminUserControls";
import Footer from "../components/Footer";
import Header from "../components/Header";
import NavbarAdmin from "../components/NavbarAdmin";

import '../pages/ServiceAdminPage.css';
import '../components/ModalEstructura.css';
import { useNavigate } from "react-router-dom";
import useNavbarAdmin from "../hooks/useNavbarAdmin";

const ServiceAdminPage = () => {

    const [opcionSeleccionada, setOpcionSeleccionada] = useState(null);
    const navigate = useNavigate();
    const mostrarTablasAdmin = (opcion) => {
        setOpcionSeleccionada(opcion);
    };
    const { isOpen, setNavbarState, changeNavbarState } = useNavbarAdmin();

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
    const cerrarSesion = ()=>{

        sessionStorage.removeItem('loguedUser');
        
        setTimeout(() => {
            navigate("/bar-app/landing-page/auth");
        }, 1000);
    }

    return (
        <>
            <section className="d-flex  contenedorPrincipal">
            <Header /> 
            <section id="contenedor-navButton-cerrarSesion">
             
                <button onClick={() => { cerrarSesion() }} className=" botonCerrarSesion fs-6 mx-2 my-2 px-2 bg-light">Cerrar Sesion</button>
            </section>
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



        </>
    )
};
export default memo(ServiceAdminPage);
