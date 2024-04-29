import React from 'react';

function Footer() {
    return (
        <footer>
            <div className="container-fluid row footer">
                <div className="col-12 col-md-4 mb-md-0">
                    <div className="d-flex justify-content-center">
                        <img className="w-25" src="" alt="Logo" />
                    </div>
                    <p className="h1 text-dark text-center mb-0">Tu Bar</p>
                    <p className="text-dark text-center mb-0">Tecnologia Gastronomica</p>
                    <p className="text-dark text-center mb-0">Sólo lo encontrás aquí</p>
                </div>
                <div className="col-12 col-md-4 mb-4 mb-md-0 redes-sociales">
                    <ul className="list-unstyled text-center fs-5">
                        <li>
                            <a href="https://facebook.com" className='text-dark'><i className="fa-brands fa-facebook px-2 mt-5"></i>Facebook</a>
                        </li>
                        <li>
                            <a href="https://instagram.com" className='text-dark'><i className="fa-brands fa-instagram px-2 mt-3"></i>Instagram</a>
                        </li>
                        <li>
                            <a href="https://twitter.com" className='text-dark'><i className="fa-brands fa-x-twitter px-2 mt-3"></i>Twitter-X</a>
                        </li>
                        <li>
                            <a href="https://telegram.com" className='text-dark'><i className="fa-brands fa-telegram px-2 mt-3"></i>Telegram</a>
                        </li>
                        <p className="fs-6 text-dark mt-5">&copy; Todos los derechos reservados</p>
                    </ul>
                </div>
                <div className="col-12 col-md-4 info-footer text-center mt-3">
                    <p className="fs-4 text-secondary mb-0 mt-2">Atención al cliente:</p>
                    <p className="fs-4 text-dark mt-2"><i class="fa-solid fa-phone px-2"></i>381-5442345</p>
                    <p className="fs-4 text-dark"><i class="fa-solid fa-phone px-2"></i>381-6877472</p>
                    <p className="fs-4 text-secondary mb-0">Lunes a Viernes de 09.00 a 18.00</p>
                    <p className="fs-4 text-secondary">Sábados de 9.00 a 13.00</p>
                </div>
            </div>
        </footer>

    );
}

export default Footer;