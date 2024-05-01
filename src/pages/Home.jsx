import { Link } from "react-router-dom";
import "../pages/Home.css"
const Home = ()=>{
    return(
        <>
            <main id="main-home">
                <h2>Home</h2>
            <section>
                <article>
                    <p>Pagina principal para contratar un servicio</p>
                    <Link to={"/bar-app/landing-page"}>link a principal</Link>
                </article>
                <article>
                <p>Pagina de servicios gastronomicos</p>
                    <Link to={"/service/login"}>link a Servicios</Link>
                </article>
            </section>
        </main>
        </>
    )
};
export default Home;