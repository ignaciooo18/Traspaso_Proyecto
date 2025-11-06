
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 

export default function Registro() {
  const [formData, setFormData] = useState({
    nombreCompleto: '',
    correoElectronico: '',
    password: '',
    password2: ''
  });
  const [isHovered, setIsHovered] = useState(false);
  
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.password2) {
      alert('Las contraseñas no coinciden');
      return;
    }

    if (!formData.correoElectronico.includes('@')) {
      alert('Por favor ingresa un correo electrónico válido (debe contener @)');
      return;
    }

    if (formData.password.length < 3) {
      alert('La contraseña debe tener al menos 3 caracteres');
      return;
    }
    
    console.log('Datos del formulario:', formData);
    alert('Uusario registrado con éxito');
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <div 
      className="d-flex justify-content-center align-items-center position-relative overflow-hidden" 
      style={{ 
        backgroundColor: '#c5f4e0',
        minHeight: '100vh',
        width: '100%',
        position: 'fixed',
        top: 0,
        left: 0
      }}
    >
      <div 
        className="container d-flex flex-column align-items-center p-5 shadow-lg bg-white position-relative"
        style={{ 
          maxWidth: '450px',
          borderRadius: '25px',
          backdropFilter: 'blur(10px)',
          animation: 'fadeIn 0.5s ease-in',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          margin: '2rem 1rem'
        }}
      >
        <div 
          className="mb-4"
          style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #88B04B, #A1C6D7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 10px 30px rgba(136, 176, 75, 0.4)',
            fontSize: '2.5rem'
          }}
        >
          🐾
        </div>

        <h1 
          className="poppins-font text-center mb-2"
          style={{
            fontSize: '2rem',
            fontWeight: '700',
            color: '#333333',
            letterSpacing: '-0.5px'
          }}
        >
          Crea tu cuenta
        </h1>
        
        <p 
          className="text-center mb-4"
          style={{
            color: '#6c757d',
            fontSize: '0.95rem'
          }}
        >
          Únete a la comunidad de Pet Society
        </p>

        <div className="w-100">
          <div className="mb-3">
            <label 
              htmlFor="nombreCompleto" 
              className="form-label"
              style={{ 
                fontWeight: '600',
                color: '#333333',
                fontSize: '0.9rem'
              }}
            >
              Nombre completo
            </label>
            <input 
              type="text" 
              id="nombreCompleto" 
              className="form-control" 
              placeholder="Ingresa tu nombre completo"
              value={formData.nombreCompleto}
              onChange={handleChange}
              required 
              style={{
                padding: '12px 16px',
                borderRadius: '12px',
                border: '2px solid #e9ecef',
                fontSize: '0.95rem',
                transition: 'all 0.3s ease'
              }}
              onFocus={(e) => e.target.style.borderColor = '#88B04B'}
              onBlur={(e) => e.target.style.borderColor = '#e9ecef'}
            />
          </div>

          <div className="mb-3">
            <label 
              htmlFor="correoElectronico" 
              className="form-label"
              style={{ 
                fontWeight: '600',
                color: '#333333',
                fontSize: '0.9rem'
              }}
            >
              Correo electrónico
            </label>
            <input 
              type="email" 
              id="correoElectronico" 
              className="form-control" 
              placeholder="tu@correo.com"
              value={formData.correoElectronico}
              onChange={handleChange}
              required 
              style={{
                padding: '12px 16px',
                borderRadius: '12px',
                border: '2px solid #e9ecef',
                fontSize: '0.95rem',
                transition: 'all 0.3s ease'
              }}
              onFocus={(e) => e.target.style.borderColor = '#88B04B'}
              onBlur={(e) => e.target.style.borderColor = '#e9ecef'}
            />
          </div>

          <div className="mb-3">
            <label 
              htmlFor="password" 
              className="form-label"
              style={{ 
                fontWeight: '600',
                color: '#333333',
                fontSize: '0.9rem'
              }}
            >
              Contraseña
            </label>
            <input 
              type="password" 
              id="password" 
              className="form-control" 
              placeholder="Crea tu contraseña"
              value={formData.password}
              onChange={handleChange}
              required 
              style={{
                padding: '12px 16px',
                borderRadius: '12px',
                border: '2px solid #e9ecef',
                fontSize: '0.95rem',
                transition: 'all 0.3s ease'
              }}
              onFocus={(e) => e.target.style.borderColor = '#88B04B'}
              onBlur={(e) => e.target.style.borderColor = '#e9ecef'}
            />
          </div>

          <div className="mb-4">
            <label 
              htmlFor="password2" 
              className="form-label"
              style={{ 
                fontWeight: '600',
                color: '#333333',
                fontSize: '0.9rem'
              }}
            >
              Repetir contraseña
            </label>
            <input 
              type="password" 
              id="password2" 
              className="form-control" 
              placeholder="Reingresa contraseña"
              value={formData.password2}
              onChange={handleChange}
              required 
              style={{
                padding: '12px 16px',
                borderRadius: '12px',
                border: '2px solid #e9ecef',
                fontSize: '0.95rem',
                transition: 'all 0.3s ease'
              }}
              onFocus={(e) => e.target.style.borderColor = '#88B04B'}
              onBlur={(e) => e.target.style.borderColor = '#e9ecef'}
            />
          </div>

          <button 
            type="button"
            onClick={handleSubmit} // Este botón está bien, llama a handleSubmit
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="btn w-100 mb-3"
            style={{
              background: isHovered 
                ? 'linear-gradient(135deg, #6a8c3d, #88B04B)' 
                : '#88B04B',
              border: 'none',
              borderRadius: '12px',
              fontWeight: '700',
              padding: '14px',
              fontSize: '1rem',
              color: '#ffffff',
              boxShadow: isHovered 
                ? '0 12px 30px rgba(136, 176, 75, 0.4)' 
                : '0 8px 20px rgba(136, 176, 75, 0.3)',
              transition: 'all 0.3s ease',
              transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
              letterSpacing: '0.5px'
            }}
          >
            Registrarte
          </button>
        </div>

        <div 
          className="w-100 text-center pt-3"
          style={{
            borderTop: '2px solid #F5F5F5'
          }}
        >
          <span style={{ color: '#333333', fontSize: '0.9rem' }}>
            ¿Ya tienes una cuenta?{' '}
          </span>
          <a 
            href="#" 
            onClick={(e) => {
              e.preventDefault();
              handleLoginClick();
            }}
            style={{ 
              textDecoration: 'none', 
              color: '#FFB570',
              fontWeight: '700',
              fontSize: '0.9rem',
              transition: 'color 0.3s ease'
            }}
            onMouseEnter={(e) => e.target.style.color = '#88B04B'}
            onMouseLeave={(e) => e.target.style.color = '#FFB570'}
          >
            Inicia sesión
          </a>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}