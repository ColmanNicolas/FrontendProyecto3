import React, { useEffect, useState } from 'react';
import ModalEstructuraBase from '../components/ModalEstructuraBase';
import useModal from '../hooks/useModal';
import ContenedorCarritoCompras from '../components/serviceComponents/ContenedorCarritoCompras';

import pizza from '../public/pizza-muzarella.jpg';
import empanada from '../public/docena-empanadas.jpg';
import sanguche from '../public/sandwich-de-milanesa.jpg';

import "../pages/ServiceMenus.css"
import axios from 'axios';

const products = [
    { name: 'Pizza muzzarella', price: 10, description: 'salsa de tomate, muzzarella, aceitunas verdes.', image: pizza },
    { name: 'Sandwich de milanesa especial', price: 8, description: 'mila de carne/pollo, aderezos a eleccion, tomate y lechuga, jamon/queso.', image: empanada },
    { name: 'Empanadas', price: 5, description: 'empanadas de carne/pollo/jamon y queso.', image: sanguche }
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
        const index = productOrderList.findIndex(item => item === product);

        if (index !== -1) {
            const nuevaListaProductos = [...productOrderList];
            nuevaListaProductos.splice(index, 1);
            setProductOrder(nuevaListaProductos);
        }
    };
    const generarPedido = async()=>{
        try {
            
        const userId = "id usuario";
        const items = products;
        let totalPrice = 0;
        items.map((producto)=>{
            totalPrice = totalPrice + producto.price;
        })
        console.log(userId,items,totalPrice);
        await axios.post("http://localhost:5000/api/order",{userId,items,totalPrice})
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
            <main id='fondoMenu'>
                <section className='text-end p-3'>
                    <button type="button" onClick={() => { openModal(true) }} class="btn btn-light">
                    CARRITO DE COMPRAS <span className="badge text-bg-secondary">{cantidadProducto}</span>
                    </button>
                </section>
                <section className='w-100'>
                    <button onClick={() => { agregarProductoCarrito("pizza") }}>pizza</button>
                </section>
                <section className='w-100'>
                    <button onClick={() => { agregarProductoCarrito("sanguche") }}> sanguche</button>
                </section>
                <section className='w-100'>
                    <button onClick={() => { agregarProductoCarrito("cocacola") }}>cocacola </button>
                </section>
                <section className='w-100'>
                    <button className='btn btn-dark' onClick={() => { generarPedido()}}>Generar Pedido </button>
                </section>

                <div className="container">
                    <h1>Selección De Menú</h1>
                    <div className="product-grid">
                        {products.map((product, index) => (
                            <div key={index} className="product-card" onClick={() => handleProductSelect(product)}>
                                <img src={product.image} alt={product.name} className="product-image" />
                                <div className="product-info">
                                    <h3 className="product-name">{product.name}</h3>
                                    <p className="product-price">${product.price}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    {selectedProduct && (
                        <div className="selected-product">
                            <h2>Producto Seleccionado: {selectedProduct.name}</h2>
                            <img src={selectedProduct.image} alt={selectedProduct.name} className="selected-product-image" />
                            <p>Precio: ${selectedProduct.price}</p>
                            <p>Descripción: {selectedProduct.description}</p>
                        </div>
                    )}
                </div>
                <figure>
                    <img src={"masha-kotliarenko-7qDBoSUBfvI-unsplash.jpg"} alt="" width={"200px"} height={"200px"} />
                </figure>
                {isOpen && <ModalEstructuraBase closeModal={closeModal} >
                    <h3>Carrito de compras</h3>
                    <ContenedorCarritoCompras generarPedido={generarPedido} quitarProductoCarrito={quitarProductoCarrito} closeModal={closeModal}  />
                </ModalEstructuraBase>}
            </main>
        </>
    )
}

export default ServiceMenus;