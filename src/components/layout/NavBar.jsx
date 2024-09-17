import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';

const NavBar = () => {
  const [mostraConta, setMostraConta] = useState(false);

  const handleAccountClick = (event) => {
    event.preventDefault();
    setMostraConta(prevMostraConta => !prevMostraConta);
  };

  return (
    <nav className='navbar navbar-expand-lg  px-5 shadow sticky-top'>
      <div className='container-fluid'>
        <Link to={"/"} style={{ textDecoration: 'none' }}>
          <span className='hotel-color'>
          <i class="bi bi-tropical-storm"></i>PALACE</span>
        </Link>
        <button
          className='navbar-toggler'
          type='button'
          data-bs-toggle="collapse"
          data-bs-target="#navbarScroll"
          aria-controls='navbarScroll'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon'></span>
        </button>
        <div className='collapse navbar-collapse' id="navbarScroll">
          <ul className='navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll'>
            <li className='nav-item'>
              <NavLink className="nav-link" aria-current="page" to={"/admin"}>
                Admin
              </NavLink>
            </li>
          </ul>

          <ul className="d-flex navbar-nav">
            <li className='nav-item'>
              <NavLink className="nav-link" to={"/encontrar-reserva"}>
              <i class="bi bi-book"></i>
                Minhas Reservas
              </NavLink>
            </li>

            <li className='nav-item dropdown'>
              <a
                className={`nav-link dropdown-toggle ${mostraConta ? "show" : ""}`}
                href='#'
                role='button'
                data-bs-toggle="dropdown"
                aria-expanded={mostraConta}
                onClick={handleAccountClick}
              >
                Conta
              </a>

              <ul className={`dropdown-menu ${mostraConta ? "show" : ""}`}>
                <li>
                  <Link to={"/login"} className="dropdown-item">
                    Login
                  </Link>
                </li>
                <li>
                  <Link to={"/perfil"} className='dropdown-item'>
                    Perfil
                  </Link>
                </li>
                <li>
                  <Link to={"/logout"} className='dropdown-item'>
                    Logout
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
