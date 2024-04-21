import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelopeOpenText, faLock, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import 'react-toastify/dist/ReactToastify.css';
import '../formRegister/form.css';

const LoginComp = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const login = async (body) => {
        try {
            const response = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                body: JSON.stringify(body),
                headers: { 'Content-Type': 'application/json' }
            });
            const data = await response.json();
            console.log(data);
            if (data.messageError) {
                toast.error(data.messageError, {
                    theme: 'dark'
                });
            } else if (!data.user.status) {         //controlo el status del usuario
                toast.error(data.msg, {
                    theme: 'dark'
                });
            } else {
                toast.success(`Iniciaste sesión exitosamente como ${data.user.email} `, {
                    theme: 'dark'
                });
                sessionStorage.setItem('loguedUser', JSON.stringify(data.user));
                console.log("Datos del usuario guardados en sessionStorage:", data.user); // Agrega este console.log para verificar los datos guardados en sessionStorage
                setTimeout(navigate, 5000);
            }
        } catch (error) {
            toast.error('Error al ingresar el usuario', {
                theme: 'dark'
            });
            console.error('Error durante la llamada a la API:', error); // Agrega este console.error para verificar cualquier error durante la llamada a la API
        }
    };

    const navigate = () => {
        window.location.pathname = '/home';
    };

    const enviarFormulario = body => {
        login(body)
        reset()
    }

    return (
        <>
            <div className='contenedorForm'>
                <form onSubmit={handleSubmit(enviarFormulario)}>
                    <div className='mb-3 input-container'>
                        <label htmlFor='correo' className='form-label'>
                            Correo Electrónico
                        </label>
                        <div className='email-input'>
                            <FontAwesomeIcon icon={faEnvelopeOpenText} className='input-icon' />
                            <input
                                type='email'
                                className='form-control'
                                id='correo'
                                placeholder='email@test.com'
                                {...register('email', {
                                    required: true,
                                    minLength: 6,
                                    maxLength: 25,
                                    pattern: /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/
                                })}
                            />
                        </div>
                        {errors.email && errors.email.type === 'required' && (
                            <p className='text-danger fs-6 mt-1'>Inserte un correo electrónico</p>
                        )}
                        {errors.email && errors.email.type === 'minLength' && (
                            <p className='text-danger fs-6 mt-1'>Debe contener al menos 6 caracteres</p>
                        )}
                        {errors.email && errors.email.type === 'maxLength' && (
                            <p className='text-danger fs-6 mt-1'>Debe contener menos de 26 caracteres</p>
                        )}
                        {errors.email && errors.email.type === 'pattern' && (
                            <p className='text-danger fs-6 mt-1'>Correo electrónico inválido.</p>
                        )}
                    </div>
                    <div className='mb-3 input-container'>
                        <label htmlFor='contraseña' className='form-label'>
                            Contraseña
                        </label>
                        <div className='password-input'>
                            <FontAwesomeIcon icon={faLock} className='input-icon-lock' />
                            <input
                                type={showPassword ? 'text' : 'password'}
                                className='form-control'
                                id='password'
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
                                className='password-toggle-icon'
                                onClick={togglePasswordVisibility}
                            />
                        </div>
                        {errors.password && errors.password.type === 'required' && (
                            <p className='text-danger fs-6 mt-1'>Inserte una contraseña</p>
                        )}
                    </div>
                    <div className='d-flex gap-3 justify-content-end'>
                        <Link to='/home' className='btn btn-primary'>
                            Volver
                        </Link>
                        <button type='submit' className='btn btn-primary'>
                            Enviar
                        </button>
                    </div>
                </form>
            </div>
            <ToastContainer />
        </>
    );
};

export default LoginComp;

