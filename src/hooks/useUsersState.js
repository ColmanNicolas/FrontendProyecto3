import axios from "axios";
import { useState } from "react";

const useUsersState = () => {
    const [users, setUsers] = useState([])

    const obtenerClientes = async () => {
        try {
            await axios.get("http://localhost:5000/api/users")
                .then(response => {
                    console.log(response);
                    setUsers(response.data.users);
                });
        } catch (error) {
            console.error('Error al obtener datos:', error);
        }
    };
    const crearCliente = async (data) => {
        try {
            await axios.post("http://localhost:5000/api/users", data)
                .then(response => {
                    console.log(response);
                });
        } catch (error) {
            console.error('Error al obtener datos:', error);
        }
    };
    
    const modificarCliente = async (id) => {
        try {
            await axios.put(`http://localhost:5000/api/users/${id}`)
                .then(response => {
                    console.log(response);
                });
        } catch (error) {
            console.error('Error al obtener datos:', error);
        }
    };
    const borrarCliente = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/users/${id}`)
                .then(response => {
                    console.log(response);
                }).then(()=>{
                    console.log("entro en actualizar");
                    obtenerClientes();
                });
        } catch (error) {
            console.error('Error al obtener datos:', error);
        }
    };
    return {
        users,
        obtenerClientes,
        crearCliente,
        modificarCliente,
        borrarCliente,
    }
};
export default useUsersState;