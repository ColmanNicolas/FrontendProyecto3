import { useForm } from "react-hook-form";
import useMenuState from "../hooks/useMenuState";

const FormCrearMenu = ({ closeModal }) => {

    const { handleSubmit, register, formState: { errors }, watch, reset } = useForm();

    const { crearMenu } = useMenuState();

    const enviarFormulario = async (data) => {
        try {
            await crearMenu(data);
            console.log("Formulario Enviado");
            reset();
            closeModal(); // Cierra el modal después de enviar el formulario
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
                <section className="col-6" >
                    <label htmlFor="">Categoria</label>
                    <input type="text" {...register("category", {
                        required: true,
                        minLength: 3,
                        maxLength: 30,
                    })} />
                </section>
                <section className="col-6" >
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
                <button onClick={handleSubmit}>Confirmar</button>
            </section>
        </form>
    );
};
export default FormCrearMenu;