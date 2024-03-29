const NavbarAdmin = ({ devolverTabla }) => {

    return (
        <nav className="navbarServiceAdmin">
            <section >
                <h2 className="">ADMINISTRACION</h2>
                <div className="lineaDivisora"></div>
                <ul>
                    <li><button>EMPLEADOS</button></li>
                    <li><button onClick={() => devolverTabla("USUARIOS")}>CLIENTES</button></li>
                    <li><button onClick={() => devolverTabla("MENU")}>MENUS</button></li>
                    <li><button onClick={() => devolverTabla("PEDIDOS")}>PEDIDOS</button></li>
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