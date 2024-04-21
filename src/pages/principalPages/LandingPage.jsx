import { FaBeer } from "react-icons/fa";
import '../principalPages/LandingPage.css'
import { Link } from "react-router-dom";

const LandingPage = () => {
    return (
        <>
            <header className='headerLanding '>
                <h1 className=" m-0 ">BAR APP SERVICE</h1>
                <Link to={"auth"}><i class="bi bi-person-vcard-fill fs-3"></i><p>ACCESO</p></Link>
            </header>
            <section id="contenedor-menu">
                <a href="#contenedor-menu" id="abrir-menu"><i class="bi bi-list f1" ></i></a>
                <a href="#"><i class="bi bi-x-circle" id="cerrar-menu"></i></a>
                <nav id="home" className="navBarLanding">
                    <ul id="contenedor-enlaces">
                        <li><a href="#home">Home</a></li>
                        <li><a href="#informacion">Información</a></li>
                        <li><a href="#precios">Precios</a></li>
                        <li><a href="">Contacto</a></li>
                        <li><a href="#recomendaciones">Recomendaciones</a></li>
                        <li><a href="#prueba7dias">Prueba de 7 dias</a></li>
                    </ul>
                </nav>
            </section>
            <main className="mainLanding" >
                <section >
                    <article id="home">
                        <figure className='contenedorImagen'>
                            <figcaption >POTENCIA LA GESTION DE TU NEGOCIO</figcaption>
                        </figure>
                    </article>
                    <section id="informacion" className='sectionSeparator'>
                        <h2>INFORMACION</h2>
                    </section>
                    <section className='contendoresIntroduccionServicio fondoOscuro'>
                        <section >
                            <article>
                                <h3>¿QUE ES BAR APP?</h3>
                                <hr className='text-white border-3 fw-bold' />
                                <p>Ofrecemos una plataforma web que simplifica la gestión interna de tu negocio de comidas.</p>
                                <p>Integra administración del personal, control de inventario y la creación de menús, nuestro software centraliza todas estas funciones clave.</p>
                                <p> Además, permite la visualización rápida y fácil de pedidos, optimizando tus operaciones y permitiendo brindar la mejor experiencia gastronómica a tus clientes.  </p>
                            </article>
                            <article >
                                <h3>SERVICIOS</h3>
                                <hr className='text-white border-3 fw-bold' />
                                <p>Cada uno de nuestros servicios ofrece una gestión integral desde la perspectiva administrativa </p>
                                <p>Presentamos funcionalidades que se adaptan a diferentes tipos de negocios de comida, como bares, restaurantes, pubs e incluso locales de comida rápida.</p>
                            </article>
                        </section>
                    </section>
                    <section id="precios" className='sectionSeparator'>
                        <h2>PRECIOS</h2>
                    </section>
                    <section className='contenedorServicios'>
                        <article >
                            <h3>STANDARD SERVICE</h3>
                            <ul>
                                <li><p>Gestión de Personal</p><i class="bi bi-check2-circle text-success fs-4"></i></li>
                                <li><p>Creación de Menús</p><i class="bi bi-check2-circle text-success fs-4"></i></li>
                                <li><p>Administración de Pedidos</p><i class="bi bi-check2-circle text-success fs-4"></i></li>
                                <li><p>Control de Stock</p><i class="bi bi-check2-circle text-success fs-4"></i></li>
                                <li><p>Menú Virtual</p><i class="bi bi-check2-circle text-success fs-4"></i></li>
                                <li><p>Configuración Visual de Menú</p><i class="bi bi-x-circle text-danger fs-5"></i></li>
                                <li><p>Búsqueda en Menú</p><i class="bi bi-x-circle text-danger fs-5"></i></li>
                                <li><p>Filtrar Menú</p><i class="bi bi-x-circle text-danger fs-5"></i></li>
                                <li><p>Login para Clientes</p><i class="bi bi-x-circle text-danger fs-5"></i></li>
                                <li><p>Pago en la Aplicación</p><i class="bi bi-x-circle text-danger fs-5"></i></li>
                                <li><p>Seguimiento de Pedido</p><i class="bi bi-x-circle text-danger fs-5"></i></li>
                                <li><p>Delivery de Pedidos</p><i class="bi bi-x-circle text-danger fs-5"></i></li>
                                <li><p>Retiro de un Pedido</p><i class="bi bi-x-circle text-danger fs-5"></i></li>
                            </ul>
                            <section className='text-center'>
                                <button className='btn btnPrecio' > 100 usd</button>
                            </section>
                        </article>
                        <article className="articleSecondService">
                            <h3>SELF-MANAGEMENT TERMINAL</h3>
                            <ul>
                                <li><p>Gestión de Personal</p><i class="bi bi-check2-circle text-success fs-4"></i></li>
                                <li><p>Creación de Menús</p><i class="bi bi-check2-circle text-success fs-4"></i></li>
                                <li><p>Administración de Pedidos</p><i class="bi bi-check2-circle text-success fs-4"></i></li>
                                <li><p>Control de Stock</p><i class="bi bi-check2-circle text-success fs-4"></i></li>
                                <li><p>Menú Virtual</p><i class="bi bi-check2-circle text-success fs-4"></i></li>
                                <li><p>Configuración Visual de Menú</p><i class="bi bi-check2-circle text-success fs-4"></i></li>
                                <li><p>Búsqueda en Menú</p><i class="bi bi-check2-circle text-success fs-4"></i></li>
                                <li><p>Filtrar Menú</p><i class="bi bi-check2-circle text-success fs-4"></i></li>
                                <li><p>Pago en la Aplicación</p><i class="bi bi-check2-circle text-success fs-4"></i></li>
                                <li><p>Login para Clientes</p><i class="bi bi-x-circle  text-danger fs-5"></i></li>
                                <li><p>Seguimiento de Pedido</p><i class="bi bi-x-circle  text-danger fs-5"></i></li>
                                <li><p>Delivery de Pedidos</p><i class="bi bi-x-circle  text-danger fs-5"></i></li>
                                <li><p>Retiro de un Pedido</p><i class="bi bi-x-circle  text-danger fs-5"></i></li>
                            </ul>
                            <section className='text-center'>
                                <button className='btn btnPrecio' > 130 usd</button>
                            </section>
                        </article>
                        <article className="articleThirdService">
                            <h3>MENU APP</h3>
                            <ul>
                                <li><p>Gestión de Personal</p><i class="bi bi-check2-circle text-success fs-4"></i></li>
                                <li><p>Creación de Menús</p><i class="bi bi-check2-circle text-success fs-4"></i></li>
                                <li><p>Administración de Pedidos</p><i class="bi bi-check2-circle text-success fs-4"></i></li>
                                <li><p>Control de Stock</p><i class="bi bi-check2-circle text-success fs-4"></i></li>
                                <li><p>Menú Virtual</p><i class="bi bi-check2-circle text-success fs-4"></i></li>
                                <li><p>Configuración Visual de Menú</p><i class="bi bi-check2-circle text-success fs-4"></i></li>
                                <li><p>Búsqueda en Menú</p><i class="bi bi-check2-circle text-success fs-4"></i></li>
                                <li><p>Filtrar Menú</p><i class="bi bi-check2-circle text-success fs-4"></i></li>
                                <li><p>Pago en la Aplicación</p><i class="bi bi-check2-circle text-success fs-4"></i></li>
                                <li><p>Login para Clientes</p><i class="bi bi-check2-circle text-success fs-4"></i></li>
                                <li><p>Seguimiento de Pedido</p><i class="bi bi-check2-circle text-success fs-4"></i></li>
                                <li><p>Delivery de Pedidos</p><i class="bi bi-check2-circle text-success fs-4"></i></li>
                                <li><p>Retiro de un Pedido</p><i class="bi bi-check2-circle text-success fs-4"></i></li>
                            </ul>
                            <section className='text-center'>
                                <button className='btn btnPrecio' > 150 usd</button>
                            </section>
                        </article>
                    </section>
                    <section id="recomendaciones" className='sectionSeparator'>
                        <h2>RECOMENDACIONES</h2>
                    </section>
                    <section className='contendorRecomendacionesServicio'>
                        <article>
                            <h3>RECOMENDACION PARA CONTRATAR UN SERVICIO</h3>
                            <section>
                                <h4>STANDARD SERVICE</h4>
                                <p>Servicio orientado a <strong>Restaurantes</strong> o <strong>Bares</strong> de gestión <strong>administrativa tradicional</strong>, centralizando las <strong>operaciones en un administrador</strong> del software que puede delegar tareas al personal como <strong>gerentes</strong>, para crear un menu por ejemplo, o <strong>cajeros</strong> y <strong>meseros</strong> para gestionar la creación, el pago y la entrega de un pedido. </p>
                                <p><strong>Incluye</strong> una página para visulizar un <strong>Menu</strong> digital que podria ser accedido por los clientes <strong>mediante un QR</strong> o ser visualizado desde una pantalla.</p>
                            </section>

                            <section>

                                <h4>SELF-MANAGEMENT APP</h4>
                                <p>Servicio orientado a negocios de comida rápida que ofrece la agilidad de un software adaptable a un terminal autogestión donde los clientes podrán ver el menu, realizar un pedido a pagar en caja o incluso pagarlo desde el terminal.</p>
                                <p>Ademas incluye toda la gestión de funciones administrativas de creación de un menu, manejo de estados de un pedido , control de inventario y control de  personal. </p>

                            </section>
                            <section>

                                <h4>MENU APP</h4>
                                <p>Servicio pensado en la experiencia del cliente, con este software además de poder ver un menu virtual, podrán crearse una cuenta.</p>
                                <p>Contarán con beneficios de pagar su pedido desde la app, programar un pedido, tener un historial de pedidos e incluso acceder a la opción de delivery en el caso de tu negocio tenerla dispoible.</p>
                                <p className="pb-4">Ademas incluye toda la gestión de funciones administrativas de creación de un menu, manejo de estados de un pedido , control de inventario y control de  personal. </p>
                            </section>
                        </article>
                    </section>
                    <section id="prueba7dias" className='sectionSeparator'>
                        <h2>PRUEBA DE 7 DIAS</h2>
                    </section>
                    <figure className='contenedorImagenPrueba'>

                        <figcaption >COMUNICATE CON NOSOTROS PARA HACER UNA PRUEBA</figcaption>
                        <form >
                            <label for="exampleFormControlInput1" className="form-label"></label>
                            <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com" />
                            <button className="">Contactar</button>
                        </form>
                    </figure>
                </section>
            </main>
            <footer className="footerLanding">
                <a href="tel:+543819999999">3819999999</a>
                <a href="mailto:bar_app@gmail.com.ar">bar_app@gmail.com.ar</a>
                <p>Copyright ©, Bar App Service</p>
            </footer>
        </>
    )
};
export default LandingPage;