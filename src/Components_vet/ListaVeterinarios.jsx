import React, { useState, useEffect } from 'react';

import VeterinarioCard from './VeterinariosCard';

const VeterinarioLista = ({ onVeterinarioSelect }) => {

    const [searchTerm, setSearchTerm] = useState('');

    const [veterinarios, setVeterinarios] = useState([]); // Guarda los datos de la API
    const [loading, setLoading] = useState(true); // Indica si está cargando
    const [error, setError] = useState(null); // Guarda un posible error

    // 4. useEffect para cargar los datos de la API al montar el componente
    useEffect(() => {
        const fetchVeterinarios = async () => {
            try {
                
                const response = await fetch('http://demo5106183.mockable.io/veterinarios');
                if (!response.ok) {
                    throw new Error('No se pudieron cargar los datos de los veterinarios');
                }
                const data = await response.json();
                setVeterinarios(data);
            } catch (err) {
                setError(err.message); 
            } finally {
                setLoading(false); 
            }
        };

        fetchVeterinarios();
    }, []); 
    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    // 6. La lógica de búsqueda ahora filtra el *estado* 'veterinarios'
    const resultadosBusqueda = veterinarios.filter(vet =>
        vet.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vet.especialidad.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // 7. Manejadores de estado para Carga y Error
    if (loading) {
        return <p className="text-center w-100 fs-5 text-muted">Cargando veterinarios...</p>;
    }

    if (error) {
        return <p className="text-center w-100 fs-5 text-danger">Error: {error}</p>;
    }

    // 8. El resto de tu renderizado es IDÉNTICO,
    //    ya que sigue usando la variable 'resultadosBusqueda'
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