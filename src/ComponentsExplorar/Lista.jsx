
import React from 'react';
import { Row } from 'react-bootstrap';
import CardResena from './carta';

function ListaResenas({ reseñas }) {
  return (
    <section>
      <h1 className="mb-5">Reseñas de Mascotas y Veterinarios</h1>
      <Row className="g-4">
        {reseñas.length > 0 ? (
          reseñas.map(reseña => (
            <CardResena key={reseña.id} reseña={reseña} />
          ))
        ) : (
          <p className="text-center w-100 fs-5 text-muted">
            Aún no hay reseñas. ¡Sé el primero en subir una!
          </p>
        )}
      </Row>
    </section>
  );
}

export default ListaResenas;