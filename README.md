# 🛰️ Dashboard de Misiones Espaciales
### Proyecto Final del Máster en Frontend Asistido con IA / Bécalos - Fundación Traxión Tech Challenge 2025

> Desarrollado por JOSE ANGEL ZAVALETA RUIZ🧑🏻‍💻

## 📝 Descripción del Proyecto
El "Dashboard de Misiones Espaciales" es una aplicación web interactiva Full-Stack diseñada para la gestión, monitoreo y registro operativo de misiones espaciales. Este Centro de Control proporciona una interfaz intuitiva donde los usuarios pueden consultar detalles técnicos, y los administradores pueden gestionar la flota mediante un panel analítico con métricas en tiempo real.

El proyecto consolida conocimientos avanzados de ingeniería de software, abarcando desde el diseño de la interfaz de usuario y validación estricta de datos, hasta la gestión de bases de datos con paginación del lado del servidor y la creación de una API RESTful.

## 🛠️ Stack Tecnológico
*   **Frontend:** React, Tailwind CSS, Recharts (Métricas), Zod (Validación de esquemas).
*   **Backend:** Node.js con Express.
*   **Base de Datos:** MongoDB (MongoDB Atlas) con consultas dinámicas y paginación (`$regex`, `skip`, `limit`).
*   **Despliegue y Nube:** Vercel (Cliente) y Render (Servidor).

## 🤝 Acuerdos y Dinámica de Trabajo
Debido a la naturaleza del equipo (desarrollo individual), el proyecto se gestionó utilizando una adaptación de **Scrum para un solo desarrollador (Personal Scrum)** apoyado en un sistema **Kanban**:

1.  **Metodología Ágil:** 
    *   **Sprints:** Iteraciones de 1 semana. Cada Sprint finalizó con un entregable funcional o incremento del producto.
    *   **Gestión de Tareas:** Se utilizó un tablero Kanban con las columnas: *Backlog*, *To Do*, *In Progress*, *Testing*, y *Done*.
2.  **Control de Versiones (Git):**
    *   La rama `main` contiene únicamente código estable y funcional (protegida por rollbacks).
    *   Se utilizó estrictamente el flujo de trabajo de *Feature Branches* (ej. `feature/filtros-estado`, `feature/paginacion-dinamica`).
    *   Los commits siguen la convención de *Conventional Commits* (ej. `feat: añade conexión a base de datos`, `fix: corrige error de visualización`).
3.  **Comunicación Técnica:**
    *   Resolución ágil de bloqueos técnicos para evitar retrasos en el cronograma, manteniendo la estabilidad del servidor y del cliente.

## 📁 Estructura del Proyecto
```text
space-missions-dashboard/
├── backend/       # Lógica del servidor, controladores, API REST y conexión a BD
├── frontend/      # Código de la interfaz de usuario (Componentes, Hooks personalizados)
├── docs/          # Documentación adicional, diagramas y recursos
├── README.md      # Descripción del proyecto y acuerdos
└── .gitignore     # Archivos y directorios ignorados por Git