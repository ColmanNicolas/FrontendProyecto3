import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"

const ContainerNewQR = () => {
    const [inputValue, setInputValue] = useState('');
    const { id } = useParams();
    const handleButtonClick = () => {
        // Copiar el valor del input al portapapeles
        navigator.clipboard.writeText(inputValue)
            .then(() => {
                console.log('Valor copiado al portapapeles:', inputValue);
            })
            .catch((error) => {
                console.error('Error al copiar al portapapeles:', error);
            });
    };
    useEffect(() => {
        setInputValue(`http://localhost:5173/bar-app/mi-cuenta/${id}`);
    }, [])
    return (
        <>
            <article className="w-75 mx-auto bg-dark text-white">
                <section className="w-75 py-2">
                    <label htmlFor="">URL para el registro de sus clientes</label>
                    <section className="d-flex">
                        <input className="form-control w-100" type="text" required defaultValue={inputValue} />
                        <input className="btn btn-white text-white border-white" type="button" onClick={handleButtonClick} defaultValue={"copiar URL"} />
                    </section>
                </section>
                <section className="w-75 mt-2 py-2 ">
                    <Link className="text-decoration-none text-white me-2 d-flex align-items-center" to={"https://www.codigos-qr.com/generador-de-codigos-qr/"} target="_blank" rel="noopener noreferrer">
                        <span >Pagina genedora de codigo QR</span>
                    <input className="btn btn-white text-white border-white mx-2" type="button" onClick={handleButtonClick} value={"Link"} />
                    </Link>
                </section>
            </article>
        </>
    )
}
export default ContainerNewQR;