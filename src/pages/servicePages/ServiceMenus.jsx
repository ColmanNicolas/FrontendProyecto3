import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';


import useModal from '../../hooks/useModal';
import pizza from '../../assets/pizza-muzarella.jpg';
import empanada from '../../assets/docena-empanadas.jpg';
import sanguche from '../../assets/sandwich-de-milanesa.jpg';
import Footer from '../../components/servicePageComponents/Footer';
import ModalEstructuraBase from '../../components/ModalEstructuraBase';
import Navbar from "../../components/servicePageComponents/navBar/Navbar";
import ContenedorCarritoCompras from '../../components/servicePageComponents/ContenedorCarritoCompras';
import ContenedorCarrouselProductos from '../../components/servicePageComponents/ContenedorCarrouselProductos';

import "../servicePages/ServiceMenus.css"


const ServiceMenus = () => {
    const [productOrderList, setProductOrder] = useState([]);
    const [cantidadProducto, setCantidadProducto] = useState(null);
    const { isOpen, openModal, closeModal } = useModal(false);
    const navigate = useNavigate();

    const agregarProductoCarrito = (product) => {
        toast.success(`${product.name} agregado al carrito`, { theme: 'dark' });
        setProductOrder([...productOrderList, product]);
        
    };

    const quitarProductoCarrito = (product) => {
        const index = productOrderList.findIndex(item => item.name === product);
        if (index !== -1) {
            const nuevaListaProductos = [...productOrderList];
            nuevaListaProductos.splice(index, 1);
            setProductOrder(nuevaListaProductos);
        }
    };

    const cancelarPedido = () => {
        setProductOrder([]);
        closeModal();
    };

    const generarPedido = async () => {
        try {
            const storedUser = sessionStorage.getItem('loguedUser');
            const parsedUser = JSON.parse(storedUser);

            if (!parsedUser) {
                navigate('/service/login');
                return;
            }

            const { token, ...rest } = parsedUser;
            const items = productOrderList;
            let totalPrice = 0;

            items.forEach((producto) => {
                totalPrice += producto.price;
            });

            const response = await axios.post("https://backendproyecto3-1.onrender.com/api/order", { rest, items, totalPrice });
            console.log(response);
            toast.success(`Pedido realizado correctamente, N° orden: ${response.data.newOrder.orderNumber} `, { theme: 'dark' });
            cancelarPedido();
            setTimeout(() => {
                navigate(`/service/mi-cuenta`);
            }, 4000);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        setCantidadProducto(productOrderList.length);
    }, [productOrderList]);

    useEffect(() => {
        const userLogued = sessionStorage.getItem('loguedUser');
        if (!userLogued) {
            navigate('/service/login');
        }
    }, [navigate]);

    return (
        <>
            <Navbar />
            <main id='fondoMenu'>
                <section id='botonCarritoCompra' className='text-end p-3'>
                    <button type="button" onClick={() => openModal(true)} className="btn btn-light fs-5 ">
                    <i className="bi bi-cart "></i> <span className="badge bg-primary text-white fw-bold fs-6">{cantidadProducto}</span>
                    </button>
                </section>

                <ContenedorCarrouselProductos agregarProductoCarrito={agregarProductoCarrito} />

                {isOpen && (
                    <ModalEstructuraBase closeModal={closeModal}>
                        <h3>Carrito de compras</h3>
                        <ContenedorCarritoCompras
                            productOrderList={productOrderList}
                            generarPedido={generarPedido}
                            quitarProductoCarrito={quitarProductoCarrito}
                            cancelarPedido={cancelarPedido}
                            closeModal={closeModal}
                        />
                    </ModalEstructuraBase>
                )}
            </main>
            <ToastContainer />
            <section style={{height:"7vh"}}></section>
            <Footer />
        </>
    );
};

export default ServiceMenus;