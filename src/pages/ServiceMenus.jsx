import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ModalEstructuraBase from '../components/ModalEstructuraBase';
import useModal from '../hooks/useModal';
import ContenedorCarritoCompras from '../components/serviceComponents/ContenedorCarritoCompras';
import pizza from '../public/pizza-muzarella.jpg';
import empanada from '../public/docena-empanadas.jpg';
import sanguche from '../public/sandwich-de-milanesa.jpg';
import "../pages/ServiceMenus.css"
import axios from 'axios';
import Navbar from "../components/navBar/Navbar"
import ContenedorCarrouselProductos from '../components/serviceComponents/ContenedorCarrouselProductos';
import Footer from '../components/Footer';
import useMenuState from '../hooks/useMenuState';

const products = [
    { name: 'Pizza muzzarella', price: 10, detail: 'salsa de tomate, muzzarella, aceitunas verdes.', image: pizza },
    { name: 'Sandwich de milanesa especial', price: 8, detail: 'mila de carne/pollo, aderezos a eleccion, tomate y lechuga, jamon/queso.', image: empanada },
    { name: 'Empanadas', price: 5, detail: 'empanadas de carne/pollo/jamon y queso.', image: sanguche }
];

const ServiceMenus = () => {
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [productOrderList, setProductOrder] = useState([]);
    const [cantidadProducto, setCantidadProducto] = useState(null);
    const { isOpen, openModal, closeModal } = useModal(false);
    const navigate = useNavigate();

    const handleProductSelect = (product) => {
        setSelectedProduct(product);
    };

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