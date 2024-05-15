import { useEffect } from "react";
import useMenuState from "../../hooks/useMenuState";
import MenuItem from "../../components/servicePageComponents/MenuItem";


const ServiceMenuList =()=>{
    const {menus, categoriasMenu, obtenerMenus, filtrarMenus}=useMenuState();
    useEffect(()=>{
        obtenerMenus();
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