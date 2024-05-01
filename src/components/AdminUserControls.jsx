import axios from "axios";
import { useEffect, useState } from "react";
import ModalEstructuraBase from "./ModalEstructuraBase";
import useModal from '../hooks/useModal';
import FormCrearUsuario from "./FormCrearUsuario";
import useUsersState from "../hooks/useUsersState";
import { useForm } from "react-hook-form";


const AdminUserControls = ({ userList }) => {

    const { isOpen, openModal, closeModal } = useModal();
    const { users, obtenerUsuarios, darAltaUsuario, borrarUsuario, crearUsuario, filtrarUsuarios, buscadorUsers } = useUsersState();
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [usuarios, setUsuarios] = useState([]);

    const enviarBusqueda = async (data) => {
        console.log("llego aqui");
        const response = await buscadorUsers(data);
        setUsuarios(response)
    }

    const setearDataUsuarios = async () => {
        try {
            const response = await obtenerUsuarios();
            console.log("recibo usaurios", response);
            setUsuarios(response);
        } catch (error) {
            console.error('Error al obtener usuarios:', error);
        }
    };
    
    useEffect(() => {
        setearDataUsuarios();
    }, []);
    
    

    useEffect(() => {
        setUsuarios(users)
    }, [filtrarUsuarios, obtenerUsuarios]);


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

                <form onSubmit={handleSubmit(enviarBusqueda)} className="row">
                    <section className="col-12 col-md-5">
                        <section className="dropdown">
                            <a id="btnFiltrarUsers" className="dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                <i className="bi bi-funnel"></i><span>Filtrar </span>
                            </a>
                            <ul className="dropdown-menu">
                                <li><a className="dropdown-item" onClick={() => filtrarUsuarios(true)} href="#">Habilitados</a></li>
                                <hr className="m-0" />
                                <li><a className="dropdown-item" onClick={() => filtrarUsuarios(false)} href="#">Deshabilitados</a></li>
                            </ul>
                            <button type="button" className="buttonReload" onClick={() => obtenerUsuarios()}><i className="bi bi-arrow-repeat fs-4"></i></button>
                        </section>
                    </section>
                    <section className="col-12 col-md-7 d-flex justify-content-end ">
                        <input type="text" maxLength={30} placeholder="Ingrese algo para buscar" {...register("buscador", { required: true })} />
                        <button type="submit"><span>Buscar</span><i className="bi bi-search"></i></button>
                    </section>
                </form>

                <section className="containerDesplazable">
                    <ul className="tableTitles row " >
                        <li className="col-3">Nombre</li>
                        <li className="col-3">Email</li>
                        {userList === "EMPLEADOS" && <li className="col-2">Rol</li>}
                        {userList === "CLIENTES" && <li className="col-2">Estado</li>}
                        <li className="col-4 text-center">Acciones</li>
                    </ul>
                    <section className="containerRows">
                        {usuarios.map((usuario, index) => (
                            /*mostrar empleados */
                            (userList === "EMPLEADOS" && (usuario.role != "USER_ROLE") &&
                                <ul key={index} className="row py-2" >
                                    <li className="col-3">{usuario.name}</li>
                                    <li className="col-3">{usuario.email}</li>
                                    <li className="col-2">{
                                        (userList === "EMPLEADOS" && (usuario.role)) ||
                                        (userList === "CLIENTES" && ((usuario.status && "Habilitado") || "En espera"))
                                    }</li>
                                    <li className="col-4 li-centrado containerButtonActions">
                                        {(usuario.role != "ADMIN_ROLE") && <>
                                            <button className="infoButton" title="Mas Información" onClick={() => { "masInfo" }}><i className="bi bi-info-lg"></i></button>
                                            {usuario.status && <button className="deleteButton" title="Eliminar " onClick={() => { borrarUsuario(usuario.id) }}>Dar baja <i className="bi bi-x-lg"></i></button>}
                                            {!usuario.status && <button className="checkButton" title="Habilitar " onClick={() => { darAltaUsuario(usuario.id) }}>Aprobar <i className="bi bi-check-lg "></i></button>}
                                        </>}
                                    </li>
                                </ul>
                            )
                            ||   /*mostrar clientes */
                            (userList === "CLIENTES" && (usuario.role === "USER_ROLE") &&
                                <ul key={index} className="row py-2" >
                                    <li className="col-3">{usuario.name}</li>
                                    <li className="col-3">{usuario.email}</li>
                                    <li className="col-2 ">{
                                        (userList === "CLIENTES" && ((usuario.status && "Habilitado") || "En espera"))}
                                    </li>
                                    <li className="col-4 li-centrado  containerButtonActions">
                                        <button className="infoButton" title="Mas Información" onClick={() => { "masInfo" }}><i className="bi bi-info-lg"></i></button>
                                        {usuario.status && <button className="deleteButton px-3" title="Eliminar " onClick={() => { borrarUsuario(usuario.id) }}>Borrar <i className="bi bi-x-lg"></i></button>}
                                        {!usuario.status && <button className="checkButton" title="Habilitar " onClick={() => { darAltaUsuario(usuario.id) }}>Aprobar <i className="bi bi-check-lg "></i></button>}
                                    </li>
                                </ul>
                            )
                        ))}
                        {usuarios.length === 0 && <p className="col-12  px-2 py-2 fs-5">{` Se encontraron 0 usuarios`}</p>}

                    </section>
                </section>
            </section>
            {isOpen &&
                <ModalEstructuraBase closeModal={closeModal} >
                    <h3>{userList === "EMPLEADOS" ? "Nuevo Empleado" : "Nuevo Cliente"}</h3>
                    <FormCrearUsuario closeModal={closeModal} form={userList} setearDataUsuarios={setearDataUsuarios}/>
                </ModalEstructuraBase>
            }
        </>
    )
};
export default AdminUserControls;