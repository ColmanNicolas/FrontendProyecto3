import axios from "axios";
import { useEffect, useState } from "react";


const PrincipalAdminPage = () => {
    const [usuarios, setUsuarios] = useState([]);

    const obtenerUsuarios = async () => {
        try {
            await axios.get("http://localhost:5000/api/principalUsers")
                .then(response => {
                    console.log(response);
                    setUsuarios(response.data);
                });
        } catch (error) {
            console.error('Error al obtener datos:', error);
        }
    };
    const cambiarEstado = async (id)=>{
        console.log(id);
        try {
            await axios.delete(`http://localhost:5000/api/principalUsers/${id}`)
                .then(response => {
                    obtenerUsuarios();
                });
        } catch (error) {
            console.error('Error al obtener datos:', error);
        }
    }

    useEffect(() => {
        obtenerUsuarios();
    }, [])
    return (
        <>
            <header className='headerLanding '>
                <h1>MI CUENTA</h1>
            </header>
            <main>
                <article>
                    <h2>admin controls</h2>
                    <section>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th className="col-3" scope="col">Email</th>
                                    <th className="col-3" scope="col">Empresa</th>
                                    <th className="col-2" scope="col">Usuario</th>
                                    <th className="col-1 text-center" scope="col">Pagado</th>
                                    <th className="col-2 text-center" scope="col">Estado</th>
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
                                            <span>HABILITADO</span>
                                            <button className="checkButton px-2 rounded-2 ms-3" title="desHabilitar " onClick={() => {cambiarEstado(usuario.id)}}><i className="bi bi-gear"></i></button>
                                        </>
                                        ) || (!usuario.status && <>
                                            <span>NO HABILITADO</span>
                                            <button className="deleteButton px-2 rounded-2 ms-3" title="Habilitar " onClick={() => {cambiarEstado(usuario.id)}}><i className="bi bi-gear"></i></button>
                                        </>)}
                                        </td>
                                        <td>
                                            <button className="infoButton px-2 rounded-2 ms-3" title="Mas Información" onClick={() => { "masInfo" }}><i className="bi bi-info-lg"></i></button>
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