import { Controller, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";


const FormPagoServicio = () => {
    const { handleSubmit, setValue, register, formState: { errors, isSubmitSuccessful }, watch, reset, control, focus } = useForm();
    const { id } = useParams();

    const enviarFormularioPago = async (dataPay) => {
        try {
            await axios.put(`https://backendproyecto3-1.onrender.com/api/principalUsers/pay-done/${id}`, dataPay)
                .then(response => {
                    window.location.reload();
                })

        } catch (error) {
            console.error('Error al completar el pago:', error);

        }
    }

    return (
        <form id="pagoForm" onSubmit={handleSubmit(enviarFormularioPago)}>
            <h3 className="tituloH3MiCuenta">Sección de Pago</h3>
            <label htmlFor="typeService" className="form-label mt-2">Servicio</label>
            <Controller
                id="typeService"
                name="typeService"
                control={control}
                defaultValue=""
                rules={{ required: true }}
                render={({ field }) => (
                    <select {...field} className="form-select" aria-label="Default select example" required>
                        <option value="" disabled hidden>Selecciona un servicio</option>
                        <option value="STANDARD_SERVICE">STANDARD SERVICE - 100 usd</option>
                        <option value="SELF_MANAGEMENT">SELF-MANAGEMENT APP - 130 usd</option>
                        <option value="MENU_APP">MENU APP - 150 usd</option>
                    </select>
                )}
            />
            {errors.typeService && errors.typeService.type === "required" && <p className="ps-1 text-danger fs-semibold mb-0">Selecione una opcion</p>}

            <section>
                <label htmlFor="numeroTarjeta">Número de Tarjeta</label>
                <input type="number" id="numeroTarjeta" placeholder="0000-0000-0000-0000"
                    {...register("numeroTarjeta", {
                        required: true,
                        pattern: /^\d{16}$/
                    })} />
                {errors.numeroTarjeta && (
                    (errors.numeroTarjeta.type === "required" && <p className="ps-1 text-danger fs-semibold mb-0">Campo Requerido</p>) ||
                    (errors.numeroTarjeta.type === "pattern" && <p className="ps-1 text-danger fs-semibold mb-0">No se ingreso una tarjeta valida</p>)
                )}
            </section>
            <section>
                <label htmlFor="claveSeguridadTarjeta">Codigo de Seguridad</label>
                <input type="text" id="claveSeguridadTarjeta" placeholder="000"
                    {...register("claveSeguridadTarjeta", {
                        required: true,
                        pattern: /^\d{3}$/
                    })} />
                {errors.claveSeguridadTarjeta && (
                    (errors.claveSeguridadTarjeta.type === "required" && <p className="ps-1 text-danger fs-semibold mb-0">Campo Requerido</p>) ||
                    (errors.claveSeguridadTarjeta.type === "pattern" && <p className="ps-1 text-danger fs-semibold mb-0">No se ingreso un codigo valido</p>)
                )}
            </section>
            <section>
                <label htmlFor="fechaVencimientoTarjeta">Fecha de Vencimiento</label>
                <input
                    type="text"
                    id="fechaVencimientoTarjeta"
                    placeholder="mm/dd"
                    {...register("fechaVencimientoTarjeta", {
                        required: "Este campo es requerido",
                        pattern: {
                            value: /^\d{2}\/\d{2}$/,
                            message: "No se ingresó una fecha válida (mm/dd)"
                        },
                        validate: {
                            fechaValida: value => {
                                const [mes, dia] = value.split('/').map(Number);
                                return dia <= 31 && mes <= 12;
                            }
                        }
                    })}
                />
                {errors.fechaVencimientoTarjeta && (
                    <p className="ps-1 text-danger fs-semibold mb-0">
                        {errors.fechaVencimientoTarjeta.message}
                    </p>
                )}
                {errors.fechaVencimientoTarjeta?.type === "fechaValida" && (
                    <p className="ps-1 text-danger fs-semibold mb-0">
                        Fecha inválida
                    </p>
                )}
            </section>


            <section>
                <label htmlFor="dniUser">DNI</label>
                <input type="text" id="dniUser" placeholder="99999999"
                    {...register("dniUser", {
                        required: true,
                        pattern: /^\d{6,8}$/
                    })} />
                {errors.dniUser && (
                    (errors.dniUser.type === "required" && <p className="ps-1 text-danger fs-semibold mb-0">Campo Requerido</p>) ||
                    (errors.dniUser.type === "pattern" && <p className="ps-1 text-danger fs-semibold mb-0">No se ingreso un documento valido</p>)
                )}
            </section>
            <section>
                <label htmlFor="nombreCompletoUser">Nombre Completo</label>
                <input type="text" id="nombreCompletoUser"
                    {...register("nombreCompletoUser", {
                        required: true,
                        minLength: 5,
                        maxLength: 40,
                        pattern: /^[a-zA-Z\s']+$/
                    })} />
                {errors.nombreCompletoUser && (
                    (errors.nombreCompletoUser.type === "required" && <p className="ps-1 text-danger fs-semibold mb-0">Campo Requerido</p>) ||
                    (errors.nombreCompletoUser.type === "minLength" && <p className="ps-1 text-danger fs-semibold mb-0">No se ingresó un nombre valido</p>) ||
                    (errors.nombreCompletoUser.type === "maxLength" && <p className="ps-1 text-danger fs-semibold mb-0">El nombre excedió el máximo de caracteres</p>) ||
                    (errors.nombreCompletoUser.type === "pattern" && <p className="ps-1 text-danger fs-semibold mb-0">No se ingreso un nombre valido</p>)
                )}
            </section>
            <section id="botonesFormulario">
                <input type="submit" value={"Realizar Pago"} />
            </section>
        </form>
    )
}

export default FormPagoServicio;