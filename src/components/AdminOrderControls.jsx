import { useEffect, useState } from "react";
import usePedidosState from "../hooks/usePedidosState";
import { Controller, useForm } from "react-hook-form";
import axios from "axios";
import React, { useRef } from 'react';
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';

const AdminOrderControls = () => {
    const { handleSubmit, setValue, register, formState: { errors, isSubmitSuccessful }, watch, reset, control, focus } = useForm();
    const [idBotonAbierto, setIdBotonAbierto] = useState(null);
    const [modalInformacion, setModalInformacion] = useState({});
    const navigate = useNavigate();
    const {
        pedidos,
        obtenerPedidos,
        obtenerUnPedido,
        crearPedido,
        modificarPedido,
        filtrarPedidos,
    } = usePedidosState();

    const filtrosPedidos = ["PENDIENTE", "EN_PROCESO", "COMPLETADA", "CANCELADA", "PAGADO", "NO_PAGADO"];

    const closeModal = () => {
        const modal = document.getElementById('staticBackdrop');
        console.log("recupero el modal", modal);
        if (modal) {
            const bootstrapModal = new bootstrap.Modal(modal);
            console.log("lo trato de destruiur", bootstrapModal);
            bootstrapModal.hide(); // Oculta el modal
            bootstrapModal.dispose(); // Destruye el modal
        }
    };

    const handleModalStatus = (informacion) => {
        const { id, orden, solicitante, status } = informacion;
        console.log(informacion);
        setModalInformacion({ id, orden, solicitante, status });
    }
    const formularioCambiarEstado = async (data) => {
        try {
            await axios.put(`http://localhost:5000/api/order/${modalInformacion.id}`, data).then(response => {
                console.log("llego aqui y respuesta"), response;
                reset();
                obtenerPedidos();
                closeModal()
            })

        } catch (error) {
            console.log("exploto aqui", error);

        }
    }

    const desplegarDetalle = (pedidoId) => {
        if (idBotonAbierto !== pedidoId) {
            setIdBotonAbierto(pedidoId);
        } else {
            setIdBotonAbierto(null);
        }
    };
    function formatoFecha(fechaString) {
        const fecha = new Date(fechaString);
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        return fecha.toLocaleDateString('es-ES', options);
    }

    function formatoHora(fechaString) {
        const fecha = new Date(fechaString);
        const options = { hour: '2-digit', minute: '2-digit', second: '2-digit' };
        return fecha.toLocaleTimeString('es-ES', options);
    }
    useEffect(() => {
        obtenerPedidos();
    }, []);

    return (

        <>
            <section className="sectionButtonNew">
                <h2>GESTION DE PEDIDOS</h2>
                <Link className="text-decoration-none" to="/service/products-menu" target="_blank">
                    <button>
                        <i className="bi bi-list-check"></i>
                        <span>Realizar un Pedido</span>
                    </button>
                </Link>
            </section>
            <section className="sectionTablesFilters">
                <form className="row">
                    <section className="col-12 col-md-5">
                        <section className="dropdown">
                            <a id="btnFiltrarUsers" className="dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                <i className="bi bi-funnel"></i><span>Filtrar </span>
                            </a>
                            <ul className="dropdown-menu">
                                {filtrosPedidos.map((filtro, index) => (
                                    <li className="" key={index}>
                                        <a className="dropdown-item" onClick={() => filtrarPedidos(filtro)} href="#">
                                            {filtro}
                                        </a>
                                        {index !== filtrosPedidos.length - 1 && <hr className="m-0" />}
                                    </li>
                                ))}
                            </ul>
                            <button type="button" className="buttonReload" onClick={() => obtenerPedidos()}><i className="bi bi-arrow-repeat fs-4"></i></button>

                        </section>
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
                        <li className="col-2 ">Total</li>
                        <li className="col-1 text-center">Detalle</li>
                        <li className="col-1 text-center ">Pagado</li>
                        <li className="col-3 text-center ">Estado</li>
                    </ul>

                    <section className="accordion" id="accordionExample">
                        {pedidos.map((pedido, index) => (

                            <section key={index} className="accordion-item containerRows">
                                <ul className="accordion-header row py-1" >
                                    <li className="col-1 ps-1">{index + 1}</li>
                                    <li className="col-1 ps-1">{pedido.items.length}</li>
                                    <li className="col-3 ps-3">{pedido.userId}</li>
                                    <li className="col-2 ">{`$ ${pedido.totalPrice}`}</li>
                                    <li className="col-1 li-centrado">
                                        <button
                                            className="collapsed m-0"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target={`#${pedido._id}`}
                                            aria-expanded="false"
                                            aria-controls={pedido._id}
                                            onClick={() => desplegarDetalle(pedido._id)}
                                        >
                                            <i
                                                className={`bi bi-arrow-bar-${idBotonAbierto === pedido._id ? "up" : "down"} m-0`}
                                            ></i>
                                        </button>
                                    </li>
                                    <li className="col-1 li-centrado ">
                                        {!pedido.paid && <button className="deleteButton rounded-5" title="No pagado " ><i className="bi bi-x-lg"></i></button>}
                                        {pedido.paid && <button className="checkButton rounded-5" title="No pagado " >Pagado</button>}
                                    </li>

                                    <li className="col-3 li-centrado">
                                        <span style={{ width: "6.5rem" }}>{pedido.status}</span>
                                        <button className="modificationButton" type="button" data-bs-toggle="modal" data-bs-target="#staticBackdrop" title="Modificar " onClick={() => {
                                            handleModalStatus({
                                                id: pedido._id,
                                                orden: index + 1,
                                                solicitante: pedido.userId,
                                                status: pedido.status
                                            })
                                        }}>{<i className="bi bi-arrow-left-right"></i>}</button>
                                    </li>
                                </ul>
                                <section id={pedido._id} className="accordion-collapse collapse " data-bs-parent="#accordionExample">
                                    <article className="accordion-body contenedorDetalles">
                                        <ul>
                                            <li>
                                                <span className="fw-bold ps-2">Productos</span>
                                                <span className="fw-bold">Subtotal</span>
                                            </li>
                                        </ul>
                                        <ul>
                                            {pedido.items.map((item, indexo) => (
                                                <li key={indexo}>
                                                    <span>{`- ${item.name}`}</span>
                                                    <span>{`$ ${item.price}`}</span>
                                                </li>
                                            ))}
                                        </ul>
                                        <ul>
                                            <li>
                                                <span className="fw-bold ps-2">Fecha: {formatoFecha(pedido.createdAt)}</span>
                                                <span className="fw-bold">Hora: {formatoHora(pedido.createdAt)}</span>
                                            </li>
                                        </ul>
                                    </article>
                                </section>
                            </section>
                        ))}
                    </section>
                </section>
                <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div className="modal-dialog ">
                        <div className="modal-content tamano-modal">
                            <div className="modal-header">
                                <h3 className="modal-title fs-5" id="staticBackdropLabel">Pedido</h3>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={closeModal}></button>
                            </div>
                            <div className="modal-body p-0">
                                <form action="" onSubmit={handleSubmit(formularioCambiarEstado)}>
                                    <p>{`Pedido N°: ${modalInformacion.orden}`}</p>
                                    <p>{`Solicitante: ${modalInformacion.solicitante}`}</p>
                                    <p>{modalInformacion.paid && "Pago: Realizado"}</p>
                                    <p>{!modalInformacion.paid && "Pago: No Realizado"}</p>
                                    <p>{`Estado actual: ${modalInformacion.status}`}</p>
                                    <fieldset>
                                        <legend className="fs-5 fw-semibold"> Modificar Estado</legend>
                                        <Controller
                                            id="status"
                                            name="status"
                                            control={control}
                                            rules={{ required: true }}
                                            render={({ field }) => (
                                                <select {...field} defaultValue={modalInformacion.status} className="form-select" aria-label="Default select example" required>
                                                    <option value="" hidden >Seleccione un estado</option>
                                                    <option value="EN_PROCESO">Cambiar a EN PROCESO</option>
                                                    <option value="COMPLETADA">Cambiar a COMPLETADA</option>
                                                    <option value="CANCELADA">Cambiar a CANCELADA</option>
                                                </select>
                                            )}
                                        />
                                    </fieldset>
                                    <section className="modal-footer">
                                        <button type="button" className="btn text-dark" data-bs-dismiss="modal" onClick={closeModal}>Cerrar</button>
                                        <button type="submit" className="btn text-dark" data-bs-dismiss={"modal"}>Confirmar</button>
                                    </section>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
};
export default AdminOrderControls;