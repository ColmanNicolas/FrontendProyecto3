import axios from "axios";
import { useForm } from "react-hook-form";
import { Link, Navigate, useNavigate } from "react-router-dom";

const FormPrincipalLogin = ({ cambiarComponente }) => {
    const { handleSubmit, register, formState: { errors }, reset, } = useForm();
    const navigate = useNavigate();
    const enviarFormulario = (dataLogin) => {
        try {
            axios.post("http://localhost:5000/api/principal-auth/login", dataLogin)
                .then(response => {
                    if(response.data.user.role === "SERVICE_USER_ROLE"){
                        navigate(`/bar-app/mi-cuenta/${response.data.user.id}`);
                    reset();
                    }
                    else if(response.data.user.role === "ADMIN_ROLE"){
                        navigate(`/bar-app/principal-admin-controls`);
                    reset();
                    }else{
                    }
                })
                .catch(error => {
                    console.error('Error al enviar formulario:', error);
                });
        } catch (error) {
            console.error('Error al enviar formulario:', error);
        }
        reset();
    };

    return (
        <form id="formPrincipalLogin" onSubmit={handleSubmit(enviarFormulario)} >
            <article>
                <h2>LOGIN</h2>
                <button className="buttonAslAnchor" type="button" onClick={() => cambiarComponente("REGISTER")}><i className="bi bi-arrow-up-left-circle"></i><span>Registrarme</span> </button>
                <Link to={"/bar-app/landing-page"}><span>Volver a Home</span><i className="bi bi-house"></i> </Link>
            </article>
            <article className="w-100">
                <section className="">
                    <section >
                        <label htmlFor="userEmail" className="form-label">EMAIL</label>
                        <input type="email" className="form-control mb-0" id="userEmail" {...register("principalEmail", {
                            required: true,
                            maxLength: 35,
                        })} />
                        {errors.principalEmail && (
                            (errors.principalEmail.type === "required" && <p className="ps-1 text-danger fs-semibold mb-2">Campo Requerido</p>) ||
                            (errors.principalEmail.type === "maxLength" && <p className="ps-1 text-danger fs-semibold mb-2">Campo Requerido</p>) 
                        )}
                    </section>
                    <section >
                        <label htmlFor="userPass" className="form-label">CONTRASEÑA</label>
                        <input type="password" className="form-control mb-0" id="userPass" {...register("password", {
                            required: true,
                            maxLength: 30,
                        })} />
                        {errors.password && (
                            (errors.password.type === "required" && <p className=" ps-1 text-danger fs-semibold mb-2">Campo Requerido</p>)||
                            (errors.password.type === "maxLength" && <p className="ps-1 text-danger fs-semibold mb-2">se excedio el maximo de caracteres. '30'</p>)
                        )}
                    </section>
                   <section className="d-flex flex-column pb-4 pt-2 text-center ">
                    <span>
                        <a href="" className=" fw-light text-white text-decoration-none text-center ">¿Olvidaste tu contraseña?</a>
                    </span>
                   </section>
                    <section className="formButtonSection">
                        <button className="">Acceder</button>
                    </section>
                </section>
            </article>
        </form>
    )
};
export default FormPrincipalLogin;