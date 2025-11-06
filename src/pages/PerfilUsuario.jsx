import React from 'react';
import MiNavbar from '../Components_General/MiNavbar.jsx';

export default function PerfilUsuario() {
  const usuario = {
    nombre: "María González",
    edad: 24,
    correo: "maria.gonzalez@gmail.com",
    fotoUrl: "/img/descarga2.jpeg"
  };

  const mascota = {
    nombre: "Luna",
    tipo: "Gato",
    edad: 2,
    datoCurioso: "Le encanta dormir sobre teclados.",
    fotoUrl: "/img/Black cat.jpeg"
  };

  const navItems = [
    { label: 'Inicio', path: '/' },
    { label: 'Perfil', path: '/perfil' },
    { label: 'Mascotas', path: '/explorar' }
  ];

  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#c5f4e0',
      paddingBottom: '2rem'
    }}> 
      <MiNavbar navItems={navItems} />

      <header style={{ 
        color: '#333333', 
        textAlign: 'center', 
        padding: '2rem 1.5rem',
        backgroundColor: 'white',
        boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
        marginBottom: '3rem'
      }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '1rem',
          marginBottom: '0.5rem'
        }}>
          <span style={{ fontSize: '2.5rem' }}>🐾</span>
          <h1 className="poppins-font" style={{
            margin: 0,
            fontSize: '2rem',
            fontWeight: '700',
            letterSpacing: '-0.5px'
          }}>
            Perfil de Usuario
          </h1>
        </div>
      </header>

      <main style={{ 
        maxWidth: '1100px', 
        margin: '0 auto',
        padding: '0 1rem'
      }}>
        <div style={{ 
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2rem',
          alignItems: 'start'
        }}>
        
          <section style={{
            backgroundColor: 'white',
            padding: '2rem',
            borderRadius: '20px',
            boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-5px)';
            e.currentTarget.style.boxShadow = '0 12px 30px rgba(136, 176, 75, 0.2)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.1)';
          }}>
            <h2 className="section-title" style={{ 
              color: '#88B04B',
              fontSize: '1.5rem',
              fontWeight: '700',
              marginBottom: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <span>👤</span> Información Personal
            </h2>
            
            <div style={{ 
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '1.5rem'
            }}>
              <img 
                src={usuario.fotoUrl} 
                alt="Foto de perfil" 
                style={{ 
                  borderRadius: '50%', 
                  width: '180px',
                  height: '180px',
                  objectFit: 'cover',
                  border: '5px solid #88B04B',
                  boxShadow: '0 8px 20px rgba(136, 176, 75, 0.3)'
                }}
              />
              
              <div style={{ width: '100%' }}>
                <div style={{
                  padding: '1rem',
                  backgroundColor: '#F5F5F5',
                  borderRadius: '12px',
                  marginBottom: '0.8rem'
                }}>
                  <p style={{ margin: 0, color: '#6c757d', fontSize: '0.85rem' }}>Nombre</p>
                  <p style={{ margin: 0, fontWeight: '600', color: '#333333', fontSize: '1.1rem' }}>
                    {usuario.nombre}
                  </p>
                </div>
                
                <div style={{
                  padding: '1rem',
                  backgroundColor: '#F5F5F5',
                  borderRadius: '12px',
                  marginBottom: '0.8rem'
                }}>
                  <p style={{ margin: 0, color: '#6c757d', fontSize: '0.85rem' }}>Edad</p>
                  <p style={{ margin: 0, fontWeight: '600', color: '#333333', fontSize: '1.1rem' }}>
                    {usuario.edad} años
                  </p>
                </div>
                
                <div style={{
                  padding: '1rem',
                  backgroundColor: '#F5F5F5',
                  borderRadius: '12px'
                }}>
                  <p style={{ margin: 0, color: '#6c757d', fontSize: '0.85rem' }}>Correo</p>
                  <p style={{ 
                    margin: 0, 
                    fontWeight: '600', 
                    color: '#88B04B', 
                    fontSize: '1rem',
                    wordBreak: 'break-all'
                  }}>
                    {usuario.correo}
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section style={{
            backgroundColor: 'white',
            padding: '2rem',
            borderRadius: '20px',
            boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-5px)';
            e.currentTarget.style.boxShadow = '0 12px 30px rgba(161, 198, 215, 0.3)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.1)';
          }}>
            <h2 className="section-title" style={{ 
              color: '#A1C6D7',
              fontSize: '1.5rem',
              fontWeight: '700',
              marginBottom: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <span>🐱</span> Mi Mascota
            </h2>
            
            <article>
              <div style={{
                position: 'relative',
                marginBottom: '1.5rem',
                borderRadius: '15px',
                overflow: 'hidden',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
              }}>
                <img 
                  src={mascota.fotoUrl} 
                  alt={`Foto de ${mascota.nombre}`}
                  style={{ 
                    width: '100%',
                    height: '300px',
                    objectFit: 'cover'
                  }}
                />
                <div style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)',
                  padding: '2rem 1.5rem 1rem',
                  color: 'white'
                }}>
                  <h3 style={{ 
                    margin: 0,
                    fontSize: '1.8rem',
                    fontWeight: '700'
                  }}>
                    {mascota.nombre}
                  </h3>
                </div>
              </div>
              
              <div style={{
                padding: '1rem',
                backgroundColor: '#F5F5F5',
                borderRadius: '12px',
                marginBottom: '0.8rem'
              }}>
                <p style={{ margin: 0, color: '#6c757d', fontSize: '0.85rem' }}>Tipo</p>
                <p style={{ margin: 0, fontWeight: '600', color: '#333333', fontSize: '1.1rem' }}>
                  {mascota.tipo}
                </p>
              </div>
              
              <div style={{
                padding: '1rem',
                backgroundColor: '#F5F5F5',
                borderRadius: '12px',
                marginBottom: '0.8rem'
              }}>
                <p style={{ margin: 0, color: '#6c757d', fontSize: '0.85rem' }}>Edad</p>
                <p style={{ margin: 0, fontWeight: '600', color: '#333333', fontSize: '1.1rem' }}>
                  {mascota.edad} años
                </p>
              </div>
              
              <div style={{
                padding: '1rem',
                backgroundColor: '#FFB570',
                borderRadius: '12px',
                border: '2px dashed #ff9d4d'
              }}>
                <p style={{ margin: 0, color: 'white', fontSize: '0.85rem', fontWeight: '600' }}>
                  💡 Dato curioso
                </p>
                <p style={{ margin: '0.5rem 0 0 0', fontWeight: '500', color: 'white', fontSize: '1rem' }}>
                  {mascota.datoCurioso}
                </p>
              </div>
            </article>
          </section>

        </div>
      </main>

      <footer style={{ 
        textAlign: 'center', 
        padding: '2rem 1rem',
        marginTop: '4rem',
        backgroundColor: 'white',
        color: '#6c757d',
        boxShadow: '0 -4px 12px rgba(0,0,0,0.05)'
      }}>
        <p style={{ margin: 0, fontSize: '0.9rem' }}>
          © 2025 Pet Society. Todos los derechos reservados. 🐾
        </p>
      </footer>
    </div>
  );
}