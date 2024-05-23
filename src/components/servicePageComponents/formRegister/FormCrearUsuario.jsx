import { Controller, useForm } from "react-hook-form";
import useUsersState from "../../../hooks/useUsersState";

const FormCrearUsuario = ({ closeModal, form, setearDataUsuarios }) => {
    const { crearUsuario, obtenerUsuarios } = useUsersState();

    const { handleSubmit, register, formState: { errors }, watch, reset, control } = useForm();
    const enviarFormulario = async (data) => {
        try {
            await crearUsuario(data);
            reset();
            closeModal(); // Cierra el modal después de enviar el formulario
            setearDataUsuarios();
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
                <section className="col-12 col-md-6">
                    <section >
                        <label htmlFor="">Nombre</label>
                        <input type="text" {...register("name", {
                            required: true,
                            minLength: 6,
                            maxLength: 25,
                            pattern: /^[A-Za-z' ]{6,30}$/
                        })} />
                        {errors.name && errors.name.type === 'required' && <p className='text-danger fs-6 mt-1' >Inserte un nombre</p>}
                        {errors.name && errors.name.type === 'minLength' && <p className='text-danger fs-6 mt-1' >Debe contener al menos 6 caracteres</p>}
                        {errors.name && errors.name.type === 'maxLength' && <p className='text-danger fs-6 mt-1' >Debe contener menos de 26 caracteres</p>}
                        {errors.name && errors.name.type === 'pattern' && <p className='text-danger fs-6 mt-1' >Nombre inválido.</p>}
                    </section>
                    <section>
                        <label htmlFor="">Email</label>
                        <input type="email" {...register("email", {
                            required: true,
                            minLength: 6,
                            maxLength: 45,
                            pattern: /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/
                        })}

                        />
                        {errors.email && errors.email.type === 'required' && <p className='text-danger fs-6 mt-1'>Inserte un correo electrónico</p>}
                        {errors.email && errors.email.type === 'minLength' && <p className='text-danger fs-6 mt-1'>Debe contener al menos 6 caracteres</p>}
                        {errors.email && errors.email.type === 'maxLength' && <p className='text-danger fs-6 mt-1'>Debe contener menos de 45 caracteres</p>}
                        {errors.email && errors.email.type === 'pattern' && <p className='text-danger fs-6 mt-1'>Correo electrónico inválido.</p>}
                    </section>
                </section>
                <section className="col-12 col-md-6">
                    <section >
                        <label htmlFor="">Contraseña</label>
                        <input type="password" {...register("password", {
                            required: true,
                            minLength: 6,
                            maxLength: 25,
                            pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d!$%@#£€*?&]{6,25}$/
                        })} />
                        {errors.password && errors.password.type === 'required' && <p className='text-danger fs-6 mt-1'>Inserte una contraseña</p>}
                        {errors.password && errors.password.type === 'minLength' && <p className='text-danger fs-6 mt-1'>Debe contener al menos 6 caracteres</p>}
                        {errors.password && errors.password.type === 'maxLength' && <p className='text-danger fs-6 mt-1'>Debe contener menos de 26 caracteres</p>}
                        {errors.password && errors.password.type === 'pattern' && <p className='text-danger fs-6 mt-1'>Debe empezar con una mayúscula y contener por lo menos un número</p>}
                    </section>
                    <section >
                        <label htmlFor="">Repetir Contraseña</label>
                        <input type="password" {...register("passwordRepeat", {
                            required: true,
                            validate: value => value === watch('password')
                        })} />
                        {errors.passwordRepeat && errors.passwordRepeat.type === 'required' && <p className='text-danger fs-6 mt-1'>Inserte una contraseña</p>}
                        {errors.passwordRepeat && errors.passwordRepeat.type === 'validate' && <p className='text-danger fs-6 mt-1'>Las contraseñas no coinciden</p>}
                    </section>
                    {form === "EMPLEADOS" && <section>
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