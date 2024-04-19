import { Controller, useForm } from "react-hook-form";
import "../principalPages/PrincipalMyAccount.css"
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const PrincipalMyAccount = () => {
    const { id } = useParams();
    const { handleSubmit, setValue, register, formState: { errors }, watch, reset, control } = useForm();
    const [ pagado, setPagado] =useState(null);
    const [ habilitado, setHabilitado] =useState(null);

    const setearInformacion = async () => {
        try {
            await axios.get(`http://localhost:5000/api/principalUsers/${id}`)
                .then(response => {
                    setValue('name', response.data.user.name);
                    setValue('businessName', response.data.user.businessName);
                    setValue('email', response.data.user.email);
                    setValue('country', response.data.user.country);
                    setValue('city', response.data.user.city);
                    setPagado(response.data.user.paid);
                    setHabilitado(response.data.user.status);
                })
        } catch (error) {
            console.error('Error al completar campos:', error);
        }
    }
    useEffect(() => {
        setearInformacion();
    }, []);

    return (
        <>
            <header className='headerLanding '>
                <h1>MI CUENTA</h1>
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
                                <label htmlFor="name">Nombre</label>
                                <input type="text" id="name" {...register("name", {
                                    required: true,
                                    minLength: 3,
                                    maxLength: 35,
                                    pattern: /^[a-zA-Z ]+$/
                                })} />
                                {errors.name && (
                                    errors.name.type === "required" && <p className="error-message bg-danger">Campo Requerido</p>
                                )}
                            </section>
                            <section>
                                <label htmlFor="businessName">Empresa</label>
                                <input type="text" id="businessName" {...register("businessName", {
                                    required: true,
                                    minLength: 3,
                                    maxLength: 35,
                                    pattern: /^[a-zA-Z ]+$/
                                })} />
                                {errors.businessName && (
                                    errors.businessName.type === "required" && <p className="error-message bg-danger">Campo Requerido</p>
                                )}
                            </section>
                            <section>
                                <label htmlFor="email">Email</label>
                                <input type="email" id="email" {...register("email", {
                                    required: true,
                                    minLength: 3,
                                    maxLength: 35,
                                    pattern: /^[a-zA-Z ]+$/
                                })} />
                                {errors.email && (
                                    errors.email.type === "required" && <p className="error-message bg-danger">Campo Requerido</p>
                                )}
                            </section>
                            <section>
                                <label htmlFor="country">Pais</label>
                                <input type="text" id="country" {...register("country", {
                                    required: true,
                                    minLength: 3,
                                    maxLength: 35,
                                    pattern: /^[a-zA-Z ]+$/
                                })} />
                                {errors.country && (
                                    errors.country.type === "required" && <p className="error-message bg-danger">Campo Requerido</p>
                                )}
                            </section>
                            <section>
                                <label htmlFor="city">Ciudad</label>
                                <input type="text" id="city" {...register("city", {
                                    required: true,
                                    minLength: 3,
                                    maxLength: 35,
                                    pattern: /^[a-zA-Z ]+$/
                                })} />
                                {errors.city && (
                                    errors.city.type === "required" && <p className="error-message bg-danger">Campo Requerido</p>
                                )}
                            </section>
{      /*                      <section>
                                <label htmlFor="password">Cambiar Contraseña</label>
                                <input type="password" id="password"  {...register("password", {
                                    required: true,
                                    minLength: 3,
                                    maxLength: 35,
                                    pattern: /^[a-zA-Z ]+$/
                                })} />
                                {errors.password && (
                                    errors.password.type === "required" && <p className="error-message bg-danger">Campo Requerido</p>
                                )}
                            </section>
                        */}
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
                                <input type="number"  placeholder="0000-0000-0000-0000"/>
                            </section>
                            <section>
                                <label htmlFor="">Codigo de Seguridad</label>
                                <input type="text" placeholder="000" />
                            </section>
                            <section>
                                <label htmlFor="">Fecha de Vencimiento</label>
                                <input type="text" placeholder="00/00"/>
                            </section>
                            <section>
                                <label htmlFor="">DNI</label>
                                <input type="text" placeholder="99999999"/>
                            </section>
                            <section>
                                <label htmlFor="">Nombre Completo</label>
                                <input type="text" placeholder=""/>
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
                            {!pagado && <button className="fondoRojo" disabled>No Pagado</button>}
                            {pagado && <button className="fondoVerde" disabled>Pagado</button>}
                        </section>
                        <section className="seccionEstadoServicio">
                            <p>Servicio: </p>
                            {!habilitado && <button className="fondoRojo" disabled>No habilitado</button>}
                            {habilitado && <button className="fondoVerde" disabled>En activo</button>}
                        </section>
                        <a href="">Redirigirse a logeo Servicio <i className="bi bi-arrow-up-right-circle"></i></a>
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