import React, { useState, useEffect } from 'react';
import { productosData } from '../data/Tienda'; 
import MiNavbar from '../Components_General/MiNavbar';
const Tienda = () => {
    const [productos, setProductos] = useState(productosData);
    const [productoSeleccionado, setProductoSeleccionado] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const navItems = [
        { label: "Explorar veterinarios", path: "/veterinarios" },
        { label: "Perfil", path: "/perfil" },
        { label: "Ver reseñas", path: "/reseñas" }
    ];

    useEffect(() => {
        if (searchTerm.length > 0) {
            const filtered = productosData.filter(producto =>
                producto.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                producto.descripcion.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setSuggestions(filtered);
        } else {
            setSuggestions([]);
        }
    }, [searchTerm]);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSearchSubmit = (event) => {
        event.preventDefault();
        const resultadosBusqueda = productosData.filter(producto =>
            producto.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
            producto.descripcion.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setProductos(resultadosBusqueda);
        setProductoSeleccionado(null);
        setSuggestions([]); 
    };
    
    const handleSuggestionClick = (producto) => {
        setSearchTerm(producto.nombre);
        setSuggestions([]);
        setProductos([producto]);
        setProductoSeleccionado(null);
    };

    const handleVerDetalle = (productoId) => {
        const producto = productosData.find(p => p.id === productoId);
        setProductoSeleccionado(producto);
    };

    const handleVolver = () => {
        setProductoSeleccionado(null);
        setProductos(productosData); 
        setSearchTerm(''); 
    };
    return (
        <>

            {<MiNavbar navItems={navItems} />}
            
            <main className="container py-5">
                <h1 className="section-title text-center mb-4">Encuentra tu producto más barato</h1>


                <form className="d-flex justify-content-center mb-5" role="search" onSubmit={handleSearchSubmit}>
                    <div className="search-container position-relative w-50">
                        <input 
                            className="form-control me-2" 
                            type="search" 
                            placeholder="Ingresa tu producto" 
                            aria-label="buscar"
                            value={searchTerm}
                            onChange={handleSearchChange}
                            onFocus={handleSearchChange} 
                        />
                        {suggestions.length > 0 && (
                            <div className="list-group position-absolute w-100 mt-1" style={{ zIndex: 1000 }}>
                                {suggestions.map(product => (
                                    <a 
                                        key={product.id}
                                        href="#"
                                        className="list-group-item list-group-item-action"
                                        onClick={() => handleSuggestionClick(product)}
                                    >
                                        {product.nombre}
                                    </a>
                                ))}
                            </div>
                        )}
                    </div>
                    <button className="btn btn-outline-success" type="submit">Buscar</button>
                </form>

                {productoSeleccionado ? (
            
                    <div className="row justify-content-center">
                        <div className="card p-0 shadow-sm" style={{ maxWidth: '1800px' }}>
                            <div className="row g-0">
                                <div className="col-md-4">
                                    <img src={productoSeleccionado.imagen} className="img-fluid rounded-start" alt={productoSeleccionado.nombre} />
                                </div>
                                <div className="col-md-8">
                                    <div className="card-body">
                                        <h2 className="card-title">{productoSeleccionado.nombre}</h2>
                                        <p className="card-text text-muted">{productoSeleccionado.descripcion}</p>
                                        <hr />
                                        <h4>Precios en diferentes tiendas:</h4>
                                        <ul className="list-group list-group-flush mt-3">
                                            {productoSeleccionado.precios.map((p, index) => (
                                                <li key={index} className="list-group-item d-flex justify-content-between align-items-center mb-2 rounded shadow-sm">
                                                    <span>{p.tienda}:</span>
                                                    <span className="fs-5 fw-bold">${p.precio.toLocaleString('es-CL')} CLP</span>
                                            <a 
                                                href={p.link} 
                                                className="btn btn-success mt-3" 
                                                target="_blank" 
                                                rel="noopener noreferrer"
                                            >
                                                <i className="bi bi-cart-fill me-2"></i>
                                            Ir a la tienda
                                            </a>
                                                </li>
                                            ))}
                                        </ul>
                                        <button className="btn btn-secondary mt-3" onClick={handleVolver}>Volver a explorar productos</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                  
                    <div className="row g-4">
    {productos.length > 0 ? (
        productos.map(producto => (
            <div className="col-12 col-md-6 col-lg-4" key={producto.id}>
                <div className="card h-100 shadow-sm">
                    <img src={producto.imagen} className="card-img-top" alt={producto.nombre} />
                    <div className="card-body d-flex flex-column text-center">
                        <h5 className="card-title">{producto.nombre}</h5>
                        <p className="card-text text-muted">{producto.descripcion}</p>
                        <button className="btn btn-primary mt-auto" onClick={() => handleVerDetalle(producto.id)}>Ver Detalle</button>
                    </div>
                </div>
            </div>
        ))
    ) : (
        <p className="text-center w-100 fs-5 text-muted">No se encontraron productos.</p>
    )}
</div>
                )}
            </main>
        </>
    );
};

export default Tienda;