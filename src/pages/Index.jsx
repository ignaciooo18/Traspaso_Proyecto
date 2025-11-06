import MiNavbar from "../Components_General/MiNavbar";
import React from "react";
import Home from "./home";
import CerrarSesion from "./CerrarSesion";
function Indexprim(){
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
        
        />
        <Home/>
    </> 
        
    );

}
export default Indexprim