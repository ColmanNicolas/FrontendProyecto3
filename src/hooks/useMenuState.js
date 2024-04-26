import axios from "axios";
import { useState } from "react";

const useMenuState = () => {
    const [menus, setMenus] = useState([])
    const [categoriasMenu, setCategotriasMenu] = useState([]);

    const categories = [
        "Promociones",
        "Comida Extranjera",
        "Bebidas",
        "Bebidas alcohólicas",
        "Al plato",
        "Empanadas",
        "Entradas",
        "Hamburguesas",
        "Fideos",
        "Postres",
        "Pizzas",
        "Sanguches",
        "Sopas",
        "Sushi",
        "Tacos"
    ];
    const obtenerMenus = async () => {
        try {
            await axios.get("http://localhost:5000/api/menu").then((response) => {
                setMenus(response.data);
                console.log("muestro response",response);
                console.log("muestro menus",menus);
                setCategotriasMenu(categories)
            })
        } catch (error) {
            console.error('Error al crear menú:', error);
        }
    }
    const obtenerUnMenu = async (id) => {
        try {
            await axios.get(`http://localhost:5000/api/menu/${id}`).then((response) => {
                return response;
            })
        } catch (error) {
            console.error('Error al crear menú:', error);
        }
    }
    const filtrarMenus= async ( filtro ) => {
        try {
            const response = await axios.get(`http://localhost:5000/api/menu/filter/${filtro}`);
            setMenus(response.data.menu);
        } catch (error) {
            console.error('Error al filtrar pedidos:', error);
        }
    }
    const crearMenu = async (menuData) => {
        try {
            await axios.post("http://localhost:5000/api/menu", menuData).then(response => {
            })
        } catch (error) {
            console.error('Error al crear menú:', error);
        }
    }
    const modificarMenu = async (menuId, menuData) => {

        try {
            const response = await axios.put(`http://localhost:5000/api/menu/${menuId}`, menuData);

        } catch (error) {
            console.error('Error al modificar menú:', error);
        }
    }
    const borrarMenu = async (menuId) => {
        try {
            const response = await axios.delete(`http://localhost:5000/api/menu/${menuId}`);
        } catch (error) {
            console.error('Error al borrar menú:', error);
        }
    }
    return {
        categoriasMenu,
        menus,
        setCategotriasMenu,
        obtenerUnMenu,
        obtenerMenus,
        crearMenu,
        modificarMenu,
        borrarMenu,
        filtrarMenus
        
    }
};
export default useMenuState;