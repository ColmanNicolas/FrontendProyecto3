const NavbarAdmin = ({ devolverTabla }) => {

    return (
        <nav className="navbarServiceAdmin">
            <h2 className="">ADMINISTRACION</h2>
            <div className="lineaDivisora"></div>
            <ul>
                <li><button>EMPLEADOS</button></li>
                <li><button onClick={() => devolverTabla("USUARIOS")}>CLIENTES</button></li>
                <li><button onClick={() => devolverTabla("MENU")}>MENUS</button></li>
                <li><button onClick={() => devolverTabla("PEDIDOS")}>PEDIDOS</button></li>
                <li><button>CONTROL DE STOCK</button></li>
            </ul>
        </nav>
    );
};

export default NavbarAdmin;