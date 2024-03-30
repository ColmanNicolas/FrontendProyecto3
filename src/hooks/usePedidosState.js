import axios from "axios";
import { useState } from "react";

const usePedidosState = () => {
    const [pedidos, setPedidos] = useState([])

    const obtenerPedidos = async () => {
        try {
            await axios.get("http://localhost:5000/api/pedidos").then((response) => {
                console.log(response.data);
                setPedidos(response.data);
            })
        } catch (error) {
            console.error('Error al crear menú:', error);
        }
    }
    const crearPedido = async (pedidoData) => {
        try {
            const response = await axios.post("http://localhost:5000/api/pedidos", pedidoData);
            console.log(response.data);
        } catch (error) {
            console.error('Error al crear menú:', error);
        }
    }
    const modificarPedido= async (pedidoId, pedidoData) => {
        try {
            const response = await axios.put(`http://localhost:5000/api/pedidos/${pedidoId}`, pedidoData);
            console.log(response.data);
        } catch (error) {
            console.error('Error al modificar menú:', error);
        }
    }

    return {
        pedidos,
        obtenerPedidos,
        crearPedido,
        modificarPedido,
    }
};
export default usePedidosState;