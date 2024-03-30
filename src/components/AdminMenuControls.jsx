import { useEffect } from "react";
import useModal from "../hooks/useModal";
import FormCrearMenu from "./FormCrearMenu";
import ModalEstructuraBase from "./ModalEstructuraBase";
import useMenuState from "../hooks/useMenuState";

const AdminMenuControls = () => {
    const { menus, obtenerMenus, modificarMenu, borrarMenu } = useMenuState();
    const { isOpen, openModal, closeModal } = useModal();

    useEffect(() => {
        obtenerMenus();
    }, []);

    return (
        <>
            <section className="sectionButtonNew">
                <h2>GESTION DE MENU</h2>
                <button onClick={() => openModal()}><i className="bi bi-cup-hot"></i><span>Crear Menu</span></button>
            </section>
            <section className="sectionTablesFilters">
                <form className="row">
                <section className="col-12 col-md-5">
                        <button><i className="bi bi-funnel"></i><span>Filtrar </span></button>
                        <button type="button" className="buttonReload" onClick={() => obtenerMenus()}><i className="bi bi-arrow-repeat fs-4"></i></button>
                    </section>
                    <section className="col-12 col-md-7 d-flex justify-content-end">
                        <input type="text" name="" id="" placeholder="Ingrese algo para buscar" />
                        <button type="submit"><span>Buscar</span><i className="bi bi-search"></i></button>
                    </section>
                </form>
                <section className="containerDesplazable">
                    <ul className="tableTitles row " >
                        <li className="col-2">Categoria</li>
                        <li className="col-6">Plato</li>
                        <li className="col-1">Precio</li>
                        <li className="col-3 text-center">Acciones</li>
                    </ul>
                    <section className="containerRows">
                        {menus.map((menu) => (
                            <ul key={menu._id} className="row py-2" >
                                <li className="col-2">{menu.category}</li>
                                <li className="col-6">{menu.name}</li>
                                <li className="col-1">{`$ ${menu.price}`}</li>
                                <li className="col-3 text-center containerButtonActions">
                                    <button className="infoButton" title="Mas Informacion " onClick={() => { masInfoMenu() }}><i className="bi bi-info-lg"></i></button>
                                    <button className="deleteButton" title="Eliminar " onClick={() => { borrarMenu(menu._id) }}><i className="bi bi-x-lg"></i></button>
                                </li>
                            </ul>
                        ))}
                    </section>
                </section>
            </section>
            {isOpen &&
                <ModalEstructuraBase closeModal={closeModal} >
                    <h3>Nuevo Menu</h3>
                    <FormCrearMenu closeModal={closeModal} />
                </ModalEstructuraBase>
            }
        </>
    )
};
export default AdminMenuControls;