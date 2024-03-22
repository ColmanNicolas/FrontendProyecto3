import axios from "axios";
import { useEffect, useState } from "react";

const AdminMenuControls = () => {
    const [menus, setMenus] = useState([]);

    useEffect(() => {
        try {
            axios.get("http://localhost:4000/api/register")// Reemplaza "URL_DE_TU_API_AQUÍ" con la URL de tu API
                .then(response => {
                    setMenus(response.data);
                });
        } catch (error) {
            console.error('Error al obtener datos:', error);
        }
    }, []);

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
            <section className="d-flex justify-content-start gap-3 py-3 bg-dark ps-3">
                <button className="btn btn-light fw-bold" onClick={() => crearMenu({/* datos del menú */})}>CREAR MENU</button>
                <button className="btn btn-light fw-bold">FILTRAR MENU</button>
            </section>
            <section className="mt-4">
                <ul className="w-100 mx-auto row ps-0 fw-bold fs-5 py-2 bg-dark" style={{ listStyle: "none" }}>
                    <li className="col-3">Categoria</li>
                    <li className="col-3">Plato</li>
                    <li className="col-3">Precio</li>
                    <li className="text-center col-3">Acciones</li>
                </ul>
                {menus.map((menu, index) => (
                    <ul key={index} className="w-100 mx-auto row ps-0" style={{ listStyle: "none" }}>
                        <li className="col-3">{menu.fullName}</li>
                        <li className="col-3">{menu.password}</li>
                        <li className="col-3">{menu.email}</li>
                        <li className="text-center col-3">
                            <button className="btn btn-sm btn-danger fw-semibold me-2" onClick={() => borrarMenu(menu.id)}>borrar</button>
                            <button className="btn btn-sm btn-warning fw-semibold" onClick={() => modificarMenu(menu.id, {/* nuevos datos del menú */})}>modificar</button>
                        </li>
                    </ul>
                ))}
            </section>
        </>
    )
};
export default AdminMenuControls;