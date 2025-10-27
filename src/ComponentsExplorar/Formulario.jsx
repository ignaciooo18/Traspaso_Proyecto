import React, { useState, useEffect } from 'react';
import { Form, Button, Card, Row, Col } from 'react-bootstrap';

function FormularioResena({ reseñaInicial = null, onGuardar, onVolver }) {
  const [nombre, setNombre] = useState('');
  const [dueño, setDueño] = useState('');
  const [tipoAnimal, setTipoAnimal] = useState('');
  const [doctor, setDoctor] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [rating, setRating] = useState(0);
  const [imagen, setImagen] = useState(null);
  const [imagenPreview, setImagenPreview] = useState(null); // si venimos editando, podemos mostrar la imagen existente

  // Si recibimos reseñaInicial, cargamos los valores (para editar)
  useEffect(() => {
    if (reseñaInicial) {
      setNombre(reseñaInicial.nombre || '');
      setDueño(reseñaInicial.dueño || '');
      setTipoAnimal(reseñaInicial.tipo_perro || '');
      setDoctor(reseñaInicial.doctor || '');
      setDescripcion(reseñaInicial.descripcion || '');
      setRating(reseñaInicial.rating || 0);
      setImagenPreview(reseñaInicial.imagen || null);
      setImagen(null); // si el usuario sube una nueva imagen la reemplazará
    } else {
      // limpiar formulario si es nueva reseña
      setNombre('');
      setDueño('');
      setTipoAnimal('');
      setDoctor('');
      setDescripcion('');
      setRating(0);
      setImagen(null);
      setImagenPreview(null);
    }
  }, [reseñaInicial]);

  const handleSubmit = (event) => {
  event.preventDefault();

  if (!nombre || !dueño || !tipoAnimal || !doctor || !descripcion || rating === 0) {
    alert('Por favor, completa todos los campos (la imagen puede ser opcional).');
    return;
  }

  const finishSaving = (imagenDataUrlFinal) => {
    const reseñaAEnviar = {
      id: reseñaInicial ? reseñaInicial.id : Date.now(),
      nombre,
      dueño,
      tipo_perro: tipoAnimal,
      doctor,
      descripcion,
      rating,
      imagen: imagenDataUrlFinal || imagenPreview || null,
    };
    console.log("Guardando reseña:", reseñaAEnviar);
    onGuardar(reseñaAEnviar);
  };

  if (imagen) {
    const reader = new FileReader();
    reader.onloadend = () => {
      finishSaving(reader.result);
    };
    reader.readAsDataURL(imagen);
  } else {
    // No hay imagen nueva, usar la previa o dejar null
    finishSaving(imagenPreview);
  }
};

  return (
    <section>
      <h1 className="mb-3">{reseñaInicial ? 'Editar reseña' : 'Sube tu atención con nuestro equipo'}</h1>
      <Row className="justify-content-center">
        <Col lg={8}>
          <Card className="p-4 shadow-sm">
            <Card.Title className="text-center mb-4">{reseñaInicial ? 'Editar Reseña' : 'Formulario de Reseña'}</Card.Title>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Imagen de tu Mascota</Form.Label>
                <Form.Control type="file" accept="image/*" onChange={(e) => setImagen(e.target.files[0])} />
                {imagenPreview && !imagen && (
                  <div className="mt-2">
                    <small>Imagen actual:</small>
                    <div>
                      <img src={imagenPreview} alt="preview" style={{ maxWidth: '160px', marginTop: 8 }} />
                    </div>
                  </div>
                )}
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
                  <option value="Dr. Carlos Varela">Dr. Carlos Varela</option>
                  <option value="Dra. Laura Ramírez">Dra. Laura Ramírez</option>
                  <option value="Dra. Juana Roman">Dra. Juana Roman</option>
                  <option value="Dra. Mariana Soto">Dra. Mariana Soto</option>
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
                    />
                  ))}
                </div>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Comentarios</Form.Label>
                <Form.Control as="textarea" rows={3} value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />
              </Form.Group>

              <div className="d-flex gap-2">
                <Button variant="primary" type="submit" className="flex-grow-1">
                  {reseñaInicial ? 'Guardar cambios' : 'Subir Reseña'}
                </Button>
                
              </div>
            </Form>
          </Card>
        </Col>
      </Row>
    </section>
  );
}

export default FormularioResena;
