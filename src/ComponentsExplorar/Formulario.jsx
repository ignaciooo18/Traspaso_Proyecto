
import React, { useState } from 'react';
import { Form, Button, Card, Row, Col } from 'react-bootstrap';

function FormularioResena({ onAgregarReseña, onVolver }) {

  const [nombre, setNombre] = useState('');
  const [dueño, setDueño] = useState('');
  const [tipoAnimal, setTipoAnimal] = useState('');
  const [doctor, setDoctor] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [rating, setRating] = useState(0);
  const [imagen, setImagen] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!nombre || !dueño || !tipoAnimal || !doctor || !descripcion || rating === 0 || !imagen) {
      alert('Por favor, completa todos los campos y sube una imagen.');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const nuevaReseña = {
        id: Date.now(),
        nombre,
        dueño,
        tipo_perro: tipoAnimal,
        doctor,
        descripcion,
        rating,
        imagen: reader.result,
      };
      onAgregarReseña(nuevaReseña);
    };
    reader.readAsDataURL(imagen);
  };

  return (
    <section>
        <h1 className="mb-5">Sube tu atención con nuestro equipo</h1>
        <Row className="justify-content-center">
            <Col lg={8}>
                <Card className="p-4 shadow-sm">
                    <Card.Title className="text-center mb-4">Formulario de Reseña</Card.Title>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Imagen de tu Mascota</Form.Label>
                            <Form.Control type="file" accept="image/*" onChange={(e) => setImagen(e.target.files[0])} />
                        </Form.Group>
                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Nombre de la Mascota</Form.Label>
                                    <Form.Control type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Raza de la Mascota</Form.Label>
                                    <Form.Control type="text" value={tipoAnimal} onChange={(e) => setTipoAnimal(e.target.value)} />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Form.Group className="mb-3">
                            <Form.Label>Nombre del Dueño</Form.Label>
                            <Form.Control type="text" value={dueño} onChange={(e) => setDueño(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Doctor que lo atendió</Form.Label>
                            <Form.Select value={doctor} onChange={(e) => setDoctor(e.target.value)}>
                                <option value="" disabled>Selecciona un doctor</option>
                                <option value="Dr. Juan Perez">Dr. Juan Perez</option>
                                <option value="Dr. Franco Maturaga">Dr. Franco Maturaga</option>
                                <option value="Dr. Carlos Varela">Dr. Franco Maturaga</option>
                                <option value="Dra. Laura Ramírez">Dr. Franco Maturaga</option>
                                <option value="Dra. Juana Roman">Dr. Franco Maturaga</option>
                                <option value="Dra. Mariana Soto">Dr. Franco Maturaga</option>
                            </Form.Select>
                        </Form.Group>
                       <Form.Group className="mb-3">
                            <Form.Label>Tu Calificación</Form.Label>
                                <div>
                                    {[1, 2, 3, 4, 5].map(star => (
                                    <i
                                        key={star}
                                        className={`bi ${star <= rating ? 'bi-star-fill' : 'bi-star'} text-warning fs-4`}
                                        onClick={() => setRating(star)}
                                        style={{ cursor: 'pointer', marginRight: '5px' }}
                                    ></i>
                                     ))}
                                </div>
                            </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Comentarios</Form.Label>
                            <Form.Control as="textarea" rows={3} value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />
                        </Form.Group>
                        <Button variant="primary" type="submit" className="w-100">Subir Reseña</Button>
                    </Form>
                </Card>
            </Col>
        </Row>
    </section>
  );
}

export default FormularioResena;