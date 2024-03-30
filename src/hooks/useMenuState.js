import axios from "axios";
import { useState } from "react";

const useMenuState = () => {
    const [menus, setMenus] = useState([])

    const obtenerMenus = async () => {
        try {
            await axios.get("http://localhost:5000/api/menu").then((response) => {
                console.log(response.data);
                setMenus(response.data);
            })
        } catch (error) {
            console.error('Error al crear menú:', error);
        }
    }
    const crearMenu = async (menuData) => {
        try {
            const response = await axios.post("http://localhost:5000/api/menu", menuData);
            console.log(response.data);
        } catch (error) {
            console.error('Error al crear menú:', error);
        }
    }
    const modificarMenu = async (menuId, menuData) => {
        try {
            const response = await axios.put(`http://localhost:5000/api/menu/${menuId}`, menuData);
            console.log(response.data);
        } catch (error) {
            console.error('Error al modificar menú:', error);
        }
    }
    const borrarMenu = async (menuId) => {
        try {
            const response = await axios.delete(`http://localhost:5000/api/menu/${menuId}`);
            console.log(response.data);
        } catch (error) {
            console.error('Error al borrar menú:', error);
        }
    }
    return {
        menus,
        obtenerMenus,
        crearMenu,
        modificarMenu,
        borrarMenu,
    }
};
export default useMenuState;