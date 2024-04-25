import useNavbarAdmin from "../hooks/useNavbarAdmin";

const NavbarAdmin = ({ devolverTabla }) => {
    const { isOpen, setNavbarState, changeNavbarState } = useNavbarAdmin();

    return (
        <>
            {isOpen && 
            <section onClick={()=>changeNavbarState()} className="overlay">
            < nav className="navbarServiceAdmin">
                <section >
                    <section className="navbarTitleButton">
                        <h2 >ADMINISTRACION </h2>
                        <button onClick={() => changeNavbarState()}><i className="bi bi-box-arrow-left " ></i></button>
                    </section>
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
            </section>
            }

            {!isOpen &&
                <nav className="navbarSecondary" >
                    <section className="navbarTitleButton">
                        <button onClick={() => changeNavbarState()}><i className="bi bi-list fs-1"></i></button>
                    </section>
                </nav>}
        </>
    );
};

export default NavbarAdmin;