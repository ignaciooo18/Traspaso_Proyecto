
import React from 'react';
import { Card, Col } from 'react-bootstrap';
import RatingEstrellas from '../Components_General/RatingEstrellas';

function CardResena({ reseña }) {
  return (
    <Col md={6} lg={4}>
      <Card className="shadow-sm h-100">
        <Card.Img 
          variant="top" 
          src={reseña.imagen} 
          alt={`Foto de ${reseña.nombre}`} 
          style={{ height: '200px', objectFit: 'cover' }}
        />
        <Card.Body>
          <Card.Title>{reseña.nombre} ({reseña.tipo_perro || 'N/A'})</Card.Title>
          <p className="card-text"><strong>Dueño:</strong> {reseña.dueño}</p>
          <p className="card-text"><strong>Doctor:</strong> {reseña.doctor}</p>
          <div className="d-flex align-items-center mb-2">
            <strong>Calificación:</strong>
            <div className="ms-2">
              <RatingEstrellas rating ={reseña.rating}/>   
            </div>
          </div>
          <p className="card-text">{reseña.descripcion}</p>
        </Card.Body>
      </Card>
    </Col>
  );
}

export default CardResena;