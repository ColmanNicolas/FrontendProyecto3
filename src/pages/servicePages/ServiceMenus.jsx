import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

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

            await axios.post("https://backendproyecto3-1.onrender.com/api/order", { rest, items, totalPrice });
            cancelarPedido();
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
                <section className='text-end p-3'>
                    <button type="button" onClick={() => openModal(true)} className="btn btn-light">
                        CARRITO DE COMPRAS <span className="badge text-bg-secondary">{cantidadProducto}</span>
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
            <Footer />
        </>
    );
};

export default ServiceMenus;