import MiNavbar from "../Components_General/MiNavbar";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Home from "./home";

function Indexprim(){
    const navigate = useNavigate();
    
    // Verificar si el usuario está logueado
    useEffect(() => {
        const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
        if (!isLoggedIn) {
            navigate('/');
        }
    }, [navigate]);
    
    const IndexNavItems = [
        { label: "Explorar Mascotas", path: "/explorar" },
        { label: "Buscar Veterinario", path: "/veterinarios" },
        { label: "Explorar Productos", path: "/tienda" },
        { label: "Perfil", path: "/perfil" },
    ];
    
    return(
       <>
           <MiNavbar
               navItems={IndexNavItems}
               isLoggedIn={true}
           />
           <Home/>
       </> 
    );
}

export default Indexprim