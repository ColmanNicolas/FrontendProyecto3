const FormPrincipalRegister = ()=>{
    return(
        <form className="w-50 mx-auto text-white my-5">
        <hr />
        <h2>REGISTRO</h2>
        <hr />
        <section className="row mb-3">
            <section className="col-6">
                <label htmlFor="" className="form-label">NOMBRE DE SU NEGOCIO</label>
                <input type="text" className="form-control" id="" required />
            </section>
            <section className="col-6">
                <label htmlFor="" className="form-label">CUIT</label>
                <input type="text" className="form-control" id="" required />
            </section>
        </section>
        <section className="row mb-3">
            <section className="col-4">
                <label htmlFor="" className="form-label">PAIS</label>
                <input type="text" className="form-control" id="" required />
            </section>
            <section className="col-4">
                <label htmlFor="" className="form-label">CIUDAD</label>
                <input type="text" className="form-control" id="" required />
            </section>
            <section className="col-4">
                <label htmlFor="" className="form-label">localidad</label>
                <input type="text" className="form-control" id="" required />
            </section>
        </section>
        <section className="row mb-3">
            <section className="col-6">
                <label htmlFor="" className="form-label">SERVICIO</label>
                <select className="form-select" aria-label="Default select example" required >
                    <option value="" disabled selected hidden>Selecciona un servicio</option>
                    <option value="1">STANDARD SERVICE</option>
                    <option value="2">SELF-MANAGEMENT APP</option>
                    <option value="3">MENU APP</option>
                </select>
            </section>
            <section className="col-6">
                <label htmlFor="" className="form-label">PAGO</label>
                <select className="form-select" aria-label="Default select example" required>
                    <option value="" disabled selected hidden>Seleccione una forma de pago</option>
                    <option value="1">Depósito Bancario</option>
                    <option value="2">Pago Con Tarjeta</option>
                    <option value="3">Pago Con Billetera Virtual</option>
                    <option value="4">Pagar Luego</option>
                </select>
            </section>
        </section>
        <section className="row mb-3">
            <section className="col-6">
                <label htmlFor="" className="form-label">EMAIL</label>
                <input type="text" className="form-control" id="" required />
            </section>
            <section className="col-6">
                <label htmlFor="" className="form-label">REPETIR EMAIL</label>
                <input type="text" className="form-control" id="" required />
            </section>
        </section>
        <section className="row mb-3">
            <section className="col-6">
                <label htmlFor="" className="form-label">CONTRASEÑA</label>
                <input type="text" className="form-control" id="" required />
            </section>
            <section className="col-6">
                <label htmlFor="" className="form-label">REPETIR CONTRASEÑA</label>
                <input type="text" className="form-control" id="" required />
            </section>
        </section>
        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Et, blanditiis nam hic pariatur doloremque aspernatur ipsa adipisci dolorem quod culpa deleniti, earum, quam eveniet? Tempora suscipit cupiditate quaerat consequuntur temporibus.</p>
        <section className="d-flex justify-content-end">
            <button className="btn btn-danger">Registrarme</button>
        </section>
    </form>
    )
};
export default FormPrincipalRegister;