import axios from "axios";
import { useState } from "react";

const useUsersState = () => {
    const [users, setUsers] = useState([])

    const obtenerUsuarios = async () => {
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
    const crearUsuario = async (data) => {
        try {
            await axios.post("http://localhost:5000/api/users", data)
                .then(response => {
                    console.log(response);
                });
        } catch (error) {
            console.error('Error al obtener datos:', error);
        }
    };
    
    const modificarUsuario = async (id) => {
        try {
            await axios.put(`http://localhost:5000/api/users/${id}`)
                .then(response => {
                    console.log(response);
                });
        } catch (error) {
            console.error('Error al obtener datos:', error);
        }
    };
    const borrarUsuario = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/users/${id}`)
                .then(response => {
                    console.log(response);
                }).then(()=>{
                    console.log("entro en actualizar");
                    obtenerUsuarios();
                });
        } catch (error) {
            console.error('Error al obtener datos:', error);
        }
    };
    return {
        users,
        obtenerUsuarios,
        crearUsuario,
        modificarUsuario,
        borrarUsuario,
    }
};
export default useUsersState;