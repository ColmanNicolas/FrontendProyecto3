import axios from "axios";
import { useForm } from "react-hook-form";
import { Link, Navigate } from "react-router-dom";

const FormPrincipalRegister = ({cambiarComponente}) => {

    const { handleSubmit, register, formState: { errors }, watch, reset, } = useForm();
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
                <button className="buttonAslAnchor" type="button" onClick={()=>cambiarComponente("LOGIN")}><i className="bi bi-arrow-up-left-circle"></i><span>Tengo Cuenta</span> </button>
                <Link to={"/bar-app/landing-page"}><span>Volver a Home</span><i className="bi bi-house"></i> </Link>         
            </article>
            <article>
                <section className="rowInputsForm">
                    <section >
                        <label htmlFor="userName" className="form-label">USUARIO </label>
                        <input type="text" className="form-control" name="nombre" id="userName" placeholder="nombre de usuario" {...register("name", {
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
                        <label htmlFor="bussinesName" className="form-label">EMPRESA </label>
                        <input type="text" className="form-control" name="nombreEmpresa" id="bussinesName" placeholder="nombre de su empresa gastronómica" {...register("businessName", {
                            required: true,
                            minLength: 3,
                            maxLength: 35,
                            pattern: /^[a-zA-Z ]+$/
                        })} />
                        {errors.businessName && (
                            errors.businessName.type === "required" && <p className="error-message bg-danger">Campo Requerido</p>
                        )}
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
                            errors.country.type === "required" && <p className="error-message bg-danger">Campo Requerido</p>
                        )}
                    </section>
                    <section >
                        <label htmlFor="city" className="form-label">PROVINCIA</label>
                        <input type="text" className="form-control" id="city" name="ciudad" {...register("city", {
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
                <section className="rowInputsForm">
                    <section >
                        <label htmlFor="userEmail" className="form-label">EMAIL</label>
                        <input type="email" className="form-control" id="userEmail" name="email" {...register("principalEmail", {
                            required: true,
                            minLength: 5,
                            maxLength: 35,
                            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
                        })} />
                        {errors.principalEmail && (
                            errors.principalEmail.type === "required" && <p className="error-message bg-danger">Campo Requerido</p>
                        )}
                    </section>
                    <section >
                        <label htmlFor="userEmailRepeat" className="form-label">REPETIR EMAIL</label>
                        <input type="text" className="form-control" id="userEmailRepeat" name="emailRepetido" {...register("emailRepeat", {
                            required: true,
                            validate: (value) => value === watch("principalEmail"),
                        })} />
                        {errors.emailRepeat && (
                            errors.emailRepeat.type === "required" && <p className="error-message bg-danger">Campo Requerido</p>
                        )}
                    </section>
                </section>
                <section className="rowInputsForm">
                    <section >
                        <label htmlFor="userPass" className="form-label">CONTRASEÑA</label>
                        <input type="password" className="form-control" id="userPass"  name="password" {...register("password", {
                            required: true,
                            minLength: 5,
                            maxLength: 35,
                        })} />
                        {errors.password && (
                            errors.password.type === "required" && <p className="error-message bg-danger">Campo Requerido</p>
                        )}
                    </section>
                    <section >
                        <label htmlFor="userPassRepeat" className="form-label">REPETIR CONTRASEÑA</label>
                        <input type="password" className="form-control" id="userPassRepeat" name="passRepeat" {...register("passwordRepeat", {
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