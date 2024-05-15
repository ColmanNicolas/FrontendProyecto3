import React, { useState, useEffect, memo } from 'react';
import AdminMenuControls from "../../components/AdminMenuControls";
import AdminOrderControls from "../../components/AdminOrderControls";
import AdminUserControls from "../../components/AdminUserControls";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import NavbarAdmin from "../../components/NavbarAdmin";
import './ServiceAdminPage.css';
import '../../components/ModalEstructura.css';
import { useNavigate } from "react-router-dom";
import useNavbarAdmin from "../../hooks/useNavbarAdmin";

const ServiceAdminPage = () => {

    const [opcionSeleccionada, setOpcionSeleccionada] = useState(null);
    const navigate = useNavigate();
    const mostrarTablasAdmin = (opcion) => {
        setOpcionSeleccionada(opcion);
    };
    const { isOpen, setNavbarState, changeNavbarState } = useNavbarAdmin();

    useEffect(() => {
        const userLogued = sessionStorage.getItem('loguedUser');
        
        if (!userLogued) {
            navigate('/service/login');
        } else {
            const userData = JSON.parse(userLogued);
            if (userData && userData.user && userData.user.role !== "ADMIN_ROLE") {
                navigate('/service/login');
            }
        }
    }, [navigate]);

    const cerrarSesion = () => {
        sessionStorage.removeItem('loguedUser');
        setTimeout(() => {
            navigate("/service/login");
        }, 1000);
    }

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
