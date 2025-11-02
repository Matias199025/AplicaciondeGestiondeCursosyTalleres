 # 🎓 Proyecto Final: Aplicacion y Gestion de Cursos y Talleres 

 Este proyecto es mi Trabajo Práctico Integrador Final del curso. El objetivo fue crear una aplicación completa para gestionar cursos y talleres, demostrando la integración de tecnologías **Full Stack** (MERN: MongoDB, Express, React, Node.js).

Se construyó una aplicación con un Backend (API REST) y un Frontend (React) que consume esa API para mostrar información en tiempo real.

---

## 🏗️ Arquitectura del Proyecto

El proyecto está dividido en dos partes principales, el **`backend`** (el servidor y la base de datos) y el **`frontend`** (la interfaz de usuario en React).

### 1. Backend (Node.js/Express)

Implementé el patrón de diseño **MVC** (Modelo-Vista-Controlador) para organizar el código.

* **Modelos (`models/`):** Definen la estructura de los datos en MongoDB (Esquemas Mongoose).
    * `Curso`: Contiene la información del curso y tiene una relación con `Profesor`.
    * `Profesor`: Datos del instructor.
    * `Usuario`: Datos del estudiante y los cursos en los que está inscrito.
* **Controladores (`controllers/`):** Contienen la lógica, es decir, qué sucede cuando se recibe una solicitud (ej. crear un curso, inscribir a un usuario, generar reportes).
* **Rutas (`routes/`):** Definen los *endpoints* de la API y dirigen las peticiones a los controladores correctos.

### 2. Base de Datos

* **Tecnología:** MongoDB (alojada en MongoDB Atlas).
* **Conexión:** Gestionada por Mongoose. La URL de conexión se guarda de forma segura en el archivo `.env`.

---

## 📡 Rutas de la API (Endpoints)

Método: `GET`
Ruta: `/api/cursos` 
Descripción: Obtener todos los cursos.                                                                 Notas Especiales:**Ruta Especial 1:** Permite filtros avanzados por `tags`,`precio_max` y ordenamiento. 
Método: `POST` 
Ruta:`/api/cursos`  
Descripción: Crear un nuevo curso.                                                                Método:`GET`                                                                                               Ruta:`/api/cursos/:id`
Descripción: Obtener un curso específico.
Método:`POST` 
Ruta:`/api/cursos/:id/inscribirse`                                                           Descripción:Inscribir a un usuario en un curso.                                                          Notas Especiales: **Ruta Especial 2:** Valida que el `cupo_disponible` sea mayor a 0 y lo decrementa si tiene éxito.
Método: `POST` 
Ruta: `/api/profesores`
Descripción: Crear un nuevo profesor.
Método: `GET`
Ruta: `/api/profesores`
Descripción: Obtener todos los profesores.
Método: `GET`
Ruta: `/api/profesores/reportes`
Descripción: Reporte de cursos por profesor.
Notas Especiales: **Ruta Especial 3:** Utiliza la **Aggregation Pipeline de Mongoose** para contar cuántos cursos imparte cada profesor.
Método: `POST`
Ruta: `/api/usuarios`
Descripción: Crear un nuevo usuario.
Método: `GET`
Ruta: `/api/usuarios`
Descripción: Obtener todos los usuarios.


## Conclusion sobre el Proyecto:

Este proyecto me permitió consolidar el ciclo completo del desarrollo Full Stack. Siento que fue un trabajo complicado pero creo que pude integrar todo lo que aprendi en lo hicimos en el curso. Por esto le agradezco profe tengo que seguir aprendiendo mucho pero bueno me gusto mucho el curso y espero seguir perfeccionandome GRACIAS!!!.