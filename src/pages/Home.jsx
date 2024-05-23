import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/servicePageComponents/navBar/Navbar";
import Footer from "../components/servicePageComponents/Footer";
import "../pages/Home.css";

const Home = () => {
  return (
    <>
      <Navbar />
      <main id="main-home">
        <div className="welcome-section">
          <h2 className="welcome-heading">Bienvenido a BarApp</h2>
          <p className="welcome-description">
            Descubre una nueva forma de disfrutar tus servicios gastronómicos.
          </p>
        </div>
        <section className="services-section">
          <article className="service">
            <h3>Contratar un Servicio</h3>
            <p>Explora nuestros servicios y contrata el que más te convenga.</p>
            <Link to={"/bar-app/landing-page"}>
              <button className="service-button">Explorar</button>
            </Link>
          </article>
          <article className="service">
            <h3>Servicios Gastronómicos</h3>
            <p>Descubre una amplia variedad de opciones gastronómicas.</p>
            <Link to={"/service/login"}>
              <button className="service-button">Ver Menú</button>
            </Link>
          </article>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Home;