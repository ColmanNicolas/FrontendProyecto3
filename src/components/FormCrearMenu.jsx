
const FormCrearMenu = ({ closeModal }) => {

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("Formulario Enviado");
        closeModal();
    };
    const handleClose = () => {
        closeModal();
    };

    return (
        <form >
            <section >
                <section className=" ">
                    <label htmlFor="">Categoría</label>
                    <input type="text" />
                </section>
                <section>
                    <label htmlFor="">Nombre</label>
                    <input type="text" />
                </section>
            </section>
            <section className="col">
                <section >
                    <label htmlFor="">Detalle</label>
                    <input type="text" />
                </section>
                <section >
                    <label htmlFor="">Precio</label>
                    <input type="text" />
                </section>
                <section className="modalBtnContainer">
                    <button onClick={handleClose}>Cancelar</button>
                    <button onClick={handleSubmit}>Confirmar</button>
                </section>
            </section>
        </form>
    )
};
export default FormCrearMenu;