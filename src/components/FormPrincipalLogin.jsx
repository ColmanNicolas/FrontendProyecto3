const FormPrincipalLogin = ()=>{
    return(
        <form className="w-25 mx-auto text-white my-5">
        <hr />
        <h2>LOGIN</h2>
        <hr />
        <section className="row pb-3">
            <section className="col-12">
                <label htmlFor="" className="form-label">EMAIL</label>
                <input type="text" className="form-control" id="" required />
            </section>
            <section className="col-12">
                <label htmlFor="" className="form-label">CONTRASEÑA</label>
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
export default FormPrincipalLogin;