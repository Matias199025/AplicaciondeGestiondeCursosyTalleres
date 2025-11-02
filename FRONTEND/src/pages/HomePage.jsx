import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import CursoCard from '../components/CursoCard';
import 'bootstrap/dist/css/bootstrap.min.css';

const HomePage = ({ apiUrl }) => {
  // 1. Declaro de Estados 
  const [cursos, setCursos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tags, setTags] = useState('');
  const [precioMax, setPrecioMax] = useState('');
  const [ordenarPor, setOrdenarPor] = useState('');

  // 2. Función de Limpieza de Filtros 
  const limpiarFiltros = () => {
    setTags('');
    setPrecioMax('');
    setOrdenarPor('');
  };

  // 3. Función para traer Cursos
  const fetchCursos = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // Construye los parámetros de la URL para la Búsqueda Avanzada
      const params = new URLSearchParams();
      if (tags) params.append('tags', tags);
      if (precioMax) params.append('precio_max', precioMax);
      if (ordenarPor) params.append('ordenar_por', ordenarPor);

      const url = `${apiUrl}/cursos?${params.toString()}`;

      const response = await axios.get(url);
      setCursos(response.data);
    } catch (err) {
      console.error("Error al cargar cursos:", err);
      setError('Hubo un error al cargar el catálogo de cursos.');
    } finally {
      setLoading(false);
    }
  }, [apiUrl, tags, precioMax, ordenarPor]); 

  useEffect(() => {
    fetchCursos();
  }, [fetchCursos]); 


  if (loading) return (
    <div className="text-center mt-5">
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Cargando...</span>
      </div>
    </div>
  );
  
  if (error) return <div className="alert alert-danger mt-5">{error}</div>;

  return (
    <div className="row">
      <h2>Catálogo de Cursos Disponibles</h2>
      <p className="lead">Explora los talleres y cursos que te ayudarán a crecer profesionalmente.</p>
      
      {/* Sección de Filtros (Ruta Especial 1) */}
      <div className="col-12 mb-4 p-3 bg-light rounded shadow-sm">
        <h5 className="mb-3 text-secondary">Filtros y Búsqueda Avanzada</h5>
        <div className="row g-3">
          {/* Input Tags */}
          <div className="col-md-4">
            <label className="form-label">Tags (ej: javascript,backend)</label>
            <input 
              type="text" 
              className="form-control" 
              value={tags} 
              onChange={(e) => setTags(e.target.value)} 
              placeholder="Filtra por tecnologías"
            />
          </div>
          {/* Input Precio Máx */}
          <div className="col-md-3">
            <label className="form-label">Precio Máx ($)</label>
            <input 
              type="number" 
              className="form-control" 
              value={precioMax} 
              onChange={(e) => setPrecioMax(e.target.value)} 
              placeholder="Precio hasta..."
            />
          </div>
          {/* Select Ordenar por */}
          <div className="col-md-3">
            <label className="form-label">Ordenar por</label>
            <select 
              className="form-select" 
              value={ordenarPor} 
              onChange={(e) => setOrdenarPor(e.target.value)}
            >
              <option value="">Por defecto (más nuevo)</option>
              <option value="precio_asc">Precio (Menor a Mayor)</option>
              <option value="precio_desc">Precio (Mayor a Menor)</option>
              <option value="duracion_desc">Duración (Mayor a Menor)</option>
            </select>
          </div>
          {/* Botón Limpiar Filtros */}
          <div className="col-md-2 d-flex align-items-end">
            <button 
                className="btn btn-outline-secondary w-100" 
                onClick={limpiarFiltros} // ¡Aquí usamos limpiarFiltros!
            >
                Limpiar
            </button>
          </div>
        </div>
      </div>
      {/* Fin Sección de Filtros */}

      {/* Listado de Cursos */}
      <div className="row">
        {cursos.length > 0 ? ( // ¡Aquí usamos la variable cursos!
          cursos.map((curso) => (
            <CursoCard key={curso._id} curso={curso} />
          ))
        ) : (
          <div className="col-12"><p className="alert alert-warning">No se encontraron cursos con los filtros aplicados.</p></div>
        )}
      </div>
    </div>
  );
};

export default HomePage;