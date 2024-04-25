import React, { useEffect, useState } from 'react';
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

    const handleProductSelect = (product) => {
        setSelectedProduct(product);
    };
    const agregarProductoCarrito = (product) => {
        setProductOrder([...productOrderList, product]);
    };
    const quitarProductoCarrito = (product) => {
        console.log("recibo:", product);
        const index = productOrderList.findIndex(item => item.name === product);
        console.log(index);
        if (index !== -1) {
            console.log("entro a borrar");
            const nuevaListaProductos = [...productOrderList];
            nuevaListaProductos.splice(index, 1);
            setProductOrder(nuevaListaProductos);
        }
    };

    const generarPedido = async () => {
        try {

            const userId = "id usuario";
            const items = productOrderList;
            let totalPrice = 0;
            items.map((producto) => {
                totalPrice = totalPrice + producto.price;
            })
            console.log(userId, items, totalPrice);
            await axios.post("http://localhost:5000/api/order", { userId, items, totalPrice })
                .then(response => {
                    console.log(response);
                    closeModal();
                })
        } catch (error) {
            console.log(error);

        }
    }

    useEffect(() => {
        setCantidadProducto(productOrderList.length)
        console.log(productOrderList);
    }, [productOrderList])

    return (

        <>
            <Navbar />
            <main id='fondoMenu'>
                <section className='text-end p-3'>
                    <button type="button" onClick={() => { openModal(true) }} class="btn btn-light">
                        CARRITO DE COMPRAS <span className="badge text-bg-secondary">{cantidadProducto}</span>
                    </button>
                </section>
                <section className='w-100'>
                    <button onClick={() => { agregarProductoCarrito(products[0]) }}>pizza</button>
                </section>
                <section className='w-100'>
                    <button onClick={() => { agregarProductoCarrito(products[1]) }}> sanguche</button>
                </section>
                <section className='w-100'>
                    <button onClick={() => { agregarProductoCarrito(products[2]) }}>cocacola </button>
                </section>
                <section className='w-100'>
                    <button className='btn btn-dark' onClick={() => { generarPedido() }}>Generar Pedido </button>
                </section>

                <ContenedorCarrouselProductos />


                {isOpen && <ModalEstructuraBase closeModal={closeModal} >
                    <h3>Carrito de compras</h3>
                    <ContenedorCarritoCompras productOrderList={productOrderList} generarPedido={generarPedido} quitarProductoCarrito={quitarProductoCarrito} closeModal={closeModal} />
                </ModalEstructuraBase>}
            </main>
            <Footer />

        </>
    )
}

export default ServiceMenus;