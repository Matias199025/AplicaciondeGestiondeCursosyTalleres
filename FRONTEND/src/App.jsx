import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import CursoDetalle from './pages/CursoDetalle';
import AdminReporte from './pages/AdminReporte';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importo Bootstrap CSS

function App() {
  // Pongo la URL base del backend para usarla en todos lados
  const API_URL = 'http://localhost:4000/api'; 

  return (
    <BrowserRouter>
      <Navbar />
      <main className="container my-4" style={{ minHeight: '80vh' }}>
        <Routes>
          {/* Ruta principal: Catálogo de cursos */}
          <Route path="/" element={<HomePage apiUrl={API_URL} />} />

          {/* Ruta de detalle: /curso/12345 */}
          <Route path="/curso/:id" element={<CursoDetalle apiUrl={API_URL} />} />

          {/* Ruta del reporte (solo para administradores) */}
          <Route path="/admin/reporte" element={<AdminReporte apiUrl={API_URL} />} />

          {/* Ruta de error 404 (opcional) */}
          <Route path="*" element={<h2>404 - Página No Encontrada</h2>} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;