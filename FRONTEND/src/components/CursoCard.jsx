import React from 'react';
import { Link } from 'react-router-dom';

const CursoCard = ({ curso }) => {
  const precioFormateado = new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
  }).format(curso.precio);

  return (
    <div className="col-md-4 mb-4">
      <div className="card h-100 shadow-sm">
        <div className="card-body d-flex flex-column">
          <h5 className="card-title text-primary">{curso.nombre}</h5>
          <p className="card-text flex-grow-1">
            {curso.descripcion.substring(0, 80)}...
          </p>
          <p className="text-muted small mb-1">
            Profesor: <strong>{curso.profesor.nombre} {curso.profesor.apellido}</strong>
          </p>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <span className="badge bg-info text-dark">
              {curso.duracion_horas} hs
            </span>
            <h4 className="mb-0 text-success">{precioFormateado}</h4>
          </div>
          <p className="card-text">
            Cupo: <span className={`fw-bold ${curso.cupo_disponible > 0 ? 'text-success' : 'text-danger'}`}>
              {curso.cupo_disponible} disponibles
            </span>
          </p>
          <Link to={`/curso/${curso._id}`} className="btn btn-primary mt-auto">
            Ver Detalles
          </Link>
        </div>
        <div className="card-footer bg-light">
          {curso.tags.slice(0, 3).map((tag, index) => (
            <span key={index} className="badge bg-secondary me-1">{tag}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CursoCard;