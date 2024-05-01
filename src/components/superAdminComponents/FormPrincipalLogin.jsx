import axios from "axios";
import { useForm } from "react-hook-form";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';

const FormPrincipalLogin = ({ cambiarComponente }) => {
    const { handleSubmit, register, formState: { errors }, reset, } = useForm();
    const navigate = useNavigate();
    const enviarFormulario = async (dataLogin) => {
        try {
            const response = await axios.post("http://localhost:5000/api/principal-auth/login", dataLogin);
            console.log("me llega esta response", response);
            const { data } = response;
            if (data.messageError) {
                toast.error(data.messageError, { theme: 'dark' });
            } else {
                toast.success(`Iniciaste sesión exitosamente como ${data.user.principalEmail} `, { theme: 'dark' });
                console.log("Token recibido:", data.token);
                sessionStorage.setItem('loguedUser', JSON.stringify({ token: data.token, id: data.user.id, name: data.user.name }));

                if (data.user.role === "SERVICE_USER_ROLE") {
                    reset();
                    setTimeout(() => {
                        navigate(`/bar-app/mi-cuenta/${data.user.id}`);
                    }, 3000);
                } else if (data.user.role === "ADMIN_ROLE") {
                    reset();
                    setTimeout(() => {
                        navigate(`/bar-app/principal-admin-controls`);
                    }, 3000);
                }
            }
        } catch (error) {
            if (error.response) {
                toast.error(error.response.data.messageError, { theme: 'dark' });
                console.error('Error en la respuesta:', error.response);
            } else if (error.request) {
                // El error se produjo pero no se recibió respuesta del servidor
                toast.error('Error en la solicitud, no se recibió respuesta del servidor', { theme: 'dark' });
                console.error('Error en la solicitud:', error.request);
            } else {
                // Otro tipo de error
                toast.error('Error al enviar la solicitud', { theme: 'dark' });
                console.error('Error general:', error.messageError);
            }
        }
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
                    <section className="mb-1">
                        <label htmlFor="userEmail" className="form-label">EMAIL</label>
                        <input type="email" className="form-control mb-0" id="userEmail" {...register("principalEmail", {
                            required: true,
                            maxLength: 45,
                        })} />
                        {errors.principalEmail && (
                            (errors.principalEmail.type === "required" && <p className="ps-1 text-danger fs-semibold mb-2">Campo Requerido</p>) ||
                            (errors.principalEmail.type === "maxLength" && <p className="ps-1 text-danger fs-semibold mb-2">el maximo de caracteres es 45 </p>)
                        )}
                    </section>
                    <section >
                        <label htmlFor="userPass" className="form-label">CONTRASEÑA</label>
                        <input type="password" className="form-control mb-0" id="userPass" {...register("password", {
                            required: true,
                            maxLength: 30,
                        })} />
                        {errors.password && (
                            (errors.password.type === "required" && <p className=" ps-1 text-danger fs-semibold mb-2">Campo Requerido</p>) ||
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
            <ToastContainer />

        </form>

    )
};
export default FormPrincipalLogin;