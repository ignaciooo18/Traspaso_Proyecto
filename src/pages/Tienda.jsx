import React, { useState, useEffect } from 'react';
// 1. Ya NO importamos 'productosData'
import MiNavbar from '../Components_General/MiNavbar';

const Tienda = () => {
    // 2. 'productos' ahora es la lista FILTRADA para mostrar
    const [productos, setProductos] = useState([]);
    
    // 3. NUEVO ESTADO: 'allProductos' guarda la lista COMPLETA de la API
    const [allProductos, setAllProductos] = useState([]);

    const [productoSeleccionado, setProductoSeleccionado] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [suggestions, setSuggestions] = useState([]);

    // 4. NUEVOS ESTADOS: para carga y error de la API
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    const navItems = [
        { label: "Explorar veterinarios", path: "/veterinarios" },
        { label: "Perfil", path: "/perfil" },
        { label: "Ver reseñas", path: "/explorar" }
    ];

    // 5. NUEVO useEffect: Carga todos los productos de la API al iniciar
    useEffect(() => {
        const fetchProductos = async () => {
            try {
                const response = await fetch('http://demo5106183.mockable.io/productos');
                if (!response.ok) {
                    throw new Error('No se pudo cargar la lista de productos');
                }
                const data = await response.json();
                setAllProductos(data); // Guarda la lista completa
                setProductos(data);      // Muestra todos los productos al inicio
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProductos();
    }, []); // El array vacío [] asegura que se ejecute solo una vez

    // 6. useEffect de sugerencias: ahora filtra 'allProductos'
    useEffect(() => {
        if (searchTerm.length > 0) {
            const filtered = allProductos.filter(producto =>
                producto.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                producto.descripcion.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setSuggestions(filtered);
        } else {
            setSuggestions([]);
        }
    }, [searchTerm, allProductos]); // Depende de 'allProductos'

    // 7. handleSearchChange: Sigue igual
    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    // 8. handleSearchSubmit: ahora filtra 'allProductos'
    const handleSearchSubmit = (event) => {
        event.preventDefault();
        const resultadosBusqueda = allProductos.filter(producto =>
            producto.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
            producto.descripcion.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setProductos(resultadosBusqueda); // Actualiza la lista visible
        setProductoSeleccionado(null);
        setSuggestions([]); 
    };
    
    // 9. handleSuggestionClick: Sigue igual
    const handleSuggestionClick = (producto) => {
        setSearchTerm(producto.nombre);
        setSuggestions([]);
        setProductos([producto]); // Muestra solo el producto seleccionado
        setProductoSeleccionado(null);
    };

    // 10. handleVerDetalle: ahora busca en 'allProductos'
    const handleVerDetalle = (productoId) => {
        // Buscamos en la lista completa que ya tenemos
        const producto = allProductos.find(p => p.id === productoId);
        setProductoSeleccionado(producto);
    };

    // 11. handleVolver: ahora resetea 'productos' usando 'allProductos'
    const handleVolver = () => {
        setProductoSeleccionado(null);
        setProductos(allProductos); // Vuelve a mostrar la lista completa
        setSearchTerm(''); 
    };

    // 12. Renderizado: Agregamos manejo de Carga y Error
    if (loading) {
        return <p className="text-center w-100 fs-5 text-muted">Cargando productos...</p>;
    }

    if (error) {
        return <p className="text-center w-100 fs-5 text-danger">Error: {error}</p>;
    }

    // El resto de tu JSX es idéntico, ya que lee de 'productos' y 'productoSeleccionado'
    return (
        <>
            {<MiNavbar navItems={navItems} />}
            
            <main className="container py-5">
                <h1 className="section-title text-center mb-4">Encuentra tu producto más barato</h1>

                {/* Formulario de búsqueda (sin cambios en JSX) */}
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

                {/* Lógica de renderizado (sin cambios en JSX) */}
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