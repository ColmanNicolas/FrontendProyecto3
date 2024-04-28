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
    const generarServiceAdmin = async (data) => {
        try {
            await axios.post("http://localhost:5000/api/users/admin", data)
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
    const darAltaUsuario = async (id) => {
        try {
            await axios.put(`http://localhost:5000/api/users/enable/${id}`)
                .then(response => {
                }).then(()=>{
                    obtenerUsuarios();
                });
        } catch (error) {
            console.error('Error al obtener datos:', error);
        }
    };
    const borrarUsuario = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/users/${id}`)
                .then(response => {
                }).then(()=>{
                    obtenerUsuarios();
                });
        } catch (error) {
            console.error('Error al obtener datos:', error);
        }
    };
    const filtrarUsuarios = async (status)=>{
        try {
            await axios.get(`http://localhost:5000/api/users/filter/:${status}`)
                .then(response => {
                    setUsers(response.data);
                });
        } catch (error) {
            console.error('Error al obtener datos:', error);
        }
    }
    const filtrarRolUsuarios = async (filter) => {
        try {
            const response = await axios.get(`http://localhost:5000/api/users/role_filter/${filter}`);
            setUsers(response.data.filteredUsers);
            return response.data.filteredUsers;
        } catch (error) {
            console.error('Error al obtener datos:', error);
            // Puedes lanzar el error nuevamente para que sea manejado en el contexto que llama a esta función
            throw error;
        }
    }
    

    return {
        users,
        obtenerUsuarios,
        crearUsuario,
        generarServiceAdmin,
        modificarUsuario,
        darAltaUsuario,
        borrarUsuario,
        filtrarUsuarios,
        filtrarRolUsuarios
    }
};
export default useUsersState;