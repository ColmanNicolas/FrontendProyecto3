import axios from "axios";
import { useEffect, useState } from "react";

const AdminOrderControls = () => {
    const [pedidos, setPedidos] = useState([]);

    useEffect(() => {
        
        try {
            axios.get("http://localhost:4000/api/register") // Obtener la lista de pedidos cuando el componente se monta
                .then(response => {
                    setPedidos(response.data);
                });
        } catch (error) {
            console.error('Error al obtener datos:', error);
        }
    }, []);


    const crearPedido = async (user) => {
        await axios.post("URL_PARA_CREAR_PEDIDO", user).then(response => {
            console.log(response.data);
        })
    }
    const borrarPedido = async () => {

        await axios.delete("URL_PARA_BORRAR_PEDIDO").then(response => {
            console.log(response.data);
        })
    }
    const modificarPedido = async () => {
        
        await axios.put("URL_PARA_MODIFICAR_PEDIDO").then(response => {
            console.log(response.data);
        })
    }

    return (
        <>
            <section className="d-flex justify-content-start gap-3 py-3 bg-dark ps-3">
                <button className="btn btn-light fw-bold" onClick={() => { crearPedido(" data de un usuario") }}>CREAR PEDIDO</button>
                <button className="btn btn-light fw-bold">FILTRAR PEDIDOS</button>
            </section>
            <section className="mt-4">
                <ul className="w-100 row mx-auto ps-0 fw-bold fs-5 py-2 bg-dark" style={{ listStyle: "none" }}>
                    <li className="col-3 ">Numero de orden</li>
                    <li className="col-3 ">Monto</li>
                    <li className="col-3 ">Estado</li>
                    <li className="col-3 text-center">Acciones</li>
                </ul>
                {pedidos.map((pedido) => (
                    <ul key={pedido._id} className="w-100 mx-auto row ps-0" style={{ listStyle: "none" }}>
                        <li className="col-3">{pedido.fullName}</li>
                        <li className="col-3">{pedido.password}</li>
                        <li className="col-3">{pedido.email}</li>
                        <li className="text-center col-3 btn-group">
                            <button className="btn btn-sm btn-danger fw-semibold " onClick={() => { borrarPedido(pedido.id) }}>borrar</button>
                            <button className="btn btn-sm btn-warning fw-semibold" onClick={() => { modificarPedido(pedido.id) }}>modificar estado</button>
                        </li>
                    </ul>
                ))}

            </section>
        </>
    )
}; 
export default AdminOrderControls;