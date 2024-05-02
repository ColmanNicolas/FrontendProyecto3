
const ModalEstructuraBase = ({ closeModal, children }) => { 
    const handleClose = () => {
        
        closeModal(); 
    };
    return (
        < article className="overlay" >
            <section className="modalContainer">
                <section className="modalHeader" >
                {children[0] } 
                    <button onClick={handleClose}><i className="bi bi-x-circle-fill"></i></button>
                </section>
                <section className="modalBody" >
                {children[1] } 
                </section>
            </section>
        </article>
    )
};
export default ModalEstructuraBase;