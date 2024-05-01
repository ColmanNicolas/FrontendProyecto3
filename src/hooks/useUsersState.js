import axios from "axios";
import { useState } from "react";

const useUsersState = () => {
    const [users, setUsers] = useState([])

    const obtenerUsuarios = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/users");
            console.log(response);
            setUsers(response.data.users);
            return response.data.users;
        } catch (error) {
            console.error('Error al obtener datos:', error);
            throw error; 
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

            const response = await axios.put(`http://localhost:5000/api/users/enable/${id}`);
            console.log(response);
            setUsers([response.data.user]);
            return response.data; 
        } catch (error) {
            console.error('Error al dar de alta usuario:', error);
            throw error; 
        }
    };
    
    const borrarUsuario = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:5000/api/users/${id}`);
            
            setUsers([response.data.user]);
            return response.data;
        } catch (error) {
            console.error('Error al borrar usuario:', error);
            throw error; 
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
    const buscadorUsers = async (data) => {
        try {
            const {buscador}=data;
            const response = await axios.get(`http://localhost:5000/api/users/search/${buscador}`);
            console.log("realiz",response);
            setUsers(response.data.users);
            return response.data.users;
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
        filtrarRolUsuarios,
        buscadorUsers
    }
};
export default useUsersState;