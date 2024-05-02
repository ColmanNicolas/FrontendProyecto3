import React, { useEffect } from 'react';
import './Menu.css';

function MenuItem({ comida, detalle, precio, quitarProductoCarrito }) {
  useEffect(()=>{
  },[])
  return (
    <main className="menu-item">
        <section className='d-flex'>
            <h3 className="comida-menu">{comida}</h3>
            <p className="precio-menu fs-3 text-black">{`$ ${precio}`}</p>
        </section>
        <section className='d-flex '>
        <p className="detalle-menu pb-0 mb-0"><strong>Descripcion: </strong>{detalle}</p>
        {quitarProductoCarrito && <button className='ms-auto btn-quitar-producto' onClick={()=>{quitarProductoCarrito(comida)}}>Descartar</button>}
        </section>
    </main>
  );
}

export default MenuItem;
