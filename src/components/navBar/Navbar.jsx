import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import './navbar.css';

const Navbar = () => {
  const [user, setUser] = useState('');
  const [isButtonVisible, setIsButtonVisible] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const navigateTo = useNavigate();
  const userJSON = sessionStorage.getItem('loguedUser');
  const mUser = JSON.parse(userJSON);

  useEffect(() => {
    setUser(mUser);
  }, [isButtonVisible]);

  const handleClick = () => {
    sessionStorage.clear();
    setIsButtonVisible(false);
    navigateTo('/');
    window.location.reload();
  };

  const handleSearch = () => {
    console.log('Búsqueda realizada:', searchQuery);
  };

  const navbarCollapse = useRef();
  const handleCollapse = (click) => {
    if (navbarCollapse.current && !navbarCollapse.current.contains(click.target)) {
      document.getElementById('navbarSupportedContent').classList.remove('show');
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleCollapse);
    return () => {
      document.removeEventListener('click', handleCollapse);
    };
  }, []);

  return (
    <div className='sticky-top navbar-container' ref={navbarCollapse}>
      <nav className="navbar navbar-expand-md bg-dark navbar-dark">
        <div className="container-fluid ">
          <Link to="/">
            <img
              className="rounded-5"
              alt="logo"
              style={{ width: '100px', marginLeft: '20px' }}
              />
          </Link>
          <Link to="/" className="mx-4 navbar-brand text-white fs-2 d-none d-sm-block">
            Barapp
          </Link>
          <div className="d-flex mx-2 search-bar" role="search">
            <input
              type="search"
              className="form-control  "
              placeholder="Buscar..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="btn btn-outline-secondary" type="button" onClick={handleSearch}>
              Buscar
            </button>
          </div>
          <button
            className="navbar-toggler text-bg-secondary p-3 m-3"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse "
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav ms-auto px-4">
              {
                (!user?.user?.name) && isButtonVisible &&
                <>
                  <li className="nav-item text-white">
                    <Link to="/login" className="nav-link text-white">
                      Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/register" className="nav-link text-white">
                      Registrate
                    </Link>
                  </li>
                </>
              }
              { (user?.user?.isAdmin) &&
                <div className='d-flex '>
                  <Link className='text-decoration-none text-white admin' to='admin'>Administración</Link>
                </div>
              }
              {
                (user?.user?.name) && isButtonVisible &&
                <div className=' d-flex mt-2 '>
                  <li className=''>
                    <p className='text-white d-none d-md-block mx-3' >{`Bienvenido/a  ${user?.user?.name}`}</p>
                  </li>
                  <li
                    onClick={handleClick}
                    className='main-button text-white nav-close mt-2 mt-md-0  '
                    >Cerrar sesion
                  </li>
                </div>
              }
              {
                (user?.user?.name) && isButtonVisible &&
                <>
                  <li className="nav-item">
                    <Link to="/service/products-menu" className="nav-link text-white">
                      Menú
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/" className="nav-link text-white">
                      <FontAwesomeIcon icon={faShoppingCart} className="me-2" />
                    </Link>
                  </li>
                </>
              }
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;