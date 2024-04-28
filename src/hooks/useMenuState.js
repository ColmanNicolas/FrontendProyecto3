import axios from "axios";
import { useState } from "react";
import imgEmpanadas from "../public/docena-empanadas.jpg"
import imgPizzas from "../public/pizza-muzarella.jpg"
import imgSanguches from "../public/sandwich-de-milanesa.jpg"

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
            await axios.get("http://localhost:5000/api/menu").then((response) => {
                setMenus(response.data);
                console.log("muestro response", response);
                console.log("muestro menus", menus);
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
    const filtrarMenus = async (filtro) => {
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
                console.log(response);
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

    //  ESTA FUNCION HAYQ EU PONERLA EN OTRO ARCHIVO

    const asignarImgPredeterminada = ({ category }) => {
        console.log("LLEGA AQUI CATEGORY",category);
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
        filtrarMenus

    }
};
export default useMenuState;