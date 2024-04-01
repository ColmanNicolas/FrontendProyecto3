import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

const FormPrincipalRegister = () => {

    const { handleSubmit, register, formState: { errors }, watch, reset, } = useForm();
    const enviarFormulario = (dataRegister) => {
        console.log(dataRegister);
        console.log("FORMULARIO ENVIADO");
        reset();
    };
    return (
        <form onSubmit={handleSubmit(enviarFormulario)} >
            <article>
                <h2>REGISTRO</h2>
                <Link><span>Tengo cuenta</span><i className="bi bi-arrow-left-circle"></i> </Link>
            </article>
            <article>
                <section className="rowInputsForm">
                    <section >
                        <label htmlFor="" className="form-label">NOMBRE DE SU NEGOCIO</label>
                        <input type="text" className="form-control" id="" {...register("name", {
                            required: true,
                            minLength: 3,
                            maxLength: 35,
                            pattern: /^[a-zA-Z ]+$/
                        })} />
                        {errors.name && (
                            errors.name.type === "required" && <p className="error-message bg-danger">Campo Requerido</p>
                        )}
                    </section>
                    <section >
                        <label htmlFor="" className="form-label">CUIT</label>
                        <input type="number" className="form-control" id="" {...register("cuit", {
                            required: true,
                            min:1,
                            minLength: 3,
                            maxLength: 13,
                            pattern: /^[0-9]+$/
                        })} />
                        {errors.cuit && (
                            errors.cuit.type === "required" && <p className="error-message bg-danger">Campo Requerido</p>
                        )}
                    </section>
                </section>
                <section className="rowInputsForm ">
                    <section >
                        <label htmlFor="" className="form-label">PAIS</label>
                        <input type="text" className="form-control" id="" {...register("country", {
                            required: true,
                            minLength: 3,
                            maxLength: 35,
                            pattern: /^[a-zA-Z ]+$/
                        })} />
                        {errors.country && (
                            errors.country.type === "required" && <p className="error-message bg-danger">Campo Requerido</p>
                        )}
                    </section>
                    <section >
                        <label htmlFor="" className="form-label">PROVINCIA</label>
                        <input type="text" className="form-control" id="" {...register("city", {
                            required: true,
                            minLength: 3,
                            maxLength: 35,
                            pattern: /^[a-zA-Z ]+$/
                        })} />
                        {errors.city && (
                            errors.city.type === "required" && <p className="error-message bg-danger">Campo Requerido</p>
                        )}
                    </section>

                </section>
                {/* 
                <section className="rowInputsForm">
                    <section className="">
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
                    </section>
                </section>
            */}
                <section className="rowInputsForm">
                    <section >
                        <label htmlFor="" className="form-label">EMAIL</label>
                        <input type="email" className="form-control" id="" {...register("email", {
                            required: true,
                            minLength: 5,
                            maxLength: 35,
                            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
                        })} />
                        {errors.email && (
                            errors.email.type === "required" && <p className="error-message bg-danger">Campo Requerido</p>
                        )}
                    </section>
                    <section >
                        <label htmlFor="" className="form-label">REPETIR EMAIL</label>
                        <input type="text" className="form-control" id="" {...register("emailRepeat", {
                            required: true,
                            validate: (value) => value === watch("email"),
                        })} />
                        {errors.emailRepeat && (
                            errors.emailRepeat.type === "required" && <p className="error-message bg-danger">Campo Requerido</p>
                        )}
                    </section>
                </section>
                <section className="rowInputsForm">
                    <section >
                        <label htmlFor="" className="form-label">CONTRASEÑA</label>
                        <input type="password" className="form-control" id="" {...register("password", {
                            required: true,
                            minLength: 5,
                            maxLength: 35,
                        })} />
                        {errors.password && (
                            errors.password.type === "required" && <p className="error-message bg-danger">Campo Requerido</p>
                        )}
                    </section>
                    <section >
                        <label htmlFor="" className="form-label">REPETIR CONTRASEÑA</label>
                        <input type="password" className="form-control" id="" {...register("passwordRepeat", {
                            required: true,
                            validate: (value) => value === watch("password"),
                        })} />
                        {errors.passwordRepeat && (
                            errors.passwordRepeat.type === "required" && <p className="error-message bg-danger">Campo Requerido</p>
                        )}
                    </section>
                </section>
                <p className="fw-light"> Lorem ipsum, dolor sit amet consectetur adipisicing elit. Et, blanditiis nam hic pariatur doloremque aspernatur ipsa adipisci dolorem quod culpa deleniti, earum, quam eveniet? Tempora suscipit cupiditate quaerat consequuntur temporibus. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Et, blanditiis nam hic pariatur doloremque aspernatur ipsa adipisci dolorem quod culpa deleniti, earum, quam eveniet? Tempora suscipit cupiditate quaerat consequuntur temporibus.</p>
                <section className="formButtonSection">
                    <button className="">Registrarme</button>
                </section>
            </article>
        </form>
    )
};
export default FormPrincipalRegister;