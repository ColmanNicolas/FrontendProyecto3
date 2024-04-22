import React, { useState } from 'react';
import "../pages/ServiceMenus.css"

const products = [
  { name: 'Pizza', price: 10, quality: 'Buena', image: 'pizza.jpg' },
  { name: 'Sandwich de milanesa', price: 8, quality: 'Buena', image: 'sandwich.jpg' },
  { name: 'Empanadas', price: 5, quality: 'Buena', image: 'empanadas.jpg' }
];
const ServiceMenus = () => {
    const [selectedProduct, setSelectedProduct] = useState(null);

    const handleProductSelect = (product) => {
      setSelectedProduct(product);
    };
  
    return (
        <>
        <main id='fondoMenu'>

            <div className="container">
                <h1>Seleccion De Menú</h1>
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
                        <p>Calidad: {selectedProduct.quality}</p>
                    </div>
                )}
            </div>
        </main>

        </>
    )
}

export default ServiceMenus;