import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useUsersState from "../../hooks/useUsersState";

import "../principalPages/PrincipalAdminControls.css"

const PrincipalAdminPage = () => {
    const [usuarios, setUsuarios] = useState([]);
    const { generarServiceAdmin } = useUsersState();
    const navigate = useNavigate();

    const obtenerPrincipalUsers = async () => {
        try {
            await axios.get("https://backendproyecto3-1.onrender.com/api/principalUsers")
                .then(response => {
                    setUsuarios(response.data);
                });
        } catch (error) {
            console.error('Error al obtener datos:', error);
        }
    };
    const filtrarPrincipalesStatus = async (status) => {
        try {
            const response = await axios.get(`https://backendproyecto3-1.onrender.com/api/principalUsers/status/${status}`)
            setUsuarios(response.data.filteredUsers);
        } catch (error) {
            console.error('Error al obtener datos:', error);
        }
    };
    
    const filtrarPrincipalesPaid = async (paid) => {
        try {
            const response = await axios.get(`https://backendproyecto3-1.onrender.com/api/principalUsers/paid/${paid}`);
            setUsuarios(response.data.filteredUsers);
        } catch (error) {
            console.error('Error al obtener datos:', error);
        }
    };
    
    const cambiarEstado = async (id, accion) => {
        try {
            switch (accion) {
                case "HABILITAR":
                    await axios.get(`https://backendproyecto3-1.onrender.com/api/principalUsers/${id}`)
                        .then(async (response) => {
                            const { city, country, id, name, paid, businessName, ...rest } = response.data.user;
                            rest.role = "ADMIN_ROLE";
                            rest.name = businessName;
                            await generarServiceAdmin(rest);
                            await axios.put(`https://backendproyecto3-1.onrender.com/api/principalUsers/enable/${id}`)
                                .then(async () => {
                                    await obtenerPrincipalUsers();
                                })
                        });
                    break;

                case "DESHABILITAR":
                    await axios.get(`https://backendproyecto3-1.onrender.com/api/principalUsers/${id}`)
                        .then(async (response) => {
                            const { city, country, id, name, paid, businessName, ...rest } = response.data.user;
                            await generarServiceAdmin(rest);
                            await axios.put(`https://backendproyecto3-1.onrender.com/api/principalUsers/disable/${id}`)
                                .then(async () => {
                                    await obtenerPrincipalUsers();
                                })
                        });
                    break;
                default:
                    console.error('Acción no válida:', accion);
            }
        } catch (error) {
            console.error('Error al realizar la operación:', error);
        }
    };
    const cerrarSesion = () => {
        setTimeout(() => {
            navigate("/bar-app/landing-page/auth")
        }, 1000);
    }

    useEffect(() => {
        obtenerPrincipalUsers();
    }, [])
    return (
        <>
            <header className='headerLanding'>
                <h1>Administrador</h1>
            </header>
            <h4 id="H4PrincipalAdmin" className="text-end">
                <button onClick={() => { cerrarSesion() }} className=" botonCerrarSesion bg-light fs-6 mx-2 my-2 px-2">Cerrar Sesion</button>
            </h4>
            <main>
                <article id="principal-controls-admin">
                    <form className="d-flex ">

                        <section className="">
                            <section id="container-filtros" class="dropdown">
                                <a id="btnFiltrarUsers" class="dropdown-toggle bg-light" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    <i className="bi bi-funnel"></i><span>Filtrar </span>
                                </a>

                                <ul class="dropdown-menu">
                                    <li><a class="dropdown-item" onClick={() => filtrarPrincipalesStatus(true)} href="#">Habilitados</a></li>
                                    <hr className="m-0" />
                                    <li><a class="dropdown-item" onClick={() => filtrarPrincipalesStatus(false)} href="#">Deshabilitados</a></li>
                                    <hr className="m-0" />
                                    <li><a class="dropdown-item" onClick={() => filtrarPrincipalesPaid(true)} href="#">Pago Realizado</a></li>
                                    <hr className="m-0" />
                                    <li><a class="dropdown-item" onClick={() => filtrarPrincipalesPaid(false)} href="#">Pago Pendiente</a></li>
                                </ul>
                                <button type="button" className="buttonReload bg-light" onClick={() => obtenerPrincipalUsers()}><i className="bi bi-arrow-repeat fs-4"></i></button>
                            </section>
                        </section>
                        <section id="container-buscador" className="d-flex justify-content-end bg-light rounded-1">
                            <input type="text" name="" id="" placeholder="Ingrese algo para buscar" />
                            <button type="submit" disabled><span className="text-black">Buscar</span><i className="bi bi-search"></i></button>
                        </section>
                    </form>
                    <section id="seccion-principal-admin-table">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th className="col-3" scope="col">Email</th>
                                    <th className="col-3" scope="col">Empresa</th>
                                    <th className="col-2" scope="col">Usuario</th>
                                    <th className="col-1 text-center" scope="col">Pagado</th>
                                    <th className="col-2 text-center" scope="col">Habilitación</th>
                                    <th className="col-1 text-center" scope="col">Informacion</th>
                                </tr>
                            </thead>
                            <tbody>
                                {usuarios.map((usuario) => (
                                    <tr key={usuario.id}>
                                        <td>{usuario.principalEmail}</td>
                                        <td>{usuario.businessName}</td>
                                        <td>{usuario.name}</td>
                                        <td className="text-center">{(usuario.paid && "SI") || (!usuario.paid && "NO")}</td>
                                        <td className="text-center">
                                            {usuario.role !== "ADMIN_ROLE" && (
                                                <>
                                                    {(usuario.status && (
                                                        <>
                                                            <span>SI</span>
                                                            <button className="checkButton px-2 rounded-2 ms-3" title="DesHabilitar" onClick={() => { cambiarEstado(usuario.id, "DESHABILITAR") }}>
                                                                <i className="bi bi-gear"></i>
                                                            </button>
                                                        </>
                                                    )) || (
                                                            <>
                                                                <span>NO</span>
                                                                <button className="deleteButton px-2 rounded-2 ms-3" title="Habilitar" onClick={() => { cambiarEstado(usuario.id, "HABILITAR") }}>
                                                                    <i className="bi bi-gear"></i>
                                                                </button>
                                                            </>
                                                        )}
                                                </>
                                            )}
                                        </td>
                                        <td className="text-center">
                                            <button className="infoButton px-2 rounded-2 ms-3" title="Mas Información" onClick={() => { "masInfo" }}>
                                                <i className="bi bi-info-lg"></i>
                                            </button>
                                        </td>
                                    </tr>
                                ))}

                            </tbody>
                        </table>
                    </section>
                </article>
            </main>
        </>
    )
}
export default PrincipalAdminPage;