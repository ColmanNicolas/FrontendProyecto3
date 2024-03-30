const NavbarAdmin = ({ devolverTabla }) => {

    return (
        <nav className="navbarServiceAdmin">
            <section >
                <h2 className="">ADMINISTRACION</h2>
                <div className="lineaDivisora"></div>
                <ul>
                <li><button onClick={() => devolverTabla("EMPLEADOS")}> PLANILLA DE EMPLEADOS</button></li>
                    <li><button onClick={() => devolverTabla("CLIENTES")}>REGISTRO DE CLIENTES</button></li>
                    <li><button onClick={() => devolverTabla("MENU")}>GESTIONAR MENU</button></li>
                    <li><button onClick={() => devolverTabla("PEDIDOS")}>GESTION DE PEDIDOS</button></li>
                    <li><button>CONTROL DE STOCK</button></li>
                </ul>
            </section>
            <section className="containerUserBox">
                <section className="lineaDivisora "></section>
                <section>
                    <i className="bi bi-person-workspace fs-4"></i>
                    <p className="m-0 ">acceso:</p>
                    <p className="m-0">ADMIN</p>
                </section>
            </section>
        </nav>
    );
};

export default NavbarAdmin;