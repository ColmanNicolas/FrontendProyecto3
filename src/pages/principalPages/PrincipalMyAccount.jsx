import { Controller, useForm } from "react-hook-form";
import "../principalPages/PrincipalMyAccount.css"
const PrincipalMyAccount = () => {
    const { handleSubmit, register, formState: { errors }, watch, reset, control } = useForm();

    return (
        <>
            <header className='headerLanding '>
                <h1>PAGINA AUTH</h1>
            </header>
            <main>
                <article id="articuloMiCuenta">
                    <section>
                        <h2 >Menu Desplegable</h2>
                    </section>
                    <section>
                        <h3 className="tituloH3MiCuenta">Toda  mi Info </h3>
                        <form id="miCuentaForm">
                            <section>
                                <label htmlFor="">Nombre</label>
                                <input type="text" />
                            </section>
                            <section>
                                <label htmlFor="">Establecimiento</label>
                                <input type="text" />
                            </section>
                            <section>
                                <label htmlFor="">Email</label>
                                <input type="text" />
                            </section>
                            <section>
                                <label htmlFor="">CUIT</label>
                                <input type="text" />
                            </section>
                            <section>
                                <label htmlFor="">Pais</label>
                                <input type="text" />
                            </section>
                            <section>
                                <label htmlFor="">Ciudad</label>
                                <input type="text" />
                            </section>
                            <section id="botonesFormulario">
                                <input type="submit" value={"Modificar Datos"} />
                                <input type="button" value={"Cambiar Contraseña"} />
                            </section>
                        </form>
                    </section>
                    <section>
                        <h3 className="tituloH3MiCuenta">Sección de Pago</h3>
                        <form id="pagoForm" action="">
                            <label htmlFor="" className="form-label">Servicio</label>
                            <Controller
                                name="service"
                                control={control}
                                defaultValue=""
                                rules={{ required: true }}
                                render={({ field }) => (
                                    <select {...field} className="form-select" aria-label="Default select example" required>
                                        <option value="" disabled hidden>Selecciona un servicio</option>
                                        <option value="1">STANDARD SERVICE</option>
                                        <option value="2">SELF-MANAGEMENT APP</option>
                                        <option value="3">MENU APP</option>
                                    </select>
                                )}
                            />
                            <section>
                                <label htmlFor="">Número de Tarjeta</label>
                                <input type="text" />
                            </section>
                            <section>
                                <label htmlFor="">Codigo de Seguridad</label>
                                <input type="text" />
                            </section>
                            <section>
                                <label htmlFor="">Fecha de Vencimiento</label>
                                <input type="text" />
                            </section>
                            <section>
                                <label htmlFor="">DNI</label>
                                <input type="text" />
                            </section>
                            <section>
                                <label htmlFor="">Nombre Completo</label>
                                <input type="text" />
                            </section>
                            <section id="botonesFormulario">
                                <input type="submit" value={"Realizar Pago"} />
                            </section>
                        </form>
                    </section>
                        <h3 className="tituloH3MiCuenta">Estado de mi Servicio</h3>
                    <section id="contenedorEstadoServicio">
                        <section className="seccionEstadoServicio">
                            <p>Servicio:</p>
                            <button className="fondoRojo" disabled>No Pagado</button>
                            <button className="fondoVerde" disabled>Pagado</button>
                        </section>
                        <section className="seccionEstadoServicio">
                            <p>Servicio: </p>
                            <button className="fondoRojo" disabled>No habilitado</button>
                            <button className="fondoVerde" disabled>En activo</button>
                        </section>
                        <a href="">Redirigirse a logeo Servicio <i class="bi bi-arrow-up-right-circle"></i></a>
                    </section>
                </article>
            </main>
            <footer className="footerLanding">
                <a href="tel:+543819999999">3819999999</a>
                <a href="mailto:bar_app@gmail.com.ar">bar_app@gmail.com.ar</a>
                <p>Copyright ©, Bar App Service</p>
            </footer>
        </>
    )
};
export default PrincipalMyAccount;