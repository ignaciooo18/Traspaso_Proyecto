import React from 'react';

import { Link } from 'react-router-dom';
function Navbar({navItems = []}){
    return(
        <nav className="navbar navbar-expand-lg py-3"> 
            <div className="container"> 
                <Link className="navbar-brand" to="/"> 
                    <img src="/img/PetSocietylogo - copia.webp" alt="logo" width="100" height="75" /> 
                </Link>
                <button 
                    className="navbar-toggler" 
                    type="button" 
                    data-bs-toggle="collapse" 
                    data-bs-target="#navbarNav" 
                    aria-controls="navbarNav" 
                    aria-expanded="false" 
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span> 
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0"> 
                        {navItems.map((item,index)=>(
                           <li className='nav-item'key={index}>
                            <Link className='nav-link'to={item.path}>
                            {item.label}
                            </Link>
                           </li> 
                        ))}
                    </ul>
                            <div className="d-flex"> 

                        <Link to="/cerrar-sesion" className="btn btn-secondary-outline">Cerrar sesión</Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;