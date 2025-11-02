import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Footer = () => {
  return (
    <footer className="bg-dark text-white mt-auto py-3">
      <div className="container">
        <div className="row">
          <div className="col-12 text-center">
            <p className="mb-1">
              &copy; {new Date().getFullYear()} 
            </p>
            <p className="small text-muted">
              Desarrollado con React, Node.js, Express y MongoDB (MERN Stack).
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;