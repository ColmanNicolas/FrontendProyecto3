import axios from "axios";
import { useEffect, useState } from "react";
import ContainerNewQR from "../../components/superAdminComponents/ContainerNewQR";
import useUsersState from "../../hooks/useUsersState";
import "../principalPages/PrincipalAdminControls.css"

const PrincipalAdminPage = () => {
    const [usuarios, setUsuarios] = useState([]);
    const { crearUsuario, obtenerUsuarios } = useUsersState();

    const obtenerPrincipalUsers = async () => {

        try {

            await axios.get("http://localhost:5000/api/principalUsers")
                .then(response => {
                    setUsuarios(response.data);
                });
        } catch (error) {
            console.error('Error al obtener datos:', error);
        }
    };

    const cambiarEstado = async (id, accion) => {
        console.log(id, accion);
        try {
            switch (accion) {
                case "HABILITAR":
                    await axios.put(`http://localhost:5000/api/principalUsers/enable/${id}`)
                        .then(response => {
                            console.log("hola", response);
                            obtenerPrincipalUsers();
                            const { city, country, id, name, paid, businessName, ...rest } = response.data.user;
                            rest.status = true;
                            rest.role = "ADMIN_ROLE";
                            rest.name = businessName;
                            crearUsuario(rest);
                        });
                    break;
                case "DESHABILITAR":
                    await axios.put(`http://localhost:5000/api/principalUsers/disable/${id}`)
                        .then(response => {
                            obtenerPrincipalUsers();
                        });
                    break;
                default:
                    console.error('Acción no válida:', accion);
            }
        } catch (error) {
            console.error('Error al realizar la operación:', error);
        }
    };


    useEffect(() => {
        obtenerPrincipalUsers();
    }, [])
    return (
        <>
            <header className='headerLanding'>
                <h1>MI CUENTA</h1>
            </header>
            <main>
                <article id="principal-controls-admin">
                    <h2>Admin controls</h2>
                    <section>
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
                                        <td>{usuario.email}</td>
                                        <td>{usuario.businessName}</td>
                                        <td>{usuario.name}</td>
                                        <td className="text-center">{(usuario.paid && "SI") || (!usuario.paid && "NO")}</td>
                                        <td className="text-center">{(usuario.status && <>
                                            <span>SI</span>
                                            <button className="checkButton px-2 rounded-2 ms-3" title="desHabilitar " onClick={() => { cambiarEstado(usuario.id, "DESHABILITAR") }}><i className="bi bi-gear"></i></button>
                                        </>
                                        ) || (!usuario.status && <>
                                            <span>NO</span>
                                            <button className="deleteButton px-2 rounded-2 ms-3" title="Habilitar " onClick={() => { cambiarEstado(usuario.id, "HABILITAR") }}><i className="bi bi-gear"></i></button>
                                        </>)}
                                        </td>
                                        <td className="text-center">
                                            <button className="infoButton px-2 rounded-2 ms-3" title="Mas Información" onClick={() => { "masInfo" }}><i className="bi bi-info-lg"></i></button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </section>
                </article>
            </main>
            <ContainerNewQR />
        </>
    )
}
export default PrincipalAdminPage;