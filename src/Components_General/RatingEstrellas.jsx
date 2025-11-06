import React from 'react';

const RatingEstrellas = ({ rating }) => {
    const estrellas = [];
    for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
            estrellas.push(<i key={i} className="bi bi-star-fill text-accent"></i>);
        } else {
            estrellas.push(<i key={i} className="bi bi-star text-secondary"></i>);
        }
    }
    return <div className="rating-stars mb-3">{estrellas}</div>;
};

export default RatingEstrellas;