import axios from 'axios';
import '../serviceComponents/CarritoCompras.css'
import MenuItem from './MenuItem';
import './Menu.css';
import { useEffect } from 'react';

const ContenedorCarritoCompras = ({ generarPedido, quitarProductoCarrito, closeModal, productOrderList }) => {

    const borrarProducto = (producto) => {
        quitarProductoCarrito(producto);
    }
    const handleClose = () => {
        closeModal();
    };
    const handlePedido = () => {
        generarPedido();
    }
    useEffect(() => {
        console.log("recibo prodcutos,", productOrderList);
    }, [])
    return (
        <article id='contenedor-articulo-carrito'>
            <h4>Detalle de Productos</h4>
            <section className="menu">

                {productOrderList.map(item => (
                    <MenuItem key={item.id} comida={item.name} detalle={item.description} precio={item.price} quitarProductoCarrito={quitarProductoCarrito} />
                ))}
            </section>
            <section className='contenedor-detalle-producto'>
                <section>
                    <p className='fs-5 fw-semibold'>TOTAL</p>
                    <p className='fs-4 fw-semibold'>
                        {"$" + productOrderList.map(item => {
                            // Parsear el precio a entero antes de sumarlo
                            const precioEntero = parseInt(item.price, 10);
                            return precioEntero;
                        }).reduce((total, precioEntero) => total + precioEntero, 0)}
                    </p>
                </section>
            </section>
            <section className='contenedor-botones-carrito px-2'>
                <button onClick={handleClose} className='btn btn-dark'>Cerrar Carrito</button>
                <button onClick={handleClose} className='btn btn-dark'>Cancelar pedido</button>
                <button onClick={handlePedido} className='btn btn-dark'>Confirmar pedido</button>
            </section>
            <section className='w-100'>
            </section>
        </article>
    )
}

export default ContenedorCarritoCompras;