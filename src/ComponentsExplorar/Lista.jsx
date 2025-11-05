import React from 'react';
import CardResena from './carta';


function ListaResenas({ reseñas, onEdit, onDelete }) {
  return (
    <section className="container my-4">
      
      <div className="row"> 
        {reseñas.length === 0 ? (
          <p className="text-center text-muted">No hay reseñas aún.</p>
        ) : (
          reseñas.map((reseña) => (
            <CardResena
              key={reseña.id}
              reseña={reseña}
              onEdit={onEdit}   
              onDelete={onDelete} 
            />
          ))
        )}
      </div>
    </section>
  );
}

export default ListaResenas;