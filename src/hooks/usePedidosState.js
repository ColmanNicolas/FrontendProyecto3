import axios from "axios";
import { useState } from "react";

const usePedidosState = () => {
    const [pedidos, setPedidos] = useState([])

    const obtenerPedidos = async () => {
        try {
            await axios.get("http://localhost:5000/api/order").then((response) => {
                console.log(response.data);
                setPedidos(response.data);
            })
        } catch (error) {
            console.error('Error al crear un pedido:', error);
        }
    }
    const obtenerUnPedido = async (id) => {
        try {
            await axios.get(`http://localhost:5000/api/order/${id}`).then((response) => {
                console.log(response.data);
                setPedidos(response.data);
            })
        } catch (error) {
            console.error('Error al crear pedido:', error);
        }
    }
    const crearPedido = async (pedidoData) => {
        try {
            const response = await axios.post("http://localhost:5000/api/order", pedidoData);
            console.log(response.data);
        } catch (error) {
            console.error('Error al crear pedido:', error);
        }
    }
    const modificarPedido= async (pedidoId, pedidoData) => {
        try {
            const response = await axios.put(`http://localhost:5000/api/order/${pedidoId}`, pedidoData);
            console.log(response.data);
            obtenerPedidos();
        } catch (error) {
            console.error('Error al modificar pedido:', error);
        }
    }
    const filtrarPedidos = async (filtro) => {
        try {
            await axios.get(`http://localhost:5000/api/order/filter/${filtro}`).then((response) => {
                console.log(response.data.order);
                setPedidos(response.data.order);
            })
        } catch (error) {
            console.error('Error al crear un pedido:', error);
        }
    }


    return {
        pedidos,
        obtenerPedidos,
        obtenerUnPedido,
        crearPedido,
        modificarPedido,
        filtrarPedidos
    }
};
export default usePedidosState;