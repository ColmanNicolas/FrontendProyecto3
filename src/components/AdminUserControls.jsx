import axios from "axios";
import { useEffect, useState } from "react";
import ModalEstructuraBase from "./ModalEstructuraBase";
import useModal from '../hooks/useModal';
import FormCrearUsuario from "./FormCrearUsuario";
import useUsersState from "../hooks/useUsersState";


const AdminUserControls = ({ userList }) => {

    const { isOpen, openModal, closeModal } = useModal();
    const { users, obtenerUsuarios, crearUsuario, modificarUsuario, borrarUsuario } = useUsersState();

    useEffect(() => {
        obtenerUsuarios();
    }, []);
    return (
        <>
            <section className="sectionButtonNew">
                <h2>{`GESTION DE ${userList}`}</h2>
                <button onClick={() => openModal()}>
                    {userList === "EMPLEADOS" ? (
                        <>
                            <i className="bi bi-person-add"></i>
                            <span>Empleado</span>
                        </>
                    ) : (
                        <>
                            <i className="bi bi-people"></i>
                            <span>Nuevo Cliente</span>
                        </>
                    )}
                </button>

            </section>
            <section className="sectionTablesFilters">
                <form className="row">
                    <section className="col-12 col-md-5">
                        <button><i className="bi bi-funnel"></i><span>Filtrar </span></button>
                        <button type="button" className="buttonReload" onClick={() => obtenerUsuarios()}><i className="bi bi-arrow-repeat fs-4"></i></button>
                    </section>
                    <section className="col-12 col-md-7 d-flex justify-content-end">
                        <input type="text" name="" id="" placeholder="Ingrese algo para buscar" />
                        <button type="submit"><span>Buscar</span><i className="bi bi-search"></i></button>
                    </section>
                </form>
                <section className="containerDesplazable">
                    {userList === "EMPLEADOS" && <ul className="tableTitles row " >
                        <li className="col-3">Nombre</li>
                        <li className="col-3">Email</li>
                        <li className="col-2">Rol</li>
                        <li className="col-4 text-center">Acciones</li>
                    </ul>}
                    {userList === "CLIENTES" && <ul className="tableTitles row " >
                        <li className="col-3">Nombre</li>
                        <li className="col-3">Email</li>
                        <li className="col-2">Estado</li>
                        <li className="col-4 text-center">Acciones</li>
                    </ul>}
                    <section className="containerRows">
                        {users.map((cliente) => (
                            <ul key={cliente._id} className="row py-2" >
                                <li className="col-3">{cliente.name}</li>
                                <li className="col-3">{cliente.email}</li>
                                <li className="col-2">{
                                    (cliente.status && "Habilitado")
                                    || "No habilitado"
                                }</li>
                                <li className="col-4 text-center containerButtonActions">
                                    <button className="infoButton" title="Mas Información" onClick={() => { "masInfo" }}><i className="bi bi-info-lg"></i></button>
                                    <button className="deleteButton" title="Eliminar " onClick={() => { borrarUsuario(cliente._id) }}><i className="bi bi-x-lg"></i></button>
                                    <button className="checkButton" title="Habilitar " onClick={() => { }}><i className="bi bi-check-lg "></i></button>
                                </li>

                            </ul>
                        ))}
                    </section>
                </section>
            </section>
            {isOpen &&
                <ModalEstructuraBase closeModal={closeModal} >
                    <h3>{userList === "EMPLEADOS" ? "Nuevo Empleado" : "Nuevo Cliente"}</h3>
                    <FormCrearUsuario closeModal={closeModal} />
                </ModalEstructuraBase>
            }
        </>
    )
};
export default AdminUserControls;