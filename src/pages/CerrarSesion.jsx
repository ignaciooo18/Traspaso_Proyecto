import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function CerrarSesion() {
    const navigate = useNavigate();
    
    useEffect(() => {
        // Limpiar localStorage al cargar la página
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('userEmail');
    }, []);
    
    const handleGoToLogin = () => {
        navigate('/login');
    };
    
    const handleGoToHome = () => {
        navigate('/');
    };
    
    return (
        <div style={{ padding: '50px', textAlign: 'center' }}>
            <h1>¡Sesión Cerrada!</h1>
            <p>Gracias por visitarnos.</p>
            <button 
                onClick={handleGoToLogin}
                style={{ marginRight: '10px' }}
            >
                Ir a Iniciar Sesión
            </button>
            <button 
                onClick={handleGoToHome}
            >
                Ir al Inicio
            </button>
        </div>
    );
}

export default CerrarSesion;
