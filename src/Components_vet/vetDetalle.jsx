import React, { useState } from 'react';

const VeterinarioDetalle = ({ vet, onVolver }) => {
    const [fecha, setFecha] = useState('');
    const [hora, setHora] = useState('');

    const handleSubmitCita = (event) => {
        event.preventDefault();

    
        if (!fecha || !hora) {
            alert('Por favor, rellene el día y la hora de la cita.');
            return;
        }

        const selectedDate = new Date(fecha);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

       
        if (selectedDate.getFullYear() !== 2025) {
            alert('El año de la cita debe ser obligatoriamente 2025.');
            return;
        }
        if (selectedDate <= today) {
            alert('Por favor, selecciona una fecha futura.');
            return;
        }

        const [hours, minutes] = hora.split(':').map(Number);
        if (hours < 7 || hours >= 20) {
            alert('El horario de atención es de 7:00 a 20:00.');
            return;
        }

        const existecita = JSON.parse(localStorage.getItem('citas')) || [];
        const reservada = existecita.some(cita =>
            cita.vetId === vet.id &&
            cita.date === fecha &&
            cita.time === hora
        );

        if (reservada) {
            alert('Este horario ya está reservado. Por favor, elige otro.');
            return;
        }

   
        const nuevacita = { vetId: vet.id, date: fecha, time: hora };
        existecita.push(nuevacita);
        localStorage.setItem('citas', JSON.stringify(existecita));

        alert('Cita confirmada');
        setFecha('');
        setHora('');
    };

    return (
        <section id="vet-details-section">
            <button id="back-btn" className="btn btn-secondary mb-4" onClick={onVolver}>
                &larr; Volver a la lista
            </button>

            <div className="row">
                <div className="col-md-5">
                    <img id="vet-details-img" src={vet.imagen} alt={vet.nombre} className="img-fluid rounded shadow-sm" />
                </div>
                <div className="col-md-7">
                    <h2 id="vet-details-name">{vet.nombre}</h2>
                    <h5 id="vet-details-specialty" className="text-muted">{vet.especialidad}</h5>
                    <p id="vet-details-description" className="mt-3">{vet.descripcion}</p>
                    
                    <h4 className="mt-5">Agendar una Cita</h4>
                    <form id="appointment-form" onSubmit={handleSubmitCita}>
                        <div className="mb-3">
                            <label htmlFor="appointmentDate" className="form-label">Fecha</label>
                            <input type="date" className="form-control" id="appointmentDate" value={fecha} onChange={(e) => setFecha(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="appointmentTime" className="form-label">Hora</label>
                            <input type="time" className="form-control" id="appointmentTime" value={hora} onChange={(e) => setHora(e.target.value)} />
                        </div>
                        <button type="submit" className="btn btn-primary">Confirmar Cita</button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default VeterinarioDetalle;