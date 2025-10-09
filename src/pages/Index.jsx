import Navbar from "../Components_General/Navbar";
import React from "react";
import Home from "./home";
function Indexprim(){
const IndexNavItems = [
    { label: "Explorar Mascotas", path: "/explorar" },
    { label: "Buscar Veterinario", path: "/veterinarios" },
    { label: "Explorar Productos", path: "/tienda" }
];
    return(
        
       <><Navbar
        navItems={IndexNavItems}
        />
        <Home/>
    </> 
        
    );

}
export default Indexprim