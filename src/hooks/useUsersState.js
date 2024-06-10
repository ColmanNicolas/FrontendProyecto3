import axios from "axios";
import { useState } from "react";

const useUsersState = () => {
    const [users, setUsers] = useState([])

    const obtenerUsuarios = async () => {
        try {
            const response = await axios.get("https://backendproyecto3-1.onrender.com/api/users");
            setUsers(response.data.users);
            return response.data.users;
        } catch (error) {
            console.error('Error al obtener datos:', error);
            throw error; 
        }
    };
    const crearUsuario = async (data) => {
        try {
            await axios.post("https://backendproyecto3-1.onrender.com/api/users", data)
                .then(response => {
                });
        } catch (error) {
            console.error('Error al obtener datos:', error);
        }
    };    
    const generarServiceAdmin = async (data) => {
        try {
            await axios.post("https://backendproyecto3-1.onrender.com/api/users/admin", data)
                .then(response => {
                });
        } catch (error) {
            console.error('Error al obtener datos:', error);
        }
    };
    
    const modificarUsuario = async (id) => {
        try {
            await axios.put(`https://backendproyecto3-1.onrender.com/api/users/${id}`)
                .then(response => {
                });
        } catch (error) {
            console.error('Error al obtener datos:', error);
        }
    };
    const darAltaUsuario = async (id) => {
        try {

            const response = await axios.put(`https://backendproyecto3-1.onrender.com/api/users/enable/${id}`);
            setUsers([response.data.user]);
            return response.data; 
        } catch (error) {
            console.error('Error al dar de alta usuario:', error);
            throw error; 
        }
    };
    
    const borrarUsuario = async (id) => {
        try {
            const response = await axios.delete(`https://backendproyecto3-1.onrender.com/api/users/${id}`);
            
            setUsers([response.data.user]);
            return response.data;
        } catch (error) {
            console.error('Error al borrar usuario:', error);
            throw error; 
        }
    };
    
    const filtrarUsuarios = async (status)=>{
        try {
            await axios.get(`https://backendproyecto3-1.onrender.com/api/users/filter/:${status}`)
                .then(response => {
                    setUsers(response.data);
                });
        } catch (error) {
            console.error('Error al obtener datos:', error);
        }
    }
    const filtrarRolUsuarios = async (filter) => {
        try {
            const response = await axios.get(`https://backendproyecto3-1.onrender.com/api/users/role_filter/${filter}`);
            setUsers(response.data.filteredUsers);
            return response.data.filteredUsers;
        } catch (error) {
            console.error('Error al obtener datos:', error);
            // Puedes lanzar el error nuevamente para que sea manejado en el contexto que llama a esta función
            throw error;
        }
    }
    const buscadorUsers = async (data) => {
        try {
            const {buscador}=data;
            const response = await axios.get(`https://backendproyecto3-1.onrender.com/api/users/search/${buscador}`);
            setUsers(response.data.users);
            return response.data.users;
        } catch (error) {
            console.error('Error al obtener datos:', error);
            setUsers([]);

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
        filtrarRolUsuarios,
        buscadorUsers
    }
};
export default useUsersState;