import { Controller, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";


const FormPagoServicio=() =>{
    const { handleSubmit, setValue, register, formState: { errors, isSubmitSuccessful }, watch, reset, control  ,  focus } = useForm();
    const { id } = useParams();

    const enviarFormularioPago = async (dataPay)=>{
        console.log("llego aqui",dataPay);
        try {
            await axios.put(`http://localhost:5000/api/principalUsers/pay-done/${id}`,dataPay)
            .then(response => {
                console.log("pago realizado", response);
                window.location.reload();
            })
            
        } catch (error) {
            console.error('Error al completar el pago:', error);
            
        }
    }

    return(
        <form  id="pagoForm" onSubmit={handleSubmit(enviarFormularioPago)}>
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
                    <option value="STANDARD_SERVICE">STANDARD SERVICE</option>
                    <option value="SELF_MANAGEMENT">SELF-MANAGEMENT APP</option>
                    <option value="MENU_APP">MENU APP</option>
                </select>
            )}
        />
        <section>
            <label htmlFor="numeroTarjeta">Número de Tarjeta</label>
            <input type="number" id="numeroTarjeta" placeholder="0000-0000-0000-0000"
                {...register("numeroTarjeta", {
                    required: true,
                    pattern: /^\d{16}$/
                })} />
            {errors.numeroTarjeta && (
                (errors.numeroTarjeta.type === "required" && <p className="error-message bg-danger">Campo Requerido</p>) ||
                (errors.numeroTarjeta.type === "pattern" && <p className="error-message bg-danger">No se ingreso una tarjeta valida</p>)
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
                (errors.claveSeguridadTarjeta.type === "required" && <p className="error-message bg-danger">Campo Requerido</p>) ||
                (errors.claveSeguridadTarjeta.type === "pattern" && <p className="error-message bg-danger">No se ingreso un codigo valido</p>)
            )}
        </section>
        <section>
            <label htmlFor="fechaVencimientoTarjeta">Fecha de Vencimiento</label>
            <input type="text" id="fechaVencimientoTarjeta" placeholder="00/00"
                {...register("fechaVencimientoTarjeta", {
                    required: true,
                    pattern: /^\d{2}\/\d{2}$/
                })} />
            {errors.fechaVencimientoTarjeta && (
                (errors.fechaVencimientoTarjeta.type === "required" && <p className="error-message bg-danger">Campo Requerido</p>) ||
                (errors.fechaVencimientoTarjeta.type === "pattern" && <p className="error-message bg-danger">No se ingreso una fecha valida</p>)
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
            (errors.dniUser.type === "required" && <p className="error-message bg-danger">Campo Requerido</p>) ||
            (errors.dniUser.type === "pattern" && <p className="error-message bg-danger">No se ingreso un documento valido</p>)
        )}
        </section>
        <section>
            <label htmlFor="nombreCompletoUser">Nombre Completo</label>
            <input type="text"  id="nombreCompletoUser"
            {...register("nombreCompletoUser", {
                required: true,
                minLength:5 ,
                maxLength: 40,
                pattern: /^[a-zA-Z\s']+$/
            })} />
        {errors.nombreCompletoUser && (
            (errors.nombreCompletoUser.type === "required" && <p className="error-message bg-danger">Campo Requerido</p>) ||
            (errors.nombreCompletoUser.type === "minLength" && <p className="error-message bg-danger">No se ingresó un nombre valido</p>) ||
            (errors.nombreCompletoUser.type === "maxLength" && <p className="error-message bg-danger">El nombre excedió el máximo de caracteres</p>) ||
            (errors.nombreCompletoUser.type === "pattern" && <p className="error-message bg-danger">No se ingreso un nombre valido</p>)
        )}
        </section>
        <section id="botonesFormulario">
            <input type="submit"  value={"Realizar Pago"} />
        </section>
    </form>
    )
}

export default FormPagoServicio;