import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import Select from 'react-select';

import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelopeOpenText, faIdCard, faLock, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import './form.css';
import axios from 'axios';
import useUsersState from '../../hooks/useUsersState';

const Form = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showRepeatPassword, setShowRepeatPassword] = useState(false);
    const [sincronizar, setSincronizar] = useState(0);
    const [options, setServiceOptions] = useState([]);


    const { register, formState: { errors }, handleSubmit, watch, reset, control } = useForm();
    const { users, filtrarRolUsuarios } = useUsersState();
    const navigate = useNavigate();

    const enviarFormulario = (body) => {
        userPost(body);
    }
    const customStyles = {
        control: (provided, state) => ({
            ...provided,
            backgroundColor: state.isSelected ? 'red' : 'white', // Cambiar el color de fondo del control
            color: state.isSelected ? 'white' : 'black', // Cambiar el color del texto seleccionado
        }),
        option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isSelected ? 'blue' : 'white', // Cambiar el color de fondo de las opciones
            color: state.isSelected ? 'white' : 'black', // Cambiar el color del texto de las opciones seleccionadas
        }),
        singleValue: (provided, state) => ({
            ...provided,
            color: state.isSelected ? 'white' : 'black', // Cambiar el color del texto de la opción seleccionada
        }),
    };

    const userPost = async (body) => {
        try {
            setIsLoading(true);
            const response = await fetch('https://backendproyecto3-1.onrender.com/api/users', {
                method: 'POST',
                body: JSON.stringify(body),
                headers: { 'Content-Type': 'application/json' }
            });
            const data = await response.json();
            if (data?.errors) {
                toast.error(`${data.errors[0].msg}`, {
                    theme: 'dark'
                });
            } else {
                toast.success(`El usuario ${data.user.name} se está procesando. La aprobación será enviada a ${data.user.email}`, {
                    theme: 'dark'
                });
                setTimeout(() => {
                    navegadorPostRegister(data.user.role)
                }, 4500);
            }
        } catch (error) {
            toast.error('No se puede registrar el usuario', {
                theme: 'dark'
            });
        }
        setTimeout(() => {
            setIsLoading(false);
        }, 3000);
    }
    /*SE USA ESTE NAVIGATE? */

    const resetear = () => {
        reset();
    }

    const navegadorPostRegister = () => {
        window.location.pathname = '/service/login';

    }
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleRepeatPasswordVisibility = () => {
        setShowRepeatPassword(!showRepeatPassword);
    };

    const cargarServiciosSelect = async () => {

        const usuarios = await filtrarRolUsuarios("ADMIN_ROLE");

        if (!Array.isArray(usuarios)) {
            console.error('La función cargarServic iosSelect requiere una lista de usuarios como parámetro.');
            return;
        }
        const selectInfo = usuarios.map(user => ({ value: user.id, label: user.name }));

        setServiceOptions(selectInfo);
    }

    useEffect(() => {
        cargarServiciosSelect();
    }, []);

    useEffect(() => {
        setSincronizar(sincronizar + 1)
    }, [users])

    return (
        <>
            <div className='contenedorForm'>
                <form onSubmit={handleSubmit(enviarFormulario)}>
                    <h3 className='text-center mb-4'>REGISTRATE</h3>
                    <div className="mb-3 input-container">
                        <label htmlFor="nombre" className="form-label">Nombre y Apellido</label>
                        <div className="name-input">
                            <FontAwesomeIcon icon={faIdCard} className="input-icon" />
                            <input
                                type="text"
                                className="form-control-diego form-control form-control"
                                id="nombre"
                                placeholder='Juan López'
                                {...register('name', {
                                    required: true,
                                    minLength: 6,
                                    maxLength: 25,
                                    pattern: /^[A-Za-z' ]{6,30}$/
                                })}
                            />
                        </div>
                        {errors.name && errors.name.type === 'required' && <p className='text-danger fs-6 mt-1' >Inserte un nombre</p>}
                        {errors.name && errors.name.type === 'minLength' && <p className='text-danger fs-6 mt-1' >Debe contener al menos 6 caracteres</p>}
                        {errors.name && errors.name.type === 'maxLength' && <p className='text-danger fs-6 mt-1' >Debe contener menos de 26 caracteres</p>}
                        {errors.name && errors.name.type === 'pattern' && <p className='text-danger fs-6 mt-1' >Nombre inválido.</p>}
                    </div>
                    <div className="mb-3 input-container">
                        <label htmlFor="correo" className="form-label">Correo Electrónico</label>
                        <div className="email-input">
                            <FontAwesomeIcon icon={faEnvelopeOpenText} className="input-icon" />
                            <input
                                type="email"
                                className="form-control-diego form-control"
                                id="correo"
                                placeholder='email@test.com'
                                {...register('email', {
                                    required: true,
                                    minLength: 6,
                                    maxLength: 45,
                                    pattern: /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/
                                })}
                            />
                        </div>
                        {errors.email && errors.email.type === 'required' && <p className='text-danger fs-6 mt-1'>Inserte un correo electrónico</p>}
                        {errors.email && errors.email.type === 'minLength' && <p className='text-danger fs-6 mt-1'>Debe contener al menos 6 caracteres</p>}
                        {errors.email && errors.email.type === 'maxLength' && <p className='text-danger fs-6 mt-1'>Debe contener menos de 45 caracteres</p>}
                        {errors.email && errors.email.type === 'pattern' && <p className='text-danger fs-6 mt-1'>Correo electrónico inválido.</p>}
                    </div>
                    <div className="mb-3 input-container">
                        <label htmlFor="contraseña" className="form-label">Contraseña</label>
                        <div className="password-input">
                            <FontAwesomeIcon icon={faLock} className="input-icon-lock" />
                            <input
                                type={showPassword ? "text" : "password"}
                                className="form-control-diego form-control"
                                id="password"
                                placeholder='Juan123'
                                {...register('password', {
                                    required: true,
                                    minLength: 6,
                                    maxLength: 25,
                                    pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d!$%@#£€*?&]{6,25}$/
                                })}
                            />
                            <FontAwesomeIcon
                                icon={showPassword ? faEyeSlash : faEye}
                                className="password-toggle-icon"
                                onClick={togglePasswordVisibility}
                            />
                        </div>
                        {errors.password && errors.password.type === 'required' && <p className='text-danger fs-6 mt-1'>Inserte una contraseña</p>}
                        {errors.password && errors.password.type === 'minLength' && <p className='text-danger fs-6 mt-1'>Debe contener al menos 6 caracteres</p>}
                        {errors.password && errors.password.type === 'maxLength' && <p className='text-danger fs-6 mt-1'>Debe contener menos de 26 caracteres</p>}
                        {errors.password && errors.password.type === 'pattern' && <p className='text-danger fs-6 mt-1'>Debe empezar con una mayúscula y contener por lo menos un número</p>}
                    </div>
                    <div className="mb-3 input-container">
                        <label htmlFor="repetirContraseña" className="form-label">Repetir Contraseña</label>
                        <div className="password-input">
                            <FontAwesomeIcon icon={faLock} className="input-icon" />
                            <input
                                type={showRepeatPassword ? "text" : "password"}
                                className="form-control-diego form-control"
                                id="password2"
                                placeholder='Juan123'
                                {...register('repetirContraseña', {
                                    required: true,
                                    validate: value => value === watch('password')
                                })}
                            />
                            <FontAwesomeIcon
                                icon={showRepeatPassword ? faEyeSlash : faEye}
                                className="password-toggle-icon"
                                onClick={toggleRepeatPasswordVisibility}
                            />
                        </div>
                        {errors.repetirContraseña && errors.repetirContraseña.type === 'required' && <p className='text-danger fs-6 mt-1'>Inserte una contraseña</p>}
                        {errors.repetirContraseña && errors.repetirContraseña.type === 'validate' && <p className='text-danger fs-6 mt-1'>Las contraseñas no coinciden</p>}
                    </div>

                    <section className='mb-2'>
                        <label htmlFor="idServicio">Elegir local Gastronomico</label>
                        <Controller
                            id="idServicio"
                            name="idServicio"
                            control={control}
                            rules={{ required: true }}
                            defaultValue=""
                            render={({ field }) => (
                                <Select
                                    {...field}
                                    options={options}
                                    isClearable
                                    placeholder="Selecciona una categoría"
                                    isSearchable
                                    styles={customStyles}
                                />
                            )}
                        />
                        {errors.idServicio && errors.idServicio.type === 'required' && <p className='text-danger fs-6 mt-1'>Selecione un servicio</p>}

                    </section>

                    <div className='d-flex gap-3 justify-content-end'>
                        <Link to='/service/login' className="btn btn-primary">Volver</Link>
                        <button type="button" className="btn btn-primary" onClick={resetear}>Resetear</button>
                        <button type="submit" className="btn btn-primary" disabled={isLoading}>Enviar</button>
                    </div>
                </form>
            </div>
            <ToastContainer />
        </>
    );
}

export default Form;

