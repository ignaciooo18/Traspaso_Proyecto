import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    correoElectronico: '',
    password: ''
  });
  const [isHovered, setIsHovered] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validación del correo
    if (!formData.correoElectronico.includes('@')) {
      alert('Por favor ingresa un correo electrónico válido (debe contener @)');
      return;
    }
    
    // Validación de campos completos
    if (!formData.correoElectronico || !formData.password) {
      alert('Por favor completa todos los campos');
      return;
    }

    try {
      const response = await fetch('http://44.199.81.141:8080/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.correoElectronico,
          password: formData.password
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        alert(errorData.message || 'Error al iniciar sesión');
        return;
      }

      const data = await response.json();
      
      // Guardar sesión en localStorage
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userEmail', formData.correoElectronico);
      if (data.token) {
        localStorage.setItem('authToken', data.token);
      }
      
      alert('Sesión iniciada correctamente');
      navigate('/inicio');
    } catch (error) {
      console.error('Error:', error);
      alert('Error de conexión. Por favor intenta de nuevo.');
    }
  };
  
  const handleRegisterClick = () => {
    navigate('/register');
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
          border: '1px solid rgba(255, 255, 255, 0.3)'
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
          ¡Bienvenid@!
        </h1>
        
        <p 
          className="text-center mb-4"
          style={{
            color: '#6c757d',
            fontSize: '0.95rem'
          }}
        >
          Inicia sesión en Pet Society
        </p>

        <form className="w-100" onSubmit={handleSubmit}>
          <div className="mb-4">
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

          <div className="mb-4">
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
              placeholder="••••••••"
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

          <button 
            type="submit"
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
            Iniciar sesión
          </button>

          <div className="text-center mb-3">
            <a 
              href="#" 
              style={{
                color: '#A1C6D7',
                textDecoration: 'none',
                fontSize: '0.9rem',
                fontWeight: '500',
                transition: 'color 0.3s ease'
              }}
              onMouseEnter={(e) => e.target.style.color = '#88B04B'}
              onMouseLeave={(e) => e.target.style.color = '#A1C6D7'}
            >
              ¿Olvidaste tu contraseña?
            </a>
          </div>
        </form>

        <div 
          className="w-100 text-center pt-3"
          style={{
            borderTop: '2px solid #F5F5F5'
          }}
        >
          <span style={{ color: '#333333', fontSize: '0.9rem' }}>
            ¿No tienes una cuenta?{' '}
          </span>
          <a 
            href="#" 
            onClick={(e) => {
              e.preventDefault();
              handleRegisterClick();
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
            Regístrate aquí
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