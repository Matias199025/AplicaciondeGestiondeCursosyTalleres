import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const CursoDetalle = ({ apiUrl }) => {
  const { id } = useParams(); // Hook para obtener el ID de la URL
  const [curso, setCurso] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mensajeInscripcion, setMensajeInscripcion] = useState('');

  // HARDCODE: ID de usuario para probar la inscripción (Reemplazar en una app real)
  const USUARIO_ID_PRUEBA = 'tu_id_de_usuario_de_prueba_mongodb'; // DEBES PONER UN ID VÁLIDO DE UN USUARIO EXISTENTE

  // Función para obtener los detalles del curso
  useEffect(() => {
    const fetchCurso = async () => {
      try {
        const response = await axios.get(`${apiUrl}/cursos/${id}`);
        setCurso(response.data);
      } catch (err) {
        console.error("Error al cargar detalle del curso:", err);
        setError('Curso no encontrado o error de conexión.');
      } finally {
        setLoading(false);
      }
    };
    fetchCurso();
  }, [apiUrl, id]);

  // Lógica de la Ruta Especial 2: Inscripción
  const handleInscripcion = async () => {
    if (!USUARIO_ID_PRUEBA.length > 10) {
        alert("🚨 ¡ATENCIÓN! Debes cambiar 'USUARIO_ID_PRUEBA' en CursoDetalle.jsx por un ID de Usuario válido para probar la inscripción.");
        return;
    }
    
    setMensajeInscripcion('Procesando inscripción...');

    try {
      // Hacemos la petición POST a la ruta de inscripción
      const response = await axios.post(`${apiUrl}/cursos/${id}/inscribirse`, {
        usuarioId: USUARIO_ID_PRUEBA,
      });

      setMensajeInscripcion(`✅ ${response.data.msg}`);
      // Si la inscripción fue exitosa, actualizamos el cupo localmente (o volvemos a cargar)
      setCurso(prev => ({
          ...prev, 
          cupo_disponible: prev.cupo_disponible - 1
      }));
    } catch (err) {
      // El backend nos devuelve errores 400 (cupo, ya inscrito, etc.)
      setMensajeInscripcion(`❌ Error: ${err.response?.data?.msg || 'Error desconocido en la inscripción.'}`);
    }
  };

  if (loading) return <div className="text-center mt-5"><div className="spinner-border text-primary" role="status"></div></div>;
  if (error) return <div className="alert alert-danger mt-5">{error}</div>;
  if (!curso) return null;

  const cupoDisponible = curso.cupo_disponible > 0;

  return (
    <div className="row justify-content-center">
      <div className="col-lg-8">
        <div className="card shadow-lg p-4">
          <h1 className="text-primary mb-3">{curso.nombre}</h1>
          <hr />
          
          <p className="lead">{curso.descripcion}</p>

          <div className="row my-4">
            <div className="col-md-6">
              <p className="mb-1"><strong>💰 Precio:</strong> <span className="text-success fw-bold">${curso.precio}</span></p>
              <p className="mb-1"><strong>⏱ Duración:</strong> {curso.duracion_horas} horas</p>
              <p className="mb-1"><strong>🏷 Tags:</strong> {curso.tags.map(t => <span key={t} className="badge bg-secondary me-1">{t}</span>)}</p>
            </div>
            <div className="col-md-6">
              <p className="mb-1"><strong>👤 Profesor:</strong> {curso.profesor.nombre} {curso.profesor.apellido}</p>
              <p className="mb-1"><strong>✍️ Biografía Prof.:</strong> {curso.profesor.biografia.substring(0, 50)}...</p>
              <p className="mb-1"><strong>🎯 Cupo Disponible:</strong> 
                <span className={`fw-bold ${cupoDisponible ? 'text-success' : 'text-danger'}`}>
                  {curso.cupo_disponible}
                </span>
              </p>
            </div>
          </div>

          <hr />
          {mensajeInscripcion && (
            <div className={`alert ${mensajeInscripcion.startsWith('✅') ? 'alert-success' : 'alert-danger'}`}>
              {mensajeInscripcion}
            </div>
          )}

          <button
            className="btn btn-lg btn-success"
            onClick={handleInscripcion}
            disabled={!cupoDisponible} // El botón se deshabilita si no hay cupo
          >
            {cupoDisponible ? 'Inscribirme Ahora' : 'Cupo Completo'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CursoDetalle;