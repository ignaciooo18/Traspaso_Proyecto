// src/pages/CerrarSesion.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

function CerrarSesion() {
    const navigate = useNavigate();
    const handleGoToLogin = () => {
        navigate('/login');
    };
    
    return (
        <div style={{ padding: '50px', textAlign: 'center' }}>
            <h1>¡Sesión Cerrada!</h1>
            <p>Gracias por visitarnos.</p>
            <button 
                onClick={handleGoToLogin}
            >
            Ir a Iniciar Sesión
            </button>
        </div>
    );
}

export default CerrarSesion;