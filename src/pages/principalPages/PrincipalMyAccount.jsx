import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import FormPagoServicio from "../../components/principalPageComponentes/formularios/FormPagoServicio";
import "../principalPages/PrincipalMyAccount.css"

const PrincipalMyAccount = () => {
    const { id } = useParams();
    const { handleSubmit, setValue, register, formState: { errors, isSubmitSuccessful }, watch, reset, control, focus } = useForm();
    const [pagado, setPagado] = useState(null);
    const [habilitado, setHabilitado] = useState(null);
    const navigate = useNavigate();

    const setearInformacion = async () => {
        try {
            const userLogued = sessionStorage.getItem('loguedUser');
            if (!userLogued) {
                navigate('/bar-app/landing-page/auth');
            } else {
                const { id } = JSON.parse(userLogued);
                const response = await axios.get(`https://backendproyecto3-1.onrender.com/api/principalUsers/${id}`);
                const userData = response.data.user;
                setValue('name', userData.name);
                setValue('businessName', userData.businessName);
                setValue('principalEmail', userData.principalEmail);
                setValue('country', userData.country);
                setValue('city', userData.city);
                setPagado(userData.paid);
                setHabilitado(userData.status);
            }
        } catch (error) {
            console.error('Error al completar campos:', error);
        }
    }

    const enviarFormularioModificacion = (dataModificaction) => {

    }
    const cerrarSesion = () => {
        sessionStorage.removeItem('loguedUser');
        setTimeout(() => {
            navigate("/bar-app/landing-page/auth")
        }, 1000);
    }

    useEffect(() => {
        setearInformacion();
    }, []);

    return (
        <>
            <header className='headerLanding '>
                <h1>MI CUENTA</h1>
            </header>
            <main className="principalMainMyAccount">
                <article id="articuloMiCuenta">
                <h4 id="H4PrincipalAdmin" className="text-end">
                    <button onClick={() => { cerrarSesion() }} className=" botonCerrarSesion fs-6 mx-2 my-2 px-2">Cerrar Sesion</button>
                </h4>
                    <section className="contenedorMiCuenta mb-5">
                        <form id="miCuentaForm" onSubmit={handleSubmit(enviarFormularioModificacion)}>
                            <h3 className="tituloH3MiCuenta">Mi información </h3>
                            <section>
                                <label htmlFor="name">Nombre</label>
                                <input type="text" id="name"{...register("name", {
                                    required: "Campo requerido",
                                    minLength: { value: 3, message: "Mínimo 3 caracteres" },
                                    maxLength: { value: 45, message: "Máximo 35 caracteres" },
                                    pattern: { value: /^[a-zA-Z ]+$/, message: "Solo se permiten letras y espacios" }
                                })}
                                />
                                {errors.name && (
                                    <p className="ps-1 text-danger fs-semibold mb-0s">{errors.name.message}</p>
                                )}
                            </section>
                            <section>
                                <label htmlFor="businessName">Empresa</label>
                                <input type="text" id="businessName"  {...register("businessName", {
                                    required: "Campo requerido",
                                    minLength: { value: 3, message: "Mínimo 3 caracteres" },
                                    maxLength: { value: 35, message: "Máximo 35 caracteres" },
                                    pattern: { value: /^[a-zA-Z ]+$/, message: "Solo se permiten letras y espacios" }
                                })} />
                                {errors.businessName && (<p className="ps-1 text-danger fs-semibold mb-0s">{errors.businessName.message}</p>)}
                            </section>
                            <section>
                                <label htmlFor="email">Email</label>
                                <input type="email" className="form-control" id="userEmail" name="email" {...register("principalEmail", {
                                    required: "Campo requerido",
                                    minLength: { value: 3, message: "Mínimo 3 caracteres" },
                                    maxLength: { value: 35, message: "Máximo 35 caracteres" },
                                    pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Solo se permiten letras y espacios" }
                                })} />
                                {errors.principalEmail && (<p className="ps-1 text-danger fs-semibold mb-0s">{errors.principalEmail.message}</p>
                                )}
                            </section>
                            <section>
                                <label htmlFor="country">Pais</label>
                                <input type="text" id="country"  {...register("country", {
                                    required: true,
                                    minLength: 3,
                                    maxLength: 35,
                                    pattern: /^[a-zA-Z ]+$/
                                })} />
                                {errors.country && (
                                    (errors.country.type === "required" && <p className="ps-1 text-danger fs-semibold mb-0">Campo Requerido</p>) ||
                                    (errors.country.type === "minLength" && <p className="ps-1 text-danger fs-semibold mb-0">minimo de caracteres 3</p>) ||
                                    (errors.country.type === "maxLength" && <p className="ps-1 text-danger fs-semibold mb-0">Se exedio el maximo de caractres. '35' </p>) ||
                                    (errors.country.type === "pattern" && <p className="ps-1 text-danger fs-semibold mb-0">Campo Requerido</p>)
                                )}
                            </section>
                            <section>
                                <label htmlFor="city">Ciudad</label>
                                <input type="text" id="city"  {...register("city", {
                                    required: "Campo requerido",
                                    minLength: { value: 3, message: "Mínimo 3 caracteres" },
                                    maxLength: { value: 35, message: "Máximo 35 caracteres" },
                                    pattern: { value: /^[a-zA-Z ]+$/, message: "Solo se permiten letras y espacios" }
                                })} />
                                {errors.city && (
                                    <p className="ps-1 text-danger fs-semibold mb-0">{errors.city.message}</p>
                                )}
                            </section>
                            {  /*  <section>
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
                               {/* <input type="button" value={"Cambiar Contraseña"} >*/}
                            </section>
                        </form>
                    </section>
                    <section className="contenedorMiCuenta mb-5">
                        {!pagado && <FormPagoServicio />}
                    </section>
                    <section className="contenedorMiCuenta " id="contenedorEstadoServicio">
                        <h3 className="tituloH3MiCuenta ">Estado de mi Servicio</h3>
                        <section className="seccionEstadoServicio">
                            <p>Servicio:</p>
                            {!pagado && <button className="fondoRojo" disabled>No Pagado</button>}
                            {pagado && <button className="fondoVerde" disabled>Pagado</button>}
                        </section>
                        <section className="seccionEstadoServicio ">
                            <p>Servicio: </p>
                            {!habilitado && <button className="fondoRojo" disabled>No habilitado</button>}
                            {habilitado && <button className="fondoVerde" disabled>En activo</button>}
                        </section>
                        <Link to={"/service/login"}>Redirigirse a logeo Servicio <i className="bi bi-arrow-up-right-circle"></i></Link>
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