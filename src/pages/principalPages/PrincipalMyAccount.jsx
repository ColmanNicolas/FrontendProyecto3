import { Controller, useForm } from "react-hook-form";
import "../principalPages/PrincipalMyAccount.css"
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import FormPagoServicio from "../../components/FormPagoServicio";

const PrincipalMyAccount = () => {
    const { id } = useParams();
    const { handleSubmit, setValue, register, formState: { errors, isSubmitSuccessful }, watch, reset, control  ,  focus } = useForm();
    const [pagado, setPagado] = useState(null);
    const [habilitado, setHabilitado] = useState(null);
    const navigate = useNavigate();

    const setearInformacion = async () => {
        try {
            await axios.get(`http://localhost:5000/api/principalUsers/${id}`)
                .then(response => {
                    setValue('name', response.data.user.name);
                    setValue('businessName', response.data.user.businessName);
                    setValue('principalEmail', response.data.user.principalEmail);
                    setValue('country', response.data.user.country);
                    setValue('city', response.data.user.city);
                    setPagado(response.data.user.paid);
                    setHabilitado(response.data.user.status);
                })
        } catch (error) {
            console.error('Error al completar campos:', error);
        }
    }
    const enviarFormularioModificacion = (dataModificaction)=>{
        console.log("llego aqui por 100",dataModificaction);


    }
    const enviarFormularioPago = async (dataPay)=>{
        console.log("llego aqui",dataPay);
        try {
            await axios.put(`http://localhost:5000/api/principalUsers/pay-done/${id}`)
            .then(response =>{
                console.log("pago realizado",response);
            }
            )
         
        } catch (error) {
            console.error('Error al completar el pago:', error);
            
        }
    }
    const cerrarSesion = () => {
        console.log("cierro Sesion usuario principal");
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
                <h4 id="H4PrincipalAdmin" className="text-end">
                    <button onClick={() => { cerrarSesion() }} className=" botonCerrarSesion fs-6 mx-2 my-2 px-2">Cerrar Sesion</button>
                </h4>
                <article id="articuloMiCuenta">
                    <section className="contenedorMiCuenta mb-5">
                        <form id="miCuentaForm" onSubmit={handleSubmit(enviarFormularioModificacion)}>
                            <h3 className="tituloH3MiCuenta">Mi información </h3>
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
                                <input type="email" id="email" {...register("principalEmail", {
                                    required: true,
                                    minLength: 3,
                                    maxLength: 35,
                                })} />
                                {errors.principalEmail && (
                                    (errors.principalEmail.type === "required" && <p className="error-message bg-danger">Campo Requerido</p>) ||
                                    (errors.principalEmail.type === "minLength" && <p className="error-message bg-danger">email muy corto</p>) ||
                                    (errors.principalEmail.type === "maxLength" && <p className="error-message bg-danger">email muy largo</p>) ||
                                    (errors.principalEmail.type === "pattern" && <p className="error-message bg-danger">No cumple con la condicion para email</p>) 
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
                                <input type="button" value={"Cambiar Contraseña"} />
                            </section>
                        </form>
                    </section>
                    <section className="contenedorMiCuenta mb-5">
                        {!pagado &&<FormPagoServicio/>}
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
                        <a href="" className="">Redirigirse a logeo Servicio <i className="bi bi-arrow-up-right-circle"></i></a>
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