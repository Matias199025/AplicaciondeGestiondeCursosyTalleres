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

Instrucciones de Instalación y Ejecución

Sigue estos pasos para poner a correr la aplicación en tu entorno local.

### 1. Configuración General

1.  Clonar este repositorio.
2.  Abrir dos terminales separadas en VS Code: una para el `backend` y otra para el `frontend`.

### 2. Ejecutar el Backend

1.  **Navegar:** `cd backend`
2.  **Instalar dependencias:** `npm install`
3.  **Configurar `.env`:** Asegúrate de tener el archivo `.env` con la variable `MONGO_URI`.
    ```
    # Ejemplo de .env
    MONGO_URI="mongodb+srv://cursoambox:cursoambox2025@cluster0.qqehml0.mongodb.net/gestionCursosDB?appName=Cluster0"
    PORT=4000
    ```
4.  **Iniciar el servidor:** `npm run dev`
    *El servidor se ejecutará en `http://localhost:4000`.*

### 3. Ejecutar el Frontend (React)

1.  **Navegar:** `cd frontend`
2.  **Instalar dependencias:** `npm install`
    *(Esto incluye React, React Router y Bootstrap).*
3.  **Iniciar la aplicación:** `npm run dev`
    *La aplicación se ejecutará en `http://localhost:5173` (o un puerto similar).*

## Conclusion sobre el Proyecto:
Este proyecto me permitió consolidar el ciclo completo del desarrollo Full Stack. El mayor desafío fue entender la **lógica avanzada** requerida para las rutas especiales:

1.  **Filtros en la API:** Implementar la lógica para que una sola ruta (`/api/cursos`) pudiera manejar múltiples parámetros de búsqueda (tags, precio máximo, ordenamiento) usando `req.query` en Express.
2.  **Referencia e Integridad:** Asegurar que cuando un usuario se inscribe, se valida el cupo y se actualizan dos entidades (`Curso` y `Usuario`) a la vez.
3.  **Aggregations de Mongoose:** Fue complejo pero muy interesante usar la *pipeline de agregación* para obtener el reporte que cuenta los cursos por profesor, demostrando cómo Mongoose puede manejar consultas complejas.

El uso de **Bootstrap** y el patrón **Hooks (`useState`, `useEffect`)** en React me ayudó a construir una interfaz rápida y funcional que consume la API de manera efectiva. ¡Siento que logré integrar todas las piezas del curso!
El proyecto me permitió aprender mucho sobre desarrollo Full Stack. Siento que fue un trabajo complicado pero creo que pude integrar todo lo que aprendi en lo que hicimos en el curso. Por esto le agradezco profe tengo que seguir aprendiendo mucho pero bueno me gusto mucho el curso y espero seguir perfeccionandome GRACIAS!!!.
