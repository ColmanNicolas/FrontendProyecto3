import React, { useState, useEffect } from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css'; // Importa los estilos del carrusel
import '../serviceComponents/ContenedorCarrouselProductos.css'; // Importar estilos CSS externos
import useMenuState from '../../hooks/useMenuState';

// Lista de productos de alimentos con imágenes
const products = [
    { name: 'Pizza muzzarella', price: 10, description: 'salsa de tomate, muzzarella, aceitunas verdes', category: 'Pizzas', image: '/public/pizza-muzzarella.jpg' },
    { name: 'Sandwich de milanesa especial', price: 8, description: 'mila de carne/pollo, aderezos a eleccion, tomate y lechuga, jamon/queso', category: 'Sandwichs', image: '/public/sandwich-de-milanesa.jpg' },
    { name: 'Empanadas', price: 5, description: 'empanadas de carne/pollo/jamon y queso.', category: 'Empanadas', image: '/public/docena-empanadas.jpg' },
    { name: 'Pizza Napolitana', price: 12, description: 'salsa de tomate, muzzarella, aceitunas verdes, anchoas, ajo, orégano', category: 'Pizzas', image: '/public/pizza-napolitana.jpg' },
    { name: 'Pizza Especial', price: 11, description: 'salsa de tomate, muzzarella, jamón, morrón, huevo, aceitunas, ajo, orégano', category: 'Pizzas', image: '/public/pizza-especial.jpg' },
    { name: 'Pizza a la piedra', price: 13, description: 'salsa de tomate, muzzarella, albahaca, ajo, orégano, aceitunas negras', category: 'Pizzas', image: '/public/pizza-a-la-piedra.jpg' },
    { name: 'Pizza Fugazzeta', price: 14, description: 'muzzarella, cebolla, ajo, aceite, orégano', category: 'Pizzas', image: '/public/pizza-fugazzeta.jpg' },
    { name: 'Empanadas de carne', price: 2, description: 'empanadas de carne picada con aderezos especiales.', category: 'Empanadas', image: '/public/empanadas-carne.jpg' },
    { name: 'Empanadas de pollo', price: 2, description: 'empanadas de pollo con aderezos especiales.', category: 'Empanadas', image: '/public/empanadas-pollo.jpg' },
    { name: 'Empanadas de Jamon y Queso', price: 2, description: 'empanadas de jamon y queso con aderezos especiales.', category: 'Empanadas', image: '/public/empanadas-jamon-queso.jpg' },
    { name: 'Empanadas calabresa', price: 2, description: 'empanadas de calabresa con aderezos especiales.', category: 'Empanadas', image: '/public/empanadas-calabresa.jpg' },
    { name: 'Sandwich de milanesa comun de carne', price: 6, description: 'sandwich de milanesa comun de carne.', category: 'Sandwichs', image: '/public/sandwich-milanesa-comun.jpg' },
    { name: 'Sandwich de milanesa de pollo comun', price: 6, description: 'sandwich de milanesa comun de pollo.', category: 'Sandwichs', image: '/public/sandwich-milanesa-pollo-comun.jpg' },
    { name: 'Sandwich milanesa X4', price: 15, description: 'Sandwich con cuatro milanesas, lechuga, tomate y mayonesa.', category: 'Sandwichs', image: '/public/sandwich-milanesa-x4.jpg' },
    { name: '2 Sandwichs de Milanesa comun + 1 Gaseosa', price: 16, description: 'Dos sandwiches de milanesa comun de carne con una gaseosa a eleccion.', category: 'Promociones', image: '/public/promo-sandwich-milanesa-gaseosa.jpg' },
    { name: '2 pizzas comun + 1 Gaseosa', price: 20, description: 'Dos pizzas comunes con una gaseosa a eleccion.', category: 'Promociones', image: '/public/promo-pizza-gaseosa.jpg' },
    { name: '2 Sandwichs especiales + 1 pizza comun + 1 gaseosa', price: 25, description: 'Dos sandwiches especiales con una pizza comun y una gaseosa a eleccion.', category: 'Promociones', image: '/public/promo-sandwich-especial-pizza-gaseosa.jpg' },
    { name: 'Agregado de Papas Fritas comunes', price: 3, description: 'Papas fritas tradicionales.', category: 'Papas Fritas', image: '/public/papas-fritas.jpg' },
    { name: 'Papas Gratinadas', price: 4, description: 'Papas con queso gratinado.', category: 'Papas Fritas', image: '/public/papas-gratinadas.jpg' },
    { name: 'Papas Bravas', price: 4, description: 'Papas con salsa brava y alioli.', category: 'Papas Fritas', image: '/public/papas-bravas.jpg' },
    { name: 'Papas con cheddar y bacon', price: 5, description: 'Papas fritas con cheddar derretido y trozos de bacon.', category: 'Papas Fritas', image: '/public/papas-cheddar-bacon.jpg' }
];

const categories = [
    "Promociones",
    "Comida Extranjera",
    "Bebidas",
    "Bebidas alcohólicas",
    "Al plato",
    "Empanadas",
    "Entradas",
    "Hamburguesas",
    "Fideos",
    "Postres",
    "Pizzas",
    "Sanguches",
    "Sopas",
    "Sushi",
    "Tacos"
];

function ContenedorCarrouselProductos() {
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [cartItems, setCartItems] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('Promociones');
    const { menus, categoriasMenu, obtenerMenus, filtrarMenus } = useMenuState();

    useEffect(() => {
        obtenerMenus()
    }, []);

    const handleProductSelect = (product) => {
        setSelectedProduct(product);
    };

    const handleAddToCart = () => {
        if (selectedProduct) {
            setCartItems([...cartItems, selectedProduct]);
        }
    };

    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
    };

    const handleCartSelect = () => {
        // Implementar lógica para mostrar los detalles del carrito
    };

    const filteredProducts = products.filter(product => product.category === selectedCategory);

    const responsive = {
        0: { items: 1 },
        350: { items: 2 },
        576: { items: 3 },
        720: { items: 4 },
        992: { items: 100 }
    };

    return (
        <div id='contenedor-principal-menu'>
            <h1 className="title fs-2">Selección de Menú</h1>
            <div className="categories-carousel">
                <AliceCarousel
                    mouseTracking
                    items={categories.map(category => (
                        <button key={category} className={`category-button ${selectedCategory === category ? 'selected' : ''}`} onClick={() => handleCategorySelect(category)}>{category}</button>
                    ))}
                    responsive={responsive}
                    buttonsDisabled={true}
                    infinite={false}

                />
            </div>
            <h2 className="title ">{selectedCategory}</h2>

            <AliceCarousel
                mouseTracking
                items={filteredProducts.map((product, index) => (
                    <div key={index} className="product-card" onClick={() => handleProductSelect(product)}>
                        <img src={product.image} alt={product.name} className="product-image" />
                        <div className="product-info">
                            <h3 className="product-name">{product.name}</h3>
                            <p className="product-price">${product.price}</p>
                        </div>
                    </div>
                ))}
                responsive={responsive}
                buttonsDisabled={true}
                infinite={false}
                stagePadding={{ paddingRight: 100, paddingLeft: 100 }}
            />
            {selectedProduct && (

                <section className="selected-product">
                    <section id='contenedor-boton-cerrar-responsive'>
                        <button onClick={() => { setSelectedProduct(null) }}>X</button>
                    </section>
                    <article className='articulo-con-imagen' >
                        <h2>{selectedProduct.name}</h2>
                        <figure>
                            <img src={selectedProduct.image} alt={selectedProduct.name} className="selected-product-image" />
                        </figure>
                        {selectedProduct.description && <figcaption>Descripción: {selectedProduct.description}</figcaption>}
                    </article>
                    <article className="articulo-product-info">
                        <section id='contenedor-boton-cerrar'>
                            <button onClick={() => { setSelectedProduct(null) }}>X</button>
                        </section>
                        <section className='contenedor-precio-agregar'>
                            <h3 className=''>Precio: ${selectedProduct.price}</h3>
                            <button onClick={handleAddToCart}>Agregar al carrito</button>
                        </section>
                    </article>
                </section>
            )}
            {cartItems.length > 0 && (
                <div className="cart">
                    <h2>Carrito de Compras</h2>
                    <button onClick={handleCartSelect}>Ver Detalles del Carrito</button>
                </div>
            )}
        </div>
    );
}

export default ContenedorCarrouselProductos;