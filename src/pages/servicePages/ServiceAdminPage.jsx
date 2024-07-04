import React, { useState, useEffect, memo } from 'react';
import { useNavigate } from "react-router-dom";
import AdminMenuControls from "../../components/servicePageComponents/tableControllers/AdminMenuControls";
import AdminOrderControls from "../../components/servicePageComponents/tableControllers/AdminOrderControls";
import AdminUserControls from "../../components/servicePageComponents/tableControllers/AdminUserControls";
import Header from "../../components/principalPageComponentes/Header";
import NavbarAdmin from "../../components/servicePageComponents/navBar/NavbarAdmin";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './ServiceAdminPage.css';
import '../../components/ModalEstructura.css';

const ServiceAdminPage = () => {

    const [opcionSeleccionada, setOpcionSeleccionada] = useState(null);
    const navigate = useNavigate();
    const mostrarTablasAdmin = (opcion) => {
        setOpcionSeleccionada(opcion);
    };

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
        toast.success("Cerrando sesión... no recargue la pagina", { theme: 'dark' });

        setTimeout(() => {
            navigate("/service/login");
        }, 3000);
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
                        {!opcionSeleccionada && <h3 className="text-center fw-bold fs-1 text-black">ADMINISTRADOR</h3>}
                        {opcionSeleccionada && (
                            <SwitchComponenteAdmin opcion={opcionSeleccionada} />
                        )}
                    </article>
                </main>
            </section>
            <ToastContainer />

        </>
    )
};

export default memo(ServiceAdminPage);
