import { Controller, useForm } from "react-hook-form";

const PrincipalMyAccount = () => {
    const { handleSubmit, register, formState: { errors }, watch, reset, control} = useForm();

    return (
        <>
            <header className='headerLanding '>
                <h1>PAGINA AUTH</h1>
            </header>
            <main>
                <article>
                    <section>
                        <h2>Seccion mi cuenta </h2>
                    </section>
                    <section>
                        <h3>Toda  mi Info </h3>
                        <section>
                            <label htmlFor="">Nombre</label>
                            <input type="text" />
                            <label htmlFor="">Nombre del Establecimiento</label>
                            <input type="text" />
                            <input type="text" />
                            <label htmlFor="">Email</label>
                            <input type="text" />
                            <label htmlFor="">CUIT</label>
                            <input type="text" />
                            <label htmlFor="">Pais</label>
                            <input type="text" />
                            <label htmlFor="">Ciudad</label>
                            <input type="text" />
                            <button>Modificar Datos</button>
                            <button>Cambiar contraseña</button>
                        </section>
                    </section>
                    <section>
                        <h3>Sección de Pago</h3>
                        <label htmlFor="" className="form-label">SERVICIO</label>
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
                            <label htmlFor="">Número de Tarjeta</label>
                            <input type="text" />
                            <label htmlFor="">Codigo de Seguridad</label>
                            <input type="text" />
                            <label htmlFor="">Fecha de Vencimiento</label>
                            <input type="text" />
                            <label htmlFor="">DNI</label>
                            <input type="text" />
                            <label htmlFor="">Nombre Completo</label>
                            <input type="text" />
                    </section>                    
                    <section>
                        <h3>Estado de mi Servicio</h3>
                        <p>Servicio pagado / no pagado</p>
                        <p>Servicio en Activo / no habilitado</p>
                        <a href="">Redirigirse a logeo Servicio</a>
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