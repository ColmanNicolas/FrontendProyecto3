import { Controller, useForm } from "react-hook-form";
import useUsersState from "../hooks/useUsersState";

const FormCrearUsuario = ({ closeModal , form}) => {
    const { crearUsuario, obtenerUsuarios } = useUsersState();

    const { handleSubmit, register, formState: { errors }, watch, reset, control } = useForm();
    const enviarFormulario = async (data) => {
        try {
            await crearUsuario(data);
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
                    {form==="EMPLEADOS" && <section>
                        <label htmlFor="">Rol empleado</label>
                        <Controller
                                name="role"
                                control={control}
                                defaultValue=""
                                rules={{ required: true }}
                                render={({ field }) => (
                                    <select {...field} className="form-select" aria-label="Default select example" required>
                                        <option value="" disabled hidden>Selecciona un rol</option>
                                        <option value="MANAGER_ROLE">Encargado</option>
                                        <option value="HR_ROLE">Recursos Humanos</option>
                                        <option value="CASHIER_ROLE">Cajero</option>
                                        <option value="WAITER_ROLE">Mesero</option>
                                        <option value="AUXILIARY_ROLE">Personal Auxiliar</option>
                                    </select>
                                )}
                            />
                    </section>}
                    <section className="modalBtnContainer">
                        <button onClick={handleClose}>Cancelar</button>
                        <button type="submit">Confirmar</button>
                    </section>
                </section>
            </section>
        </form>
    );
};
export default FormCrearUsuario;