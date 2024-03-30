import { useEffect, useState } from "react";
import usePedidosState from "../hooks/usePedidosState";

const AdminOrderControls = () => {
    const { pedidos, obtenerPedidos, modificarPedido } = usePedidosState();

    useEffect(() => {
        obtenerPedidos();
    }, []);

    return (
        <>
            <section className="sectionButtonNew">
                <button ><i class="bi bi-list-check"></i><span>Realizar un Pedido</span></button>
            </section>
            <section className="sectionTablesFilters">
                <form >
                    <section>
                        <button><i className="bi bi-funnel"></i><span>Filtrar </span></button>
                        <button type="button" className="buttonReload" onClick={() => obtenerPedidos()}><i className="bi bi-arrow-repeat fs-4"></i></button>
                    </section>
                    <section>
                        <input type="text" name="" id="" placeholder="Ingrese algo para buscar" />
                        <button type="submit"><span>Buscar</span><i className="bi bi-search"></i></button>
                    </section>
                </form>
                <ul className="tableTitles row " style={{ fontSize: "1.08rem" }} >
                    <li className="col-1">N° orden</li>
                    <li className="col-2">Productos</li>
                    <li className="col-3 ">Solicitante</li>
                    <li className="col-2 text-center">Total</li>
                    <li className="col-1 text-center">Detalle</li>
                    <li className="col-1 text-center ">Pagado</li>
                    <li className="col-2 text-center ">Estado</li>
                </ul>

                <section class="accordion" id="accordionExample">
                    {[1].map((pedido) => (
                        <>
                            <section key={pedido.id} class="accordion-item containerRows">
                                <ul className="accordion-header row py-1" >
                                    <li className="col-1">21732123</li>
                                    <li className="col-2">4 Productos</li>  {/* pedido.productos.lenght*/}
                                    <li className="col-3 ps-2">Pedro Pepe</li>
                                    <li className="col-2 text-center">$ 25576</li>
                                    <li className="col-1 text-center">
                                        <button class=" collapsed  text-center " type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                                            <i class="bi bi-arrow-bar-down px-4"></i>
                                        </button>
                                    </li>
                                    <li className="col-1 text-center ">
                                        <button className="deleteButton" title="Eliminar " onClick={() => { borrarMenu(menu._id) }}><i className="bi bi-x-lg"></i></button>
                                    </li>
                                    <li className="col-2 text-center">
                                        <button className="modificationButton" title="Modificar " onClick={() => { modificarMenu() }}><i class="bi bi-arrow-left-right"></i></button>
                                    </li>
                                </ul>
                                <section id="collapseOne" class="accordion-collapse collapse " data-bs-parent="#accordionExample">
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
                                                <span className="fw-bold ps-2">Fecha: 31/03/2024</span>
                                                <span className="fw-bold">Hora: 10:34:03</span>
                                            </li>
                                        </ul>
                                    </article>
                                </section>
                            </section>

                            <section key={pedido.id} class="accordion-item containerRows">
                                <ul className="accordion-header row py-1" >
                                    <li className="col-1">21732123</li>
                                    <li className="col-2">4 Productos</li>  {/* pedido.productos.lenght*/}
                                    <li className="col-3 ps-2">Pedro Pepe</li>
                                    <li className="col-2 text-center">$ 25576</li>
                                    <li className="col-1 text-center">
                                        <button class=" collapsed  text-center " type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                            <i class="bi bi-arrow-bar-down px-4"></i>
                                        </button>
                                    </li>
                                    <li className="col-1 text-center ">
                                        <button className="deleteButton" title="Eliminar " onClick={() => { borrarMenu(menu._id) }}><i className="bi bi-x-lg"></i></button>
                                    </li>
                                    <li className="col-2 text-center">
                                        <button className="modificationButton" title="Modificar " onClick={() => { modificarMenu() }}><i class="bi bi-arrow-left-right"></i></button>
                                    </li>
                                </ul>
                                <section id="collapseTwo" class="accordion-collapse collapse " data-bs-parent="#accordionExample">
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
                                                <span className="fw-bold ps-2">Fecha: 31/03/2024</span>
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
        </>
    )
};
export default AdminOrderControls;