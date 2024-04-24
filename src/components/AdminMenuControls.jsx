import React, { useEffect, useState } from "react";
import useModal from "../hooks/useModal";
import FormCrearMenu from "./FormCrearMenu";
import ModalEstructuraBase from "./ModalEstructuraBase";
import useMenuState from "../hooks/useMenuState";

const AdminMenuControls = () => {
    const { menus, categoriasMenu, obtenerMenus, modificarMenu, borrarMenu, filtrarMenus } = useMenuState();
    const { isOpen, openModal, closeModal } = useModal();
    const [accionarModal, setAccionarModal] = useState([]);

    useEffect(() => {
        obtenerMenus();
    }, []);

    //recargo lista al finalizar operacion en el modal
    useEffect(() => {
        obtenerMenus();
    }, [isOpen]);

    return (
        <>
            <section className="sectionButtonNew">
                <h2>GESTION DE MENU</h2>
                <button onClick={() => {
                    setAccionarModal({accion:"NUEVO",id:null})
                    openModal()
                }
                }><i className="bi bi-cup-hot"></i><span>Crear Menu</span>
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
                                {categoriasMenu.map((menu, index) => (
                                    <React.Fragment key={index}>
                                        <li key={index}>
                                            <a className="dropdown-item" onClick={() => filtrarMenus(menu.toLowerCase())} href="#">
                                                {menu}
                                            </a>
                                        </li>
                                        {index !== menus.length - 1 && <hr className="m-0" />} {/* Agrega la línea horizontal solo si no es el último elemento */}
                                    </React.Fragment>
                                ))}


                            </ul>
                            <button type="button" className="buttonReload" onClick={() => obtenerMenus()}><i className="bi bi-arrow-repeat fs-4"></i></button>
                        </section>
                    </section>
                    <section className="col-12 col-md-7 d-flex justify-content-end">
                        <input type="text" name="" id="" placeholder="Ingrese algo para buscar" />
                        <button type="submit"><span>Buscar</span><i className="bi bi-search"></i></button>
                    </section>
                </form>
                <section className="containerDesplazable">
                    <ul className="tableTitles row " >
                        <li className="col-2">Categoria</li>
                        <li className="col-4">Plato</li>
                        <li className="col-2">Precio</li>
                        <li className="col-4 text-center">Acciones</li>
                    </ul>
                    <section className="containerRows">
                        {menus.map((menu) => (
                            <ul key={menu._id} className="row py-2" >
                                <li className="col-2">{menu.category}</li>
                                <li className="col-4">{menu.name}</li>
                                <li className="col-2">{`$ ${menu.price}`}</li>
                                <li className="col-4 li-centrado containerButtonActions">
                                    <button className="infoButton" title="Mas Informacion " onClick={() => {
                                        setAccionarModal({accion:"MODIFICAR",id:menu._id})
                                        openModal()
                                    }} >Detalle <i className="bi bi-info-lg"></i>
                                    </button>
                                </li>
                            </ul>
                        ))}
                        {menus.length === 0 && <p className="col-12  px-2 py-2 fs-5">{` Se encontraron 0 productos`}</p>}
                    </section>
                </section>
            </section>
            {isOpen &&
                <ModalEstructuraBase closeModal={closeModal} >
                    <h3>{accionarModal.accion === "NUEVO" ? "Nuevo Menu" : "Modificar Menu"}</h3>
                    <FormCrearMenu closeModal={closeModal} accionarModal={accionarModal} />
                </ModalEstructuraBase>
            }
        </>
    )
};
export default AdminMenuControls;