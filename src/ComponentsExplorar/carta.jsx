
import React from 'react';
import { Card, Col, Button, ButtonGroup } from 'react-bootstrap';
import RatingEstrellas from '../Components_General/RatingEstrellas';

// Las props onEdit y onDelete ya están correctas como las tienes.
function CardResena({ reseña, onEdit, onDelete }) {
  
  return (
    <Col md={6} lg={4} className="mb-4">

      <Card className="shadow-sm h-100 border border-success border-3 rounded-4 overflow-hidden">
        
        <div className="position-absolute top-0 end-0 p-2" style={{ zIndex: 10 }}>
          <ButtonGroup size="sm" className="bg-white rounded ">
            <Button variant="outline-primary" onClick={() => onEdit(reseña)}>
              ✏️ Editar
            </Button>
            <Button variant="outline-danger" onClick={() => onDelete(reseña.id)}>
              🗑️ Eliminar
            </Button>
          </ButtonGroup>
        </div>
        
        <Card.Img
          variant="top"
          src={reseña.imagen}
          alt={`Foto de ${reseña.nombre}`}
          style={{ height: '200px', objectFit: 'cover' }}
        />
        
     
        <Card.Body className="d-flex flex-column">
          
          <Card.Title className="poppins-font mb-2">
            {reseña.nombre} 
            <span className="text-muted fw-normal"> ({reseña.tipo_perro || 'N/A'})</span>
          </Card.Title>

          <div className="mb-3 open-sans-font">
            <div className="d-flex justify-content-between">
              <strong>Dueño:</strong>
              <span>{reseña.dueño}</span>
            </div>
            <div className="d-flex justify-content-between">
              <strong>Doctor:</strong>
              <span>{reseña.doctor}</span>
            </div>
          </div>


          <div className="d-flex align-items-center justify-content-between mb-3 open-sans-font">
            <strong>Calificación:</strong>
            <div className="ms-2">
              <RatingEstrellas rating={reseña.rating} />
            </div>
          </div>

          <hr className="my-1" />
        
          <p className="card-text text-muted fst-italic pt-2 flex-grow-1 mt-auto open-sans-font">
            "{reseña.descripcion}"
          </p>

        </Card.Body>
      </Card>
    </Col>
  );
}

export default CardResena;