import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminReporte = ({ apiUrl }) => {
  const [reporte, setReporte] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Función para obtener el reporte (Ruta Especial 3)
  useEffect(() => {
    const fetchReporte = async () => {
      try {
        // Petición al endpoint que usa Aggregation Pipeline
        const response = await axios.get(`${apiUrl}/profesores/reportes`);
        setReporte(response.data);
      } catch (err) {
        console.error("Error al cargar el reporte:", err);
        setError('No se pudo cargar el reporte de profesores.');
      } finally {
        setLoading(false);
      }
    };
    fetchReporte();
  }, [apiUrl]);

  if (loading) return <div className="text-center mt-5"><div className="spinner-border text-primary" role="status"></div></div>;
  if (error) return <div className="alert alert-danger mt-5">{error}</div>;

  return (
    <div>
      <h2 className="text-info">📊 Reporte Administrativo de Profesores</h2>
      <p className="lead">Muestra la cantidad total de cursos que imparte cada profesor.</p>
      
      <div className="table-responsive">
        <table className="table table-striped table-hover mt-4 shadow-sm">
          <thead className="table-dark">
            <tr>
              <th>Nombre Completo</th>
              <th>Biografía (Extracto)</th>
              <th>Número Total de Cursos</th>
            </tr>
          </thead>
          <tbody>
            {reporte.map((profesor) => (
              <tr key={profesor._id}>
                <td><strong>{profesor.nombre_completo}</strong></td>
                <td>{profesor.biografia.substring(0, 70)}...</td>
                <td>
                  <span className={`badge bg-${profesor.numero_cursos_impartidos > 0 ? 'success' : 'warning'} fs-6`}>
                    {profesor.numero_cursos_impartidos}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {reporte.length === 0 && (
          <div className="alert alert-info">No hay profesores registrados.</div>
      )}
    </div>
  );
};

export default AdminReporte;