import React from "react";

function Form (){
    return (

        <form id="search-form" className="d-flex mb-4" role="search">
            <div className="search-container position-relative w-100">
                <input className="form-control me-2" type="search" placeholder="Buscar por nombre o especialidad" aria-label="buscar" id="search-input" />
                    <div 
                        id="suggestions-box" className="list-group position-absolute w-100 mt-1" style="z-index: 1000; display: none;">
                    </div>
            </div>
            <button className="btn btn-outline-success" type="submit">Buscar</button>
        </form>
    );
}

export default Form;