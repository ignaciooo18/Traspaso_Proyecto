
import React, { useState } from 'react';
import { veterinariosData } from '../data/Veterinarios';
import VeterinarioCard from './VeterinariosCard';

const VeterinarioLista = ({ onVeterinarioSelect }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const resultadosBusqueda = veterinariosData.filter(vet =>
        vet.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vet.especialidad.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div id="vet-list-container">
            <h2 className="text-center mb-4">Nuestros Veterinarios</h2>
            
          
            <form id="search-form" className="mb-5" onSubmit={(e) => e.preventDefault()}>
                <div className="input-group">
                    <input
                        type="text"
                        id="search-input"
                        className="form-control"
                        placeholder="Buscar por nombre o especialidad..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                </div>
            </form>

            <div id="vet-cards-container" className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                {resultadosBusqueda.length > 0 ? (
                    resultadosBusqueda.map(vet => (
                        <VeterinarioCard 
                            key={vet.id} 
                            vet={vet} 
                            onReservarClick={onVeterinarioSelect} 
                        />
                    ))
                ) : (
                    <p className="text-center w-100 fs-5 text-muted">
                        No se encontraron veterinarios que coincidan con la búsqueda.
                    </p>
                )}
            </div>
        </div>
    );
};

export default VeterinarioLista;