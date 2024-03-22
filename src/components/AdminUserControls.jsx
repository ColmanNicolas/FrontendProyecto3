import axios from "axios";
import { useEffect, useState } from "react";

const AdminUserControls = () => {

    const [clientes, setClientes] = useState([]);

    useEffect(() => {
        try {
            axios.get("http://localhost:4000/api/register")
                .then(response => {
                    setClientes(response.data);
                });
        } catch (error) {
            console.error('Error al obtener datos:', error);
        }
    }, []);

    const crearCliente = async (user)=>{
        await axios.post("                       ",user).then(response => {
            console.log(response.data);
        })
    }
    const borrarCliente = async ()=>{
        await axios.delete("                       ").then(response => {
            console.log(response.data);
        })
    }
    const modificarCliente = async ()=>{
        await axios.put("                       ").then(response => {
            console.log(response.data);
        })
    }

    return (
        <>
            <section className="d-flex justify-content-start gap-3 py-3 bg-dark ps-3">
                <button className="btn btn-light fw-bold" onClick={()=>{crearCliente(" data de un usuario")}}>CREAR CLIENTES</button>
                <button className="btn btn-light fw-bold">FILTRAR CLIENTES</button>
            </section>
            <section className="mt-4 ">
                <ul className=" w-100 row ps-0 fw-bold fs-5 mx-auto py-2 bg-dark" style={{ listStyle: "none" }}>
                    <li className="col-3">Nombre</li>
                    <li className="col-3">Apellido</li>
                    <li className="col-3">Email</li>
                    <li className="text-center col-3">Acciones</li>
                </ul>

                {clientes.map((cliente) => (
                    <ul key={cliente._id} className="w-100 row ps-0 mx-auto " style={{ listStyle: "none" }}>
                        <li className="col-3">{cliente.fullName}</li>
                        <li className="col-3">{cliente.password}</li>
                        <li className="col-3">{cliente.email}</li>
                        <li className="text-center col-3 ">
                            <button className="btn btn-sm btn-danger fw-semibold me-2" onClick={()=>{borrarCliente}}>borrar</button>
                            <button className="btn btn-sm btn-warning  fw-semibold" onClick={()=>{modificarCliente}}>modificar</button>
                        </li>
                    </ul>
                ))}

            </section>
        </>
    )
};
export default AdminUserControls;