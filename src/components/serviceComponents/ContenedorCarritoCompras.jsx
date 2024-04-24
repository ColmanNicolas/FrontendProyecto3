import axios from 'axios';
import '../serviceComponents/CarritoCompras.css'

const ContenedorCarritoCompras = ({generarPedido, quitarProductoCarrito, closeModal  }) => {

    const borrarProducto = (producto)=>{
        quitarProductoCarrito(producto);
    }
    const handleClose = () => {
        closeModal();
    };
    const handlePedido =()=>{
        generarPedido();
    }

    return (
        <article id='contenedor-articulo-carrito'>
            <h4>Detalle de Productos</h4>
            <section className='contenedor-detalle-producto'>
                <section className='my-1'>
                    <p className='fw-semibold fs-5'>Sanguche de milanesa</p>
                    <p className='d-flex align-items-center fs-5 fw-bold'> $5000<button className='btn btn-dark ms-2' >X</button></p>
                </section>
                <p><span className='fw-semibold'>Descripcion:</span> Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos necessitatibus unde vero error maiores earum ea aperiam, doloribus dolorem veritatis ex laborum! Harum non sapiente tempora cum assumenda quasi tempore.a</p>
            </section>
            <section className='contenedor-detalle-producto'>
                <section className='my-1'>
                    <p className='fw-semibold fs-5'>Sanguche de milanesa</p>
                    <p className='d-flex align-items-center fs-5 fw-bold'> $5000<button className='btn btn-dark ms-2' >X</button></p>
                </section>
                <p><span className='fw-semibold'>Descripcion:</span> Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos necessitatibus unde vero error maiores earum ea aperiam, doloribus dolorem veritatis ex laborum! Harum non sapiente tempora cum assumenda quasi tempore.a</p>
            </section>
            <section className='contenedor-detalle-producto'>
                <section className='my-1'>
                    <p className='fw-semibold fs-5'>Sanguche de milanesa</p>
                    <p className='d-flex align-items-center fs-5 fw-bold'> $5000<button className='btn btn-dark ms-2' >X</button></p>
                </section>
                <p><span className='fw-semibold'>Descripcion:</span> Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos necessitatibus unde vero error maiores earum ea aperiam, doloribus dolorem veritatis ex laborum! Harum non sapiente tempora cum assumenda quasi tempore.a</p>
            </section>
            <section className='contenedor-detalle-producto'>
                <section>
                <p className='fs-5 fw-semibold'>TOTAL</p>
                <p className='fs-4 fw-semibold'>$ 15000</p>
                </section>
            </section>
            <section className='contenedor-botones-carrito px-2'>
                <button onClick={handleClose}  className='btn btn-dark'>Cerrar Carrito</button>
                <button onClick={handleClose}  className='btn btn-dark'>Cancelar pedido</button>
                <button onClick={handlePedido} className='btn btn-dark'>Confirmar pedido</button>
            </section>
            <section className='w-100'>
                    <button onClick={() => { quitarProductoCarrito("pizza") }}>borrar pizza</button>
                    <button onClick={() => { quitarProductoCarrito("sanguche") }}>borrar sanguche</button>
                    <button onClick={() => { quitarProductoCarrito("cocacola") }}>borrar cocacola</button>
                </section>
        </article>
    )
}

export default ContenedorCarritoCompras;