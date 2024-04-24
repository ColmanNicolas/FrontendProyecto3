import axios from "axios";
import { useEffect, useState } from "react";
import ModalEstructuraBase from "./ModalEstructuraBase";
import useModal from '../hooks/useModal';
import FormCrearUsuario from "./FormCrearUsuario";
import useUsersState from "../hooks/useUsersState";


const AdminUserControls = ({ userList }) => {

    const { isOpen, openModal, closeModal } = useModal();
    const { users, obtenerUsuarios, crearUsuario, modificarUsuario, darAltaUsuario, borrarUsuario, filtrarUsuarios } = useUsersState();


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
                        <section class="dropdown">
                            <a id="btnFiltrarUsers" class="dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                <i className="bi bi-funnel"></i><span>Filtrar </span>
                            </a>

                            <ul class="dropdown-menu">
                                <li><a class="dropdown-item" onClick={() => filtrarUsuarios(true)} href="#">Habilitados</a></li>
                                <hr className="m-0" />
                                <li><a class="dropdown-item" onClick={() => filtrarUsuarios(false)} href="#">Deshabilitados</a></li>
                            </ul>
                            <button type="button" className="buttonReload" onClick={() => obtenerUsuarios()}><i className="bi bi-arrow-repeat fs-4"></i></button>
                        </section>
                    </section>
                    <section className="col-12 col-md-7 d-flex justify-content-end">
                        <input type="text" name="" id="" placeholder="Ingrese algo para buscar" />
                        <button type="submit"><span>Buscar</span><i className="bi bi-search"></i></button>
                    </section>
                </form>
                <section className="containerDesplazable">
                    <ul className="tableTitles row " >
                        <li className="col-3">Nombre</li>
                        <li className="col-3">Email</li>
                        {userList === "EMPLEADOS" && <li className="col-2">rol</li>}
                        {userList === "CLIENTES" && <li className="col-2">estado</li>}
                        <li className="col-4 text-center">Acciones</li>
                    </ul>
                    <section className="containerRows">
                        {users.map((usuario) => (
                            /*mostrar empleados */
                            (userList === "EMPLEADOS" && (usuario.role != "USER_ROLE") &&
                                <ul key={usuario._id} className="row py-2" >
                                    <li className="col-3">{usuario.name}</li>
                                    <li className="col-3">{usuario.email}</li>
                                    <li className="col-2">{
                                        (userList === "EMPLEADOS" && (usuario.role)) ||
                                        (userList === "CLIENTES" && ((usuario.status && "Habilitado") || "En espera"))
                                    }</li>
                                    <li className="col-4 text-center containerButtonActions">
                                        {(usuario.role != "ADMIN_ROLE") && <>
                                            <button className="infoButton" title="Mas Información" onClick={() => { "masInfo" }}><i className="bi bi-info-lg"></i></button>
                                            {usuario.status && <button className="deleteButton" title="Eliminar " onClick={() => { borrarUsuario(usuario.id) }}><i className="bi bi-x-lg"></i></button>}
                                            {!usuario.status && <button className="checkButton" title="Habilitar " onClick={() => { darAltaUsuario(usuario.id) }}><i className="bi bi-check-lg "></i></button>}
                                        </>}
                                    </li>
                                </ul>
                            )
                            ||   /*mostrar clientes */
                            (userList === "CLIENTES" && (usuario.role === "USER_ROLE") &&
                                <ul key={usuario._id} className="row py-2" >
                                    <li className="col-3">{usuario.name}</li>
                                    <li className="col-3">{usuario.email}</li>
                                    <li className="col-2">{
                                        (userList === "CLIENTES" && ((usuario.status && "Habilitado") || "En espera"))}
                                    </li>
                                    <li className="col-4 text-center containerButtonActions">
                                        <button className="infoButton" title="Mas Información" onClick={() => { "masInfo" }}><i className="bi bi-info-lg"></i></button>
                                        {usuario.status && <button className="deleteButton" title="Eliminar " onClick={() => { borrarUsuario(usuario.id) }}><i className="bi bi-x-lg"></i></button>}
                                        {!usuario.status && <button className="checkButton" title="Habilitar " onClick={() => { darAltaUsuario(usuario.id) }}><i className="bi bi-check-lg "></i></button>}
                                    </li>
                                </ul>
                            )
                        ))}
                    </section>
                </section>
            </section>
            {isOpen &&
                <ModalEstructuraBase closeModal={closeModal} >
                    <h3>{userList === "EMPLEADOS" ? "Nuevo Empleado" : "Nuevo Cliente"}</h3>
                    <FormCrearUsuario closeModal={closeModal} form={userList} />
                </ModalEstructuraBase>
            }
        </>
    )
};
export default AdminUserControls;