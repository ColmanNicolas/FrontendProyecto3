import { useForm } from "react-hook-form";
import useUsersState from "../hooks/useUsersState";

const FormCrearUsuario = ({ closeModal }) => {
    const { crearUsuario, obtenerUsuarios } = useUsersState();

    const { handleSubmit, register, formState: { errors }, watch, reset } = useForm();

    const enviarFormulario = async (data) => {
        try {
            data.role = "USER_ROLE";
            await crearUsuario(data);
            console.log("Formulario Enviado");
            reset();
            closeModal(); // Cierra el modal después de enviar el formulario
            obtenerUsuarios();
        } catch (error) {
            console.log("Ocurrió un error", error);
        }
    };

    const handleClose = () => {
        closeModal();
    };
    return (
        <form onSubmit={handleSubmit(enviarFormulario)} >
            <section className="row">

                <section className="col-6">
                    <section >
                        <label htmlFor="">Nombre</label>
                        <input type="text" {...register("name", {
                            required: true,
                            minLength: 4,
                            maxLength: 30,
                        })} />
                    </section>
                    <section>
                        <label htmlFor="">Email</label>
                        <input type="email" {...register("email", {
                            required: true,
                            minLength: 4,
                            maxLength: 35,
                        })}

                        />
                    </section>
                </section>
                <section className="col-6">
                    <section >
                        <label htmlFor="">Contraseña</label>
                        <input type="password" {...register("password", {
                            required: true,
                            minLength: 5,
                            maxLength: 30,
                        })} />
                    </section>
                    <section >
                        <label htmlFor="">Repetir Contraseña</label>
                        <input type="password" {...register("passwordRepeat", {
                            required: true,
                            validate: (value) => value === watch("password"),
                        })} />
                    </section>
                    <section className="modalBtnContainer">
                        <button onClick={handleClose}>Cancelar</button>
                        <button type="submit">Confirmar</button>
                    </section>
                </section>
            </section>
        </form>
    );
};
export default FormCrearUsuario