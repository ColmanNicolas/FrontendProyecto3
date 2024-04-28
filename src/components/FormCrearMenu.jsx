import { Controller, useForm } from "react-hook-form";
import useMenuState from "../hooks/useMenuState";
import { useEffect } from "react";
import axios from "axios";

const FormCrearMenu = ({ closeModal, accionarModal }) => {

    const { handleSubmit, setValue, register, formState: { errors, isSubmitSuccessful }, watch, reset, control, focus } = useForm();

    const { menus, obtenerMenus, crearMenu, modificarMenu, obtenerUnMenu, borrarMenu } = useMenuState();

    const enviarFormulario = async (data) => {
        console.log("envio form", data);
        try {
            switch (accionarModal.accion) {
                case "NUEVO":
                    await crearMenu(data);
                    break;
                case "MODIFICAR":
                    console.log("modifico menu");

                    await modificarMenu(accionarModal.id, data);
                    break;
                default:
                    console.log("no hago nada");
                    break;
            }
            reset();
            closeModal(); // Cierra el modal después de enviar el formulario
        } catch (error) {
            console.log("Ocurrió un error", error);
        }
    };

    const handleBorrar = async () => {
        await borrarMenu(accionarModal.id);
        closeModal();
    };
    const handleClose = () => {
        closeModal();
    };
    const setearInformacionMenu = async () => {
        try {
            await axios.get(`http://localhost:5000/api/menu/${accionarModal.id}`).then((response) => {
                console.log("recibo response", response);
                setValue('category', response.data.category);
                setValue('name', response.data.name);
                setValue('price', response.data.price);
                setValue('state', response.data.state);
                setValue('detail', response.data.detail);
                setValue('image', response.data.image);
            })
        } catch (error) {
            console.error('Error al crear menú:', error);
        }
    }
    useEffect(() => {
        if (accionarModal.accion === "MODIFICAR") {
            setearInformacionMenu();
        }
    }, [])
    const categories = [
        "Promociones",
        "Entradas",
        "Al plato",
        "Empanadas",
        "Hamburguesas",
        "Pastas",
        "Pizzas",
        "Sandwiches",
        "Sushi",
        "Postres",
        "Bebidas",
        "Bebidas alcohólicas",
    ];

    return (
        <form onSubmit={handleSubmit(enviarFormulario)} >
            <section className="row">
                <section className="col-12 col-md-6" >
                    <label htmlFor="">Categoria</label>
                    <Controller
                        name="category"
                        control={control}
                        defaultValue=""
                        rules={{ required: true }}
                        render={({ field }) => (
                            <select {...field} className="form-select" aria-label="Default select example" required>
                                <option value="" disabled hidden>Selecciona una categoría</option>
                                {categories.map((category, index) => (
                                    <option key={index} value={category}>{category}</option>
                                ))}
                            </select>
                        )}
                    />
                </section>
                <section className="col-12 col-md-6" >
                    <label htmlFor="">Plato</label>
                    <input type="text" {...register("name", {
                        required: true,
                        minLength: 3,
                        maxLength: 50,
                    })}
                    />
                </section>
                <section className="col-6" >
                    <label htmlFor="">Precio</label>
                    <input type="Number" {...register("price", {
                        required: true,
                    })}
                    />
                </section>
                <section className="col-6" >
                    <label htmlFor="">Estado</label>
                    <input type="text" {...register("state", {
                        required: true,
                        minLength: 3,
                        maxLength: 25,
                    })}
                    />
                </section>
            </section>
            <section className="col-12">
                <label htmlFor="imageInput">Imagen URL</label>
                <input
                    type="text"
                    id="imageInput"
                    {...register("image", {
                        required: true,
                        pattern: {
                            value: /^(ftp|http|https):\/\/[^ "]+$/,
                            message: "Por favor, introduce una URL válida",
                        },
                    })}
                />
                <p>(introduce la URL de una imagen)</p>
                {errors.imageUrl && <span>{errors.imageUrl.message}</span>}
            </section>

            <section className="col-12 ">
                <label htmlFor="" >Descripcion</label>
                <textarea className="w-100" name="" id="" rows="3"  {...register("detail", {
                    required: true,
                    minLength: 3,
                    maxLength: 100,
                })}></textarea>
            </section>
            <section className="modalBtnContainer">
                <button onClick={handleClose}>Cancelar</button>
                {accionarModal.accion == "MODIFICAR" && <button onClick={handleBorrar}>Borrar</button>}
                <button onClick={handleSubmit}>Confirmar</button>
            </section>
        </form>
    );
};
export default FormCrearMenu