# 🛰️ Dashboard de Misiones Espaciales

## 📝 Descripción del Proyecto
El "Dashboard de Misiones Espaciales" es una aplicación web interactiva diseñada para visualizar, filtrar y explorar datos de misiones espaciales históricas y activas. El objetivo principal es proporcionar una interfaz intuitiva donde los usuarios puedan consultar detalles técnicos, fechas de lanzamiento, tripulación y estado de diversas misiones.

Este proyecto servirá para consolidar los conocimientos de desarrollo web full-stack, abarcando desde el diseño de la interfaz de usuario hasta la gestión de bases de datos y la creación de una API RESTful.

## 🛠️ Stack Tecnológico Propuesto
*   **Frontend:** React / HTML, CSS y JavaScript
*   **Backend:** Node.js con Express
*   **Base de Datos:** MongoDB (MongoDB Atlas)
*   **Despliegue y Nube:** Vercel

## 🤝 Acuerdos y Dinámica de Trabajo
Debido a la naturaleza del equipo (desarrollo individual), el proyecto se gestionará utilizando una adaptación de **Scrum para un solo desarrollador (Personal Scrum)** apoyado en un sistema **Kanban**:

1.  **Metodología Ágil:** 
    *   **Sprints:** Iteraciones de 1 semana. Cada Sprint finalizará con un entregable funcional o incremento del producto.
    *   **Gestión de Tareas:** Se utilizará un tablero Kanban (GitHub Projects) con las columnas: *Backlog*, *To Do*, *In Progress*, *Testing*, y *Done*.
2.  **Control de Versiones (Git):**
    *   La rama `main` contendrá únicamente código estable y funcional.
    *   Se utilizará el flujo de trabajo de *Feature Branches* (ej. `feature/crear-api`, `feature/diseño-dashboard`).
    *   Los commits seguirán la convención de *Conventional Commits* (ej. `feat: añade conexión a base de datos`, `fix: corrige error de visualización`).
3.  **Comunicación con el Sensei:**
    *   Se presentarán avances semanales para recibir retroalimentación.
    *   Cualquier bloqueo técnico que supere las 24 horas de investigación será consultado directamente para evitar retrasos en el cronograma.

## 📁 Estructura del Proyecto
```text
space-missions-dashboard/
├── backend/       # Lógica del servidor, API REST y conexión a BD
├── frontend/      # Código de la interfaz de usuario (SPA)
├── docs/          # Documentación adicional, diagramas y recursos
├── README.md      # Descripción del proyecto y acuerdos
└── .gitignore     # Archivos y directorios ignorados por Git