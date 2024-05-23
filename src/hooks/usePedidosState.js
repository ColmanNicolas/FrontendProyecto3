import axios from "axios";
import { useState } from "react";

const usePedidosState = () => {
    const [pedidos, setPedidos] = useState([])

    const obtenerPedidos = async () => {
        try {
            await axios.get("https://backendproyecto3-1.onrender.com/api/order").then((response) => {
                setPedidos(response.data);
            })
        } catch (error) {
            console.error('Error al crear un pedido:', error);
        }
    }
    const obtenerUnPedido = async (id) => {
        try {
            await axios.get(`https://backendproyecto3-1.onrender.com/api/order/${id}`).then((response) => {
                setPedidos(response.data);
            })
        } catch (error) {
            console.error('Error al crear pedido:', error);
        }
    }
    const crearPedido = async (pedidoData) => {
        try {
            const response = await axios.post("https://backendproyecto3-1.onrender.com/api/order", pedidoData);
        } catch (error) {
            console.error('Error al crear pedido:', error);
        }
    }
    const modificarPedido= async (pedidoId, pedidoData) => {
        try {
            const response = await axios.put(`https://backendproyecto3-1.onrender.com/api/order/${pedidoId}`, pedidoData);
            obtenerPedidos();
        } catch (error) {
            console.error('Error al modificar pedido:', error);
        }
    }
    const filtrarPedidos = async (filtro) => {
        try {
            await axios.get(`https://backendproyecto3-1.onrender.com/api/order/filter/${filtro}`).then((response) => {
                setPedidos(response.data.order);
            })
        } catch (error) {
            console.error('Error al crear un pedido:', error);
        }
    }
    const buscadorPedidos = async (data) => {
        try {
            const {buscador}=data;
            const response = await axios.get(`https://backendproyecto3-1.onrender.com/api/orders/search/${buscador}`);
            setPedidos(response.data.orders);
            return response.data.orders;
        } catch (error) {
            console.error('Error al obtener datos:', error);
            setPedidos([]);
            // Puedes lanzar el error nuevamente para que sea manejado en el contexto que llama a esta función
        }
    }


    return {
        pedidos,
        obtenerPedidos,
        obtenerUnPedido,
        crearPedido,
        modificarPedido,
        filtrarPedidos,
        buscadorPedidos
    }
};
export default usePedidosState;