import axios from "axios";
import { Controller, useForm } from "react-hook-form";
import { Link, Navigate } from "react-router-dom";

const FormPrincipalRegister = ({ cambiarComponente }) => {

    const { handleSubmit, register, formState: { errors }, watch, reset,control } = useForm();
    const enviarFormulario = (dataRegister) => {
        try {
            axios.post("http://localhost:5000/api/principal-auth/register", dataRegister)
                .then(response => {
                    console.log(response);
                    reset();
                    cambiarComponente("LOGIN");
                })
                .catch(error => {
                    console.error('Error al enviar formulario:', error);
                });
        } catch (error) {
            console.error('Error al enviar formulario:', error);
        }
    };
    return (
        <form onSubmit={handleSubmit(enviarFormulario)} >
            <article>
                <h2>REGISTRO</h2>
                <button className="buttonAslAnchor" type="button" onClick={() => cambiarComponente("LOGIN")}><i className="bi bi-arrow-up-left-circle"></i><span>Tengo Cuenta</span> </button>
                <Link to={"/bar-app/landing-page"}><span>Volver a Home</span><i className="bi bi-house"></i> </Link>
            </article>
            <article>
                <section className="rowInputsForm">
                    <section>
                        <label htmlFor="userName" className="form-label">USUARIO </label>
                        <input
                            type="text"
                            className="form-control"
                            name="nombre"
                            id="userName"
                            placeholder="nombre de usuario"
                            {...register("name", {
                                required: "Campo requerido",
                                minLength: { value: 3, message: "Mínimo 3 caracteres" },
                                maxLength: { value: 45, message: "Máximo 35 caracteres" },
                                pattern: { value: /^[a-zA-Z ]+$/, message: "Solo se permiten letras y espacios" }
                            })}
                        />
                        {errors.name && (
                            <p className="ps-1 text-danger fs-semibold mb-2">{errors.name.message}</p>
                        )}
                    </section>

                    <section >
                        <label htmlFor="bussinesName" className="form-label">EMPRESA </label>
                        <input type="text" className="form-control" name="nombreEmpresa" id="bussinesName" placeholder="nombre de su empresa gastronómica" {...register("businessName", {
                            required: "Campo requerido",
                            minLength: { value: 3, message: "Mínimo 3 caracteres" },
                            maxLength: { value: 35, message: "Máximo 35 caracteres" },
                            pattern: { value: /^[a-zA-Z ]+$/, message: "Solo se permiten letras y espacios" }
                        })} />
                        {errors.businessName && (<p className="ps-1 text-danger fs-semibold mb-2">{errors.businessName.message}</p>)
                        }
                    </section>

                    {   /*                 <section >
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
                    </section>*/}
                </section>
                <section className="rowInputsForm ">
                    <section >
                        <label htmlFor="country" className="form-label">PAIS</label>
                        <input type="text" className="form-control" name="pais" id="country" {...register("country", {
                            required: true,
                            minLength: 3,
                            maxLength: 35,
                            pattern: /^[a-zA-Z ]+$/
                        })} />
                        {errors.country && (
                            (errors.country.type === "required" && <p className="ps-1 text-danger fs-semibold mb-2">Campo Requerido</p>) ||
                            (errors.country.type === "minLength" && <p className="ps-1 text-danger fs-semibold mb-2">minimo de caracteres 3</p>) ||
                            (errors.country.type === "maxLength" && <p className="ps-1 text-danger fs-semibold mb-2">Se exedio el maximo de caractres. '35' </p>) ||
                            (errors.country.type === "pattern" && <p className="ps-1 text-danger fs-semibold mb-2">Campo Requerido</p>)
                        )}
                    </section>
                    <section >
                        <label htmlFor="city" className="form-label">PROVINCIA</label>
                        <input type="text" className="form-control" id="city" name="ciudad" {...register("city", {
                            required: "Campo requerido",
                            minLength: { value: 3, message: "Mínimo 3 caracteres" },
                            maxLength: { value: 35, message: "Máximo 35 caracteres" },
                            pattern: { value: /^[a-zA-Z ]+$/, message: "Solo se permiten letras y espacios" }
                        })} />
                        {errors.city && (
                            <p className="ps-1 text-danger fs-semibold mb-2">{errors.city.message}</p>
                        )}
                    </section>
                </section>
                <section className="rowInputsForm">
                    <section >
                        <label htmlFor="userEmail" className="form-label">EMAIL</label>
                        <input type="email" className="form-control" id="userEmail" name="email" {...register("principalEmail", {
                            required: "Campo requerido",
                            minLength: { value: 3, message: "Mínimo 3 caracteres" },
                            maxLength: { value: 35, message: "Máximo 35 caracteres" },
                            pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Solo se permiten letras y espacios" }
                        })} />
                        {errors.principalEmail && (<p className="ps-1 text-danger fs-semibold mb-2">{errors.principalEmail.message}</p>
                        )}
                    </section>
                    <section >
                        <label htmlFor="userEmailRepeat" className="form-label">REPETIR EMAIL</label>
                        <input type="text" className="form-control" id="userEmailRepeat" name="emailRepetido" {...register("emailRepeat", {
                            required: true,
                            validate: (value) => value === watch("principalEmail"),
                        })} />
                        {errors.emailRepeat && (
                            (errors.emailRepeat.type === "required" && <p className="ps-1 text-danger fs-semibold mb-2">Campo requerido</p>) ||
                            (errors.emailRepeat.type === "validate" && <p className="ps-1 text-danger fs-semibold mb-2">No coinciden los campos email</p>)
                        )}
                    </section>
                </section>
                <section className="rowInputsForm">
                    <section >
                        <label htmlFor="userPass" className="form-label">CONTRASEÑA</label>
                        <input type="password" className="form-control" id="userPass" name="password" placeholder="Usuario123" {...register("password", {
                            required: "Campo requerido",
                            minLength: { value: 6, message: "Mínimo 6 caracteres" },
                            maxLength: { value: 35, message: "Máximo 35 caracteres" },
                            pattern: { value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d!$%@#£€*?&]{6,25}$/, message: "Debe empezar con mayuscula y contener minimo un numero" }
                        })} />
                        {errors.password && (<p className="ps-1 text-danger fs-semibold mb-2">{errors.password.message}</p> )}
                    </section>
                    <section >
                        <label htmlFor="userPassRepeat" className="form-label">REPETIR CONTRASEÑA</label>
                        <input type="password" className="form-control" id="userPassRepeat" name="passRepeat" placeholder="Usuario123" {...register("passwordRepeat", {
                            required: true,
                            validate: (value) => value === watch("password"),
                        })} />
                        {errors.passwordRepeat && (
                            (errors.passwordRepeat.type === "required" && <p className="ps-1 text-danger fs-semibold mb-2">Campo requerido</p>) ||
                            (errors.passwordRepeat.type === "validate" && <p className="ps-1 text-danger fs-semibold mb-2">Los campos contraseña no coinciden</p>)
                        )}
                    </section>
                </section>
                <section className="rowInputsForm d-flex align-items-center flex-row bg-dark p-2 rounded-2 mb-3">
                    <p className="mb-0"> Al enviar este formulario, aceptas nuestros términos y condiciones. Gracias por registrarte en nuestro servicio.</p>
                    <Controller
                        name="terminosYCondiciones"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                            <label className="fw-light p-0">
                                <input className="form-check-input m-0 mt-1 me-2" type="checkbox" {...field} />
                            </label>
                        )}
                    />
                </section>
                <section className="rowInputsForm">
                        {errors.terminosYCondiciones && (<p className="ps-1 text-danger fs-semibold mb-2">Falta aceptar terminos y condiciones</p> )}
                </section>
                <section className="formButtonSection">
                    <button className="">Registrarme</button>
                </section>
            </article>
        </form>
    )
};
export default FormPrincipalRegister;