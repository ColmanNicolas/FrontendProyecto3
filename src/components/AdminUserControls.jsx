import axios from "axios";
import { useEffect, useState } from "react";
import ModalEstructuraBase from "../components/ModalEstructuraBase";
import useModal from '../hooks/useModal';
import FormCrearUsuario from "../components/FormCrearUsuario";
import useUsersState from "../hooks/useUsersState";


const AdminUserControls = () => {

    const { isOpen, openModal, closeModal } = useModal();
    const { users, obtenerClientes,crearCliente , modificarCliente, borrarCliente } = useUsersState();

    useEffect(() => {
        obtenerClientes();
    }, []);

    return (
        <>
            <section className="sectionButtonNew">
                <button onClick={() => openModal()}><i className="bi bi-person-add"></i><span>Crear Cliente</span></button>
            </section>
            <section className="sectionTablesFilters">
                <form >
                    <section>
                        <button><i className="bi bi-funnel"></i><span>Filtrar </span></button>
                        <button type="button" className="buttonReload" onClick={() => obtenerClientes()}><i className="bi bi-arrow-repeat fs-4"></i></button>
                    </section>
                    <section>
                        <input type="text" name="" id="" placeholder="Ingrese algo para buscar" />
                        <button type="submit"><span>Buscar</span><i className="bi bi-search"></i></button>
                    </section>
                </form>
                <ul className="tableTitles row " >
                    <li className="col-3">Nombre</li>
                    <li className="col-3">Email</li>
                    <li className="col-2">Estado</li>
                    <li className="col-4 text-center">Acciones</li>
                </ul>
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
                                <button title="Modificar Cliente" onClick={() => { modificarCliente() }}><i className="bi bi-gear"></i></button>
                                <button title="Eliminar Cliente" onClick={() => { borrarCliente(cliente._id) }}><i className="bi bi-x-lg"></i></button>
                                <button title="Habilitar Cliente" onClick={() => { }}><i className="bi bi-check-lg "></i></button>
                            </li>
                        </ul>
                    ))}
                </section>
            </section>
            {isOpen &&
                <ModalEstructuraBase closeModal={closeModal} >
                    <h3>Nuevo Cliente</h3>
                    <FormCrearUsuario closeModal={closeModal} />
                </ModalEstructuraBase>
            }
        </>
    )
};
export default AdminUserControls;