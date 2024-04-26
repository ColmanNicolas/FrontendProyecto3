import { useEffect } from "react";
import NavbarAdmin from "../components/NavbarAdmin";
import Navbar from "../components/navBar/Navbar"
import useMenuState from "../hooks/useMenuState";
import MenuItem from "../components/serviceComponents/MenuItem";
import '../components/serviceComponents/Menu.css';


const ServiceMenuList =()=>{
    const {menus, categoriasMenu, obtenerMenus, filtrarMenus}=useMenuState();
    useEffect(()=>{
        obtenerMenus();
        console.log("obtengo menus",menus);
    },[])
    return(
        <>
        <h1>soy el listado</h1>
        <section>
        {menus.map(item => (
                    <MenuItem key={item.id} comida={item.name} detalle={item.detail} precio={item.price}  />
                ))}
        </section>
        </>
    )
}
export default ServiceMenuList;