import React, { useState, useEffect } from 'react';
import "../components/NavegarHastaTope.css"

const ScrollToTopButton = () => {
    const [isVisible, setIsVisible] = useState(false);

    // Mostrar el botón cuando el usuario ha desplazado más de 300px desde la parte superior
    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility);

        return () => {
            window.removeEventListener('scroll', toggleVisibility);
        };
    }, []);

    // Llevar al usuario de vuelta al principio de la página cuando hace clic en el botón
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <button
            className={`scroll-to-top-button ${isVisible ? 'visible' : ''}`}
            onClick={scrollToTop}
        >
            <i class="bi bi-arrow-90deg-up"></i>
        </button>
    );
};

export default ScrollToTopButton;