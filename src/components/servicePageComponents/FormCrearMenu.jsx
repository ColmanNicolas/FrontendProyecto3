import { Controller, useForm } from "react-hook-form";
import useMenuState from "../../hooks/useMenuState";
import { useEffect } from "react";
import axios from "axios";

const FormCrearMenu = ({ closeModal, accionarModal }) => {

    const { handleSubmit, setValue, register, formState: { errors, isSubmitSuccessful }, watch, reset, control, focus } = useForm();

    const { menus, obtenerMenus, crearMenu, modificarMenu, obtenerUnMenu, borrarMenu } = useMenuState();

    const enviarFormulario = async (data) => {
        try {
            switch (accionarModal.accion) {
                case "NUEVO":
                    await crearMenu(data);
                    break;
                case "MODIFICAR":

                    await modificarMenu(accionarModal.id, data);
                    break;
                default:
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
            await axios.get(`https://backendproyecto3-1.onrender.com/api/menu/${accionarModal.id}`).then((response) => {
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
                    <input
                        type="text"
                        {...register("name", {
                            required: "Este campo es requerido",
                            minLength: {
                                value: 3,
                                message: "El nombre debe tener al menos 3 caracteres",
                            },
                            maxLength: {
                                value: 50,
                                message: "El nombre no puede tener más de 50 caracteres",
                            },
                        })}
                    />
                    {errors.name && <p className='text-danger fs-6 mt-1'>{errors.name.message}</p>}
                </section>
                <section className="col-6" >
                    <label htmlFor="">Precio</label>
                    <input
                        type="number"
                        step="any"
                        {...register("price", {
                            required: "Este campo es requerido",
                            validate: {
                                validNumber: (value) => !isNaN(value) || "Ingresa un número válido",
                                greaterThanZero: (value) => parseFloat(value) > 0 || "El número debe ser mayor que cero",
                            },
                        })}
                    />
                    {errors.price && <p className="text-danger fs-6 mt-1">{errors.price.message}</p>}
                </section>
                <section className="col-6" >
                    <label htmlFor="">Estado</label>
                    <Controller
                        name="state"
                        control={control}
                        defaultValue=""
                        rules={{ required: true }}
                        render={({ field }) => (
                            <select {...field} className="form-select" aria-label="Default select example" required>
                                <option value="" disabled hidden>Selecciona una categoría</option>
                                <option value="Disponible">Disponible</option>
                                <option value="No_Disponible">No Disponible</option>
                            </select>
                        )}
                    />
                </section>
            </section>
            <section className="col-12">
                <label htmlFor="imageInput">Imagen URL</label>
                <input
                    type="text"
                    id="imageInput"
                    placeholder="Se seleccionara una imagen predeterminada en caso de dejar el campo vacio"
                    {...register("image", {
                        pattern: {
                            value: /^(ftp|http|https):\/\/[^ "]+$/,
                            message: "Por favor, introduce una URL válida",
                        },
                    })}
                />
                <p>(introduce la URL de una imagen)</p>
                {errors.imageUrl && <span className="text-danger fs-6 mt-1">{errors.imageUrl.message}</span>}
            </section>

            <section className="col-12 ">
                <label htmlFor="" >Descripcion</label>
                <textarea
                    className="w-100"
                    rows="3"
                    {...register("detail", {
                        required: "Este campo es requerido",
                        minLength: {
                            value: 5,
                            message: "El detalle debe tener al menos 5 caracteres",
                        },
                        maxLength: {
                            value: 100,
                            message: "El detalle no puede tener más de 100 caracteres",
                        },
                    })}
                />
                {errors.detail && <p className="text-danger fs-6 mt-1">{errors.detail.message}</p>}
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