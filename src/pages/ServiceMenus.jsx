import React, { useState } from 'react';
import pizzaMuzzarellaImage from '..public/pizza-muzarella.jpg';
import sandwichMilanesaImage from '/sandwich-de-milanesa.jpg';
import docenaEmpanadasImage from '../docena-empanadas.jpg';

import "../pages/ServiceMenus.css"

const products = [
    { name: 'Pizza muzzarella', price: 10, description: 'salsa de tomate, muzzarella, aceitunas verdes.', image: '../pizza-muzarella.jpg' },
    { name: 'Sandwich de milanesa especial', price: 8, description: 'mila de carne/pollo, aderezos a eleccion, tomate y lechuga, jamon/queso.', image: '/sandwich-de-milanesa.jpg' },
    { name: 'Empanadas', price: 5, description: 'empanadas de carne/pollo/jamon y queso.', image: '/docena-empanadas.jpg' }
  ];
const ServiceMenus = () => {
    const [selectedProduct, setSelectedProduct] = useState(null);

    const handleProductSelect = (product) => {
        console.log(product.image)
        setSelectedProduct(product);
    };

    return (
        <>
            <main id='fondoMenu'>
                <div className="container">
                    <h1>Selección De Menú</h1>
                    <div className="product-grid">
                        {products.map((product, index) => (
                            <div key={index} className="product-card" onClick={() => handleProductSelect(product)}>
                                <img src={pizzaMuzzarellaImage} alt={product.name} className="product-image" />
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
            </main>
        </>
    )
}

export default ServiceMenus;