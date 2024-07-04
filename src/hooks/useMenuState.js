import axios from "axios";
import { useState } from "react";
import imgEmpanadas from "../assets/docena-empanadas.jpg"
import imgPizzas from "../assets/pizza-muzarella.jpg"
import imgSanguches from "../assets/sandwich-de-milanesa.jpg"

const useMenuState = () => {
    const [menus, setMenus] = useState([])
    const [categoriasMenu, setCategotriasMenu] = useState([]);

    const categories = [
        "Promociones",
        "Entradas",
        "Al plato",
        "Empanadas",
        "Hamburguesas",
        "Pastas",
        "Pizzas",
        "Sandwiches",
        "Sushi",
        "Postres",
        "Bebidas",
        "Bebidas alcohólicas",
    ];

    const obtenerMenus = async () => {
        try {
            const response = await axios.get("https://backendproyecto3-1.onrender.com/api/menu");
            setMenus(response.data);
            setCategotriasMenu(categories);
            return response;

        } catch (error) {
            console.error('Error al obtener menú:', error);
            throw error; 
        }
    };
    const obtenerUnMenu = async (id) => {
        try {
            await axios.get(`https://backendproyecto3-1.onrender.com/api/menu/${id}`).then((response) => {
                return response;
            })
        } catch (error) {
            console.error('Error al crear menú:', error);
        }
    }
    const filtrarMenus = async (filtro) => {
        try {
            const response = await axios.get(`https://backendproyecto3-1.onrender.com/api/menu/filter/${filtro}`);
            setMenus(response.data.menu);
            return response.data.menu;
        } catch (error) {
            console.error('Error al filtrar pedidos:', error);
            throw error; 
        }
    };
    const crearMenu = async (menuData) => {
        try {
            await axios.post("https://backendproyecto3-1.onrender.com/api/menu", menuData).then(response => {
            })
        } catch (error) {
            console.error('Error al crear menú:', error);
        }
    }
    const modificarMenu = async (menuId, menuData) => {

        try {
            const response = await axios.put(`https://backendproyecto3-1.onrender.com/api/menu/${menuId}`, menuData);
            return response;
        } catch (error) {
            console.error('Error al modificar menú:', error);
        }
    }
    const borrarMenu = async (menuId) => {
        try {
            const response = await axios.delete(`https://backendproyecto3-1.onrender.com/api/menu/${menuId}`);
        } catch (error) {
            console.error('Error al borrar menú:', error);
        }
    }

    const buscadorMenus = async (data) => {
        try {
            const {buscador}=data;
            const response = await axios.get(`https://backendproyecto3-1.onrender.com/api/menu/search/${buscador}`);
            setMenus(response);
            return response;
        } catch (error) {
            throw error;
        }
    }

    //  ESTA FUNCION HAYQ EU PONERLA EN OTRO ARCHIVO

    const asignarImgPredeterminada = ({ category }) => {
        const capitalizedCategory = category.charAt(0).toUpperCase() + category.slice(1);

        switch (capitalizedCategory) {
            case "Promociones":
                return imgPromociones;
            case "Comida Extranjera":
                return imgComidaExtranjera;
            case "Bebidas":
                return imgBebidas;
            case "Bebidas alcohólicas":
                return imgBebidasAlcoholicas;
            case "Al plato":
                return imgAlPlato;
            case "Empanadas":
                return imgEmpanadas;
            case "Entradas":
                return imgEntradas;
            case "Hamburguesas":
                return imgHamburguesas;
            case "Fideos":
                return imgFideos;
            case "Postres":
                return imgPostres;
            case "Pizzas":
                return imgPizzas;
            case "Sanguches":
                return imgSanguches;
            case "Sopas":
                return imgSopas;
            case "Sushi":
                return imgSushi;
            case "Tacos":
                return imgTacos;
            default:
                console.log("Categoría no reconocida");
                return "imgPredeterminada";
        }
    };


    return {
        categoriasMenu,
        menus,
        setCategotriasMenu,
        obtenerUnMenu,
        obtenerMenus,
        crearMenu,
        modificarMenu,
        borrarMenu,
        filtrarMenus,
        buscadorMenus
    }
};
export default useMenuState;