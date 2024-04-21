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
        <form onSubmit={handleSubmit(enviarFormulario)} >
            <article>
                <h2>LOGIN</h2>
                <button className="buttonAslAnchor" type="button" onClick={() => cambiarComponente("REGISTER")}><i className="bi bi-arrow-up-left-circle"></i><span>Registrarme</span> </button>
                <Link to={"/bar-app/landing-page"}><span>Volver a Home</span><i className="bi bi-house"></i> </Link>
            </article>
            <article className="w-100">
                <section >
                    <section >
                        <label htmlFor="userEmail" className="form-label">EMAIL</label>
                        <input type="email" className="form-control" id="userEmail" {...register("email", {
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
                        <label htmlFor="userPass" className="form-label">CONTRASEÑA</label>
                        <input type="password" className="form-control" id="userPass" {...register("password", {
                            required: true,
                            minLength: 5,
                            maxLength: 35,
                        })} />
                        {errors.password && (
                            errors.password.type === "required" && <p className="error-message bg-danger">Campo Requerido</p>
                        )}
                    </section>
                    <p className="fw-ligth">Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita error consequuntur nisi vel eius accusantium dolores quo numquam, sequi est fugiat modi, autem nemo sunt voluptatum minima nam odio corporis.</p>
                    <section className="formButtonSection">
                        <button className="">Acceder</button>
                    </section>
                </section>
            </article>
        </form>
    )
};
export default FormPrincipalLogin;