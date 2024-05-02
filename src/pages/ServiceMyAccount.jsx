import { useEffect, useState } from "react";
import axios from "axios";
import "../pages/ServiceMyAccount.css";

const ServiceMyAccount = () => {
    const [usuario, setUsuario] = useState(null);

    useEffect(() => {
        obtenerInformacionUsuario();
    }, []);

    const obtenerInformacionUsuario = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/users/663274df3237a60466f93912");
            setUsuario(response.data.user);
        } catch (error) {
            console.error('Error al obtener usuario:', error);
        }
    };

    return (
        <div className="my-account-container">
            <div className="account-info-container">
                <div className="my-account-info">
                    <h2>Mi cuenta</h2>
                    {usuario && (
                        <div className="profile-picture">
                            <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" alt="Perfil" />
                            <button>Elegir foto de perfil</button>
                        </div>
                    )}
                    {usuario && (
                        <div className="user-info">
                            <p><strong>Nombre:</strong> {usuario.name}</p>
                            <p><strong>Email:</strong> {usuario.email}</p>
                        </div>
                    )}
                    <div className="userbutton">
                        <button>Cambiar contraseña</button>
                        </div>
                </div>
            </div>
            <div className="orders-container">
                <div className="my-orders-container">
                    <h3>Mis pedidos</h3>
                    {/* Aquí puedes mostrar la lista de pedidos del usuario */}
                </div>
            </div>
        </div>
    );
}    

export default ServiceMyAccount;
