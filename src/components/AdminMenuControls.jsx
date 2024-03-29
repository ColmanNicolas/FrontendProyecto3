import axios from "axios";
import { useEffect, useState } from "react";
import useModal from "../hooks/useModal";
import FormCrearMenu from "./FormCrearMenu";
import ModalEstructuraBase from "./ModalEstructuraBase";

const AdminMenuControls = () => {
    const [menus, setMenus] = useState([]);
    const { isOpen, openModal, closeModal } = useModal();

    useEffect(() => {
        obtenerMenus();
    }, []);

    const obtenerMenus = async () => {
        try {
            await axios.get("http://localhost:5000/api/menu").then((response)=>{
                console.log(response.data);
                setMenus(response.data);
            })
            } catch (error) {
            console.error('Error al crear menú:', error);
        }
    }

    const crearMenu = async (menuData) => {
        try {
            const response = await axios.post("URL_PARA_CREAR_MENU", menuData); // Reemplaza "URL_PARA_CREAR_MENU" con la URL para crear un menú
            console.log(response.data);
        } catch (error) {
            console.error('Error al crear menú:', error);
        }
    }

    const borrarMenu = async (menuId) => {
        try {
            const response = await axios.delete(`URL_PARA_BORRAR_MENU/${menuId}`); // Reemplaza "URL_PARA_BORRAR_MENU" con la URL para borrar un menú
            console.log(response.data);
        } catch (error) {
            console.error('Error al borrar menú:', error);
        }
    }

    const modificarMenu = async (menuId, menuData) => {
        try {
            const response = await axios.put(`URL_PARA_MODIFICAR_MENU/${menuId}`, menuData); // Reemplaza "URL_PARA_MODIFICAR_MENU" con la URL para modificar un menú
            console.log(response.data);
        } catch (error) {
            console.error('Error al modificar menú:', error);
        }
    }
    return (
        <>
            <section className="sectionButtonNew">
                <button onClick={() => openModal()}><i className="bi bi-cup-hot"></i><span>Crear Menu</span></button>
            </section>
            <section className="sectionTablesFilters">
                <form >
                    <section>
                        <button><i className="bi bi-funnel"></i><span>Filtrar </span></button>
                        <button type="button" className="buttonReload" onClick={() => obtenerMenus()}><i className="bi bi-arrow-repeat fs-4"></i></button>
                    </section>
                    <section>
                        <input type="text" name="" id="" placeholder="Ingrese algo para buscar" />
                        <button type="submit"><span>Buscar</span><i className="bi bi-search"></i></button>
                    </section>
                </form>
                <ul className="tableTitles row " >
                    <li className="col-3">Categoria</li>
                    <li className="col-3">Plato</li>
                    <li className="col-2">Precio</li>
                    <li className="col-4 text-center">Acciones</li>
                </ul>
                <section className="containerRows">
                    {menus.map((menu) => (
                        <ul key={menu._id} className="row py-2" >
                            <li className="col-3">{menu.category}</li>
                            <li className="col-3">{menu.name}</li>
                            <li className="col-2">{menu.price}</li>
                            <li className="col-4 text-center containerButtonActions">
                                <button title="Modificar Cliente" onClick={() => { modificarMenu() }}><i className="bi bi-gear"></i></button>
                                <button title="Eliminar Cliente" onClick={() => { borrarMenu(menu._id) }}><i className="bi bi-x-lg"></i></button>
                                <button title="Habilitar Cliente" onClick={() => { }}><i className="bi bi-check-lg "></i></button>
                            </li>
                        </ul>
                    ))}
                </section>
            </section>
            {isOpen &&
                <ModalEstructuraBase closeModal={closeModal} >
                    <h3>Nuevo Menu</h3>
                    <FormCrearUsuario closeModal={closeModal} />
                </ModalEstructuraBase>
            }
        </>
    )
};
export default AdminMenuControls;