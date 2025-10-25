import React from 'react';
import RatingEstrellas from '../Components_General/RatingEstrellas';

const VeterinarioCard = ({ vet, onReservarClick }) => {
    return (
        <div className="col">
            <div className="card h-100 shadow-sm">
                <img src={vet.imagen} className="card-img-top" alt={`Veterinario ${vet.nombre}`} />
                <div className="card-body">
                    <h5 className="card-title poppins-font">{vet.nombre}</h5>
                    <p className="card-text text-muted">{vet.especialidad}</p>
                    <p className="card-text open-sans-font">{vet.descripcion}</p>
                    <RatingEstrellas rating={vet.rating} />
                    <span className="ms-2">{vet.rating.toFixed(1)} ({vet.reseñas} reseñas)</span>
                    <button onClick={() => onReservarClick(vet)} className="btn btn-primary mt-6">
                        Reservar cita
                    </button>
                </div>
            </div>
        </div>
    );
};

export default VeterinarioCard;