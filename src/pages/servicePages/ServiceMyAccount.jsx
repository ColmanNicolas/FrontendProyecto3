import { useEffect, useState } from "react";
import axios from "axios";
import "./ServiceMyAccount.css";
import Navbar from "../../components/servicePageComponents/navBar/Navbar";
import Footer from "../../components/servicePageComponents/Footer";

const ServiceMyAccount = () => {
    const [usuario, setUsuario] = useState(null);
    const [pedidos, setPedidos] = useState([]);

    useEffect(() => {
        obtenerInformacionUsuario();
    }, []);

    function calcularTotalPedido(items) {
        const total = items.reduce((accumulator, item) => accumulator + parseInt(item.price, 10), 0);
        return total.toFixed(2);
    }

    const cambiarrEstadoPaid = async (id,data) => {
        const Object ={
            paid: data
        }
        try {
            await axios.put(`https://backendproyecto3-1.onrender.com/api/order/${id}`, Object).then(response => {
                obtenerInformacionUsuario();
            })
        } catch (error) {
            console.log("exploto aqui", error);

        }
    }

    const obtenerInformacionUsuario = async () => {
        const storedUser = sessionStorage.getItem('loguedUser');
        const parsedUser = JSON.parse(storedUser);
        try {
            const responseUser = await axios.get(`https://backendproyecto3-1.onrender.com/api/users/${parsedUser.id}`);
            setUsuario(responseUser.data.user);

            const responseOrders = await axios.get(`https://backendproyecto3-1.onrender.com/api/order/userOrderFilter/${parsedUser.id}`);
            setPedidos(responseOrders.data.orders);
        } catch (error) {
            console.error('Error al obtener usuario o pedidos:', error);
        }
    };

    return (
        <>
            <Navbar></Navbar>
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
                <div className="orders-container mb-5">
                    <h3 className="text-center">Mis pedidos</h3>
                    <div className="my-orders-container w-100">
                        {pedidos.map((pedido) => (
                            <section key={pedido.id} className="menu mb-5">
                                <section className="d-flex flex-row  align-items-center justify-content-between my-1">
                                    <h3 className="text-start text-danger p-0 m-0"><strong>N° de pedido: </strong>{pedido.orderNumber} </h3>
                                    <button className="ms-2 btn btn-dark fw-bold" disabled> Cancelar</button>
                                </section>
                                {pedido.items.map((item) => (
                                    <main className="menu-item">
                                        <section className='d-flex'>
                                            <h3 className="comida-menu fs-4">{item.name}</h3>
                                            <p className="precio-menu fs-5 text-black fw-bold">{`$ ${item.price}`}</p>
                                        </section>
                                        <section className='d-flex '>
                                            <p className="detalle-menu pb-0 mb-0 text-start"><strong>Descripcion: </strong>{item.detail}</p>
                                        </section>
                                    </main>
                                ))}
                                <section className="d-flex justify-content-end flex-column ">
                                    <p className="text-end fs-4 mb-0"><strong>Total: </strong>{"$" + calcularTotalPedido(pedido.items)}</p>
                                    {!pedido.paid && <button onClick={() => { cambiarrEstadoPaid(pedido._id, pedido.paid) }} className=" ms-2 btn btn-dark fw-bold" title="No pagado " > Realizar Pago</button>}
                                    {pedido.paid && <button className=" ms-2 btn btn-dark fw-bold" title="pagado " disabled >Pago Realizado</button>}
                                </section>
                            </section>
                        ))}
                    </div>
                </div>
            </div>
            <Footer></Footer>
        </>
    );
}

export default ServiceMyAccount;
