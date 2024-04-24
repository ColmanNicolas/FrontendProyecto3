import { useEffect, useState } from "react";
import usePedidosState from "../hooks/usePedidosState";

const AdminOrderControls = () => {
    const {
        pedidos,
        obtenerPedidos,
        obtenerUnPedido,
        crearPedido,
        modificarPedido, } = usePedidosState();
        const [idBotonAbierto, setIdBotonAbierto] = useState(null);

        const desplegarDetalle = (pedidoId) => {
          if (idBotonAbierto !== pedidoId) {
            setIdBotonAbierto(pedidoId);
          } else {
            setIdBotonAbierto(null);
          }
        };
    useEffect(() => {
        obtenerPedidos();
    }, []);

    return (
        <>
            <section className="sectionButtonNew">
                <h2>GESTION DE PEDIDOS</h2>
                <button ><i class="bi bi-list-check"></i><span>Realizar un Pedido</span></button>
            </section>
            <section className="sectionTablesFilters">
                <form className="row">
                    <section className="col-12 col-md-5">
                        <button><i className="bi bi-funnel"></i><span>Filtrar </span></button>
                        <button type="button" className="buttonReload" onClick={() => obtenerPedidos()}><i className="bi bi-arrow-repeat fs-4"></i></button>
                    </section>
                    <section className="col-12 col-md-7 d-flex justify-content-end">
                        <input type="text" name="" id="" placeholder="Ingrese algo para buscar" />
                        <button type="submit"><span>Buscar</span><i className="bi bi-search"></i></button>
                    </section>
                </form>
                <section className="containerDesplazable">
                    <ul className="tableTitles row " style={{ fontSize: "1.08rem" }} >
                        <li className="col-1 ps-1">N°</li>
                        <li className="col-1">Productos</li>
                        <li className="col-3 ps-3">Solicitante</li>
                        <li className="col-2 text-center">Total</li>
                        <li className="col-1 text-center">Detalle</li>
                        <li className="col-1 text-center ">Pagado</li>
                        <li className="col-3 text-center ">Estado</li>
                    </ul>

                    <section class="accordion" id="accordionExample">
                        {pedidos.map((pedido, index) => (
                            <>
                                <section key={pedido.id} class="accordion-item containerRows">
                                    <ul className="accordion-header row py-1" >
                                        <li className="col-1 ps-1">{index + 1}</li>
                                        <li className="col-1 ps-1">{pedido.items.length}</li>  {/* pedido.productos.lenght*/}
                                        <li className="col-3 ps-3">{pedido.userId}</li>
                                        <li className="col-2 text-center">{pedido.totalPrice}</li>
                                        <li className="col-1 text-center">
                                            <button
                                                className="collapsed m-0"
                                                type="button"
                                                data-bs-toggle="collapse"
                                                data-bs-target={`#${pedido._id}`}
                                                aria-expanded="false"
                                                aria-controls={pedido._id}
                                                onClick={() => desplegarDetalle(pedido._id)} // Pasamos el ID del pedido al hacer clic
                                            >
                                                <i
                                                    className={`bi bi-arrow-bar-${idBotonAbierto === pedido._id ? "up" : "down"} m-0`}
                                                ></i>
                                            </button>
                                        </li>
                                        <li className="col-1 text-center ">
                                            <button className="deleteButton" title="Eliminar " onClick={() => { }}><i className="bi bi-x-lg"></i></button>
                                        </li>
                                        <li className="col-3 text-center">
                                            <span>{pedido.status}</span>
                                            <button className="modificationButton" title="Modificar " onClick={() => { }}>{<i class="bi bi-arrow-left-right"></i>}</button>
                                        </li>
                                    </ul>
                                    <section id={pedido._id} class="accordion-collapse collapse " data-bs-parent="#accordionExample">
                                        {/* pedido.productos.map*/}
                                        <article class="accordion-body contenedorDetalles">
                                            <ul>
                                                <li>
                                                    <span className="fw-bold ps-2">Productos</span>
                                                    <span className="fw-bold">Subtotal</span>
                                                </li>
                                            </ul>
                                            <ul >
                                                <li >
                                                    <span > - Sanguche de milanesa</span>
                                                    <span >$ 4300</span>
                                                </li>
                                                <li >
                                                    <span > - Sanguche de milanesa</span>
                                                    <span >$ 4300</span>
                                                </li>
                                                <li >
                                                    <span > - Hamburguesa</span>
                                                    <span >$ 4300</span>
                                                </li>
                                            </ul>
                                            <ul>
                                                <li>
                                                    <span className="fw-bold ps-2">Fecha: {pedido.createdAt}</span>
                                                    <span className="fw-bold">Hora: 10:34:03</span>
                                                </li>
                                            </ul>
                                        </article>
                                    </section>
                                </section>
                            </>
                        ))}
                    </section>
                </section>
            </section>
        </>
    )
};
export default AdminOrderControls;