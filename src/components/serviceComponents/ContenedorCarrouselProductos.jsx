import React, { useState, useEffect } from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import '../serviceComponents/ContenedorCarrouselProductos.css';
import useMenuState from '../../hooks/useMenuState';

import superimagen from "../../public/sandwich-de-milanesa.jpg";

const categories = [
    "Promociones",
    "Entradas",
    "Al plato",
    "Empanadas",
    "Hamburguesas",
    "Pastas",
    "Pizzas",
    "Sandwiches",
    "Sushi",
    "Postres",
    "Bebidas",
    "Bebidas alcohólicas",
];

function ContenedorCarrouselProductos({ agregarProductoCarrito }) {
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [cartItems, setCartItems] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('Promociones');
    const { menus, categoriasMenu, obtenerMenus, filtrarMenus } = useMenuState();

    useEffect(() => {
        obtenerMenus();
    }, []);

    const handleProductSelect = (product) => {
        setSelectedProduct(product);
    };

    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
    };

    const filteredProducts = menus.filter(product => product.category === selectedCategory);

    const responsive = {
        0: { items: 1 },
        350: { items: 2 },
        576: { items: 3 },
        720: { items: 4 },
        992: { items: 5 }
    };

    const responsiveTarjetas = {
        0: { items: 1 },
        350: { items: 2 },
        576: { items: 3 },
        720: { items: 4 },
        992: { items: 5 }
    };

    const renderCustomDots = (currentIndex, allItems) => (
        <div className="custom-dots">
            {allItems.map((item, index) => (
                <span
                    key={index}
                    className={`dot ${index === currentIndex ? 'active' : ''}`}
                    onClick={() => handleDotClick(index)}
                >
                    {index + 1}
                </span>
            ))}
        </div>
    );

    const handleDotClick = (index) => {
    };

    return (
        <div id='contenedor-principal-menu'>
            <h1 className="title fs-2 ">Selección de Menú</h1>
            <div className="categories-carousel mt-4">
                <AliceCarousel
                    mouseTracking
                    items={categories.map(category => (
                        <button
                            key={category}
                            className={`category-button ${selectedCategory === category.toLocaleLowerCase() ? 'selected' : ''}`}
                            onClick={() => handleCategorySelect(category)}
                        >
                            {category}
                        </button>
                    ))}
                    responsive={responsive}
                    buttonsDisabled={false}
                    infinite={true}
                />
            </div>
            <div className="mt-4">
            <h2 className="title">{selectedCategory}</h2>

            <AliceCarousel
                mouseTracking
                items={filteredProducts.map((product, index) => (
                    <div key={index} className="product-card" onClick={() => handleProductSelect(product)}>

                        {/*IMAGEN DE LAS TARJETAS PEQUEÑAS */}
                        {product.image && <img src={product.image} alt={product.name} className="product-image" />}
                        {!product.image && <img src={superimagen} alt={product.name} className="product-image" />}
                        <div className="product-info">
                            <h3 className="product-name">{product.name}</h3>
                            <p className="product-price">${product.price}</p>
                        </div>
                    </div>
                ))}
                responsive={responsiveTarjetas}
                buttonsDisabled={false}
                infinite={true}
                stagePadding={{ paddingRight: 100, paddingLeft: 100 }}
                renderDotsNavigation={renderCustomDots} // Utiliza la función para renderizar los puntos de navegación personalizados
            />
        </div>
            {selectedProduct && (
                <section className="selected-product">
                    <section id='contenedor-boton-cerrar-responsive'>
                        <button onClick={() => { setSelectedProduct(null) }}>X</button>
                    </section>
                    <article className='articulo-con-imagen' >
                        <h2>{selectedProduct.name}</h2>

                        {/*IMAGEN DE LA TARJETA GRANDE */}

                        <figure>
                            {selectedProduct.image && <img src={selectedProduct.image} alt={selectedProduct.name} className="product-image" />}
                            {!selectedProduct.image && <img src={superimagen} alt={selectedProduct.name} className="product-image" />}
                        </figure>
                        {selectedProduct.detail && <figcaption>Descripción: {selectedProduct.detail}</figcaption>}
                    </article>
                    <article className="articulo-product-info">
                        <section id='contenedor-boton-cerrar'>
                            <button onClick={() => { setSelectedProduct(null) }}>X</button>
                        </section>
                        <section className='contenedor-precio-agregar'>
                            <h3 className=''>Precio: ${selectedProduct.price}</h3>
                            <button onClick={() => { agregarProductoCarrito(selectedProduct) }}>Agregar al carrito</button>
                        </section>
                    </article>
                </section>
            )}
        </div>
    );
}

export default ContenedorCarrouselProductos;
