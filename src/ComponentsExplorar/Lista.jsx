import React, { useState, useEffect } from 'react';
import { Row, Button } from 'react-bootstrap';
import CardResena from './carta';
import FormularioResena from './Formulario';

function ListaReseñas() {
  const [reseñas, setReseñas] = useState([]);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [reseñaEditando, setReseñaEditando] = useState(null);

  useEffect(() => {
    const almacenadas = JSON.parse(localStorage.getItem('reseñas')) || [];
    setReseñas(almacenadas);
  }, []);

  // Agregar o actualizar (onGuardar desde FormularioResena)
  const handleGuardarReseña = (reseña) => {
    setReseñas((prev) => {
      const existe = prev.some(r => r.id === reseña.id);
      let actualizadas;
      if (existe) {
        actualizadas = prev.map(r => (r.id === reseña.id ? reseña : r));
      } else {
        actualizadas = [...prev, reseña];
      }
      localStorage.setItem('reseñas', JSON.stringify(actualizadas));
      return actualizadas;
    });
    setMostrarFormulario(false);
    setReseñaEditando(null);
  };

  const handleAgregarClick = () => {
    setReseñaEditando(null); 
    setMostrarFormulario(true);
  };

  const handleEditar = (reseña) => {
    setReseñaEditando(reseña);
    setMostrarFormulario(true);
  };

  const handleEliminar = (id) => {
    const confirmar = window.confirm('¿Seguro que deseas eliminar esta reseña?');
    if (!confirmar) return;
    setReseñas((prev) => {
      const filtradas = prev.filter(r => r.id !== id);
      localStorage.setItem('reseñas', JSON.stringify(filtradas));
      return filtradas;
    });
  };

  return (
    <section className="container my-4">
    
      {mostrarFormulario && (
        <FormularioResena
          reseñaInicial={reseñaEditando}
          onGuardar={handleGuardarReseña}
          onVolver={() => { setMostrarFormulario(false); setReseñaEditando(null); }}
        />
      )}

      <Row>
        {reseñas.length === 0 ? (
          <p className="text-center">No hay reseñas aún.</p>
        ) : (
          reseñas.map((reseña) => (
            <CardResena
              key={reseña.id}
              reseña={reseña}
              onEdit={handleEditar}
              onDelete={handleEliminar}
            />
          ))
        )}
      </Row>
    </section>
  );
}

export default ListaReseñas;
