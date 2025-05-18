const sidebarData = {
  usuario: {
    nombre: document.body.dataset.username || "Profesor Ejemplo",
    iniciales: "PE", // Metodo para obtener inicales del Nombre (Pendiente de implementacion)
    rol: "| Profesor |",
  },
  secciones: [
    {
      titulo: "Principal",
      items: [
        {
          id: "dashboard",
          texto: "Dashboard",
          icono: "📊",
          activo: true,
          notificaciones: 0,
        },
        {
          id: "cursos",
          texto: "Mis Cursos",
          icono: "📚",
          activo: false,
          notificaciones: 3,
        },
        {
          id: "calendario",
          texto: "Calendario",
          icono: "📅",
          activo: false,
          notificaciones: 0,
        },
        {
          id: "mensajes",
          texto: "Mensajes",
          icono: "✉️",
          activo: false,
          notificaciones: 5,
        },
      ],
    },
    {
      titulo: "Académico",
      items: [
        {
          id: "asistencia",
          texto: "Control de Asistencia",
          icono: "✓",
          activo: false,
          notificaciones: 0,
        },
        {
          id: "calificaciones",
          texto: "Calificaciones",
          icono: "🎯",
          activo: false,
          notificaciones: 2,
        },
        {
          id: "tareas",
          texto: "Tareas y Trabajos",
          icono: "📝",
          activo: false,
          notificaciones: 0,
        },
        {
          id: "examenes",
          texto: "Exámenes",
          icono: "📄",
          activo: false,
          notificaciones: 0,
        },
      ],
    },
    {
      titulo: "Recursos",
      items: [
        {
          id: "materiales",
          texto: "Materiales Didácticos",
          icono: "📁",
          activo: false,
          notificaciones: 0,
        },
        {
          id: "biblioteca",
          texto: "Biblioteca Digital",
          icono: "🔍",
          activo: false,
          notificaciones: 0,
        },
        {
          id: "herramientas",
          texto: "Herramientas",
          icono: "🛠️",
          activo: false,
          notificaciones: 0,
        },
      ],
    },
    {
      titulo: "Configuración",
      items: [
        {
          id: "perfil",
          texto: "Mi Perfil",
          icono: "👤",
          activo: false,
          notificaciones: 0,
        },
        {
          id: "ajustes",
          texto: "Ajustes",
          icono: "⚙️",
          activo: false,
          notificaciones: 0,
        },
        {
          id: "ayuda",
          texto: "Ayuda",
          icono: "❓",
          activo: false,
          notificaciones: 0,
        },
        {
          id: "salir",
          texto: "Cerrar Sesión",
          icono: "🚪",
          activo: false,
          notificaciones: 0,
        },
      ],
    },
  ],
};

async function cargarCursosDesdeAPI(profesorId) {
  const response = await fetch(`/api/cursos/profesor/${profesorId}`);
  console.log(document.body.dataset.userid);
  if (!response.ok) throw new Error("Error al cargar cursos");
  return await response.json();
}

async function cargarInfoProfesor() {
  const response = await fetch("/api/profesor/info");
  if (!response.ok)
    throw new Error("No se pudo cargar la información del profesor");
  return await response.json();
}

function generarSidebar() {
  const sidebar = document.getElementById("sidebar");
  let sidebarHTML = "";

  // Perfil de usuario
  sidebarHTML += `
        <div class="user-profile">
          <div class="user-avatar">${sidebarData.usuario.iniciales}</div>
          <div class="user-info">
            <h3 class="user-name">${sidebarData.usuario.nombre}</h3>
            <p class="user-role">${sidebarData.usuario.rol}</p>
          </div>
        </div>
      `;

  // Secciones de navegación
  for (const seccion of sidebarData.secciones) {
    sidebarHTML += `
          <div class="nav-section">
            <h3 class="nav-section-title">${seccion.titulo}</h3>
            <ul class="nav-list">
        `;

    for (const item of seccion.items) {
      sidebarHTML += `
            <li class="nav-item">
              <a href="#${item.id}" class="nav-link ${
        item.activo ? "active" : ""
      }">
                <span class="nav-icon">${item.icono}</span>
                <span class="nav-text">${item.texto}</span>
                ${
                  item.notificaciones > 0
                    ? `<span class="notification-badge">${item.notificaciones}</span>`
                    : ""
                }
              </a>
              <div class="tooltip">${item.texto}</div>
            </li>
          `;
    }

    sidebarHTML += `
            </ul>
          </div>
        `;
  }

  // Footer
  sidebarHTML += `
        <div class="sidebar-footer">
          <p class="footer-text">© ${new Date().getFullYear()} Universidad De Medellín</p>
        </div>
      `;

  sidebar.innerHTML = sidebarHTML;
}

// Función para manejar el toggle del sidebar
function configurarSidebarToggle() {
  const sidebar = document.getElementById("sidebar");
  const toggleBtn = document.getElementById("sidebarToggle");
  const mainContent = document.getElementById("mainContent");

  toggleBtn.addEventListener("click", () => {
    sidebar.classList.toggle("collapsed");
  });

  // Calculos Responsivos
  function checkMobile() {
    if (window.innerWidth <= 768) {
      sidebar.classList.add("collapsed");
    } else {
      sidebar.classList.remove("collapsed");
    }
  }

  window.addEventListener("resize", checkMobile);
  checkMobile();
}

function configurarNavegacion() {
  const navLinks = document.querySelectorAll(".nav-link");

  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      navLinks.forEach((l) => l.classList.remove("active"));

      link.classList.add("active");

      const id = link.getAttribute("href").substring(1);
      cargarContenido(id);

      if (window.innerWidth <= 768) {
        document.getElementById("sidebar").classList.add("collapsed");
      }

      e.preventDefault();
    });
  });
}

const dashboardData = {
  actividades: [
    {
      icono: "📝",
      titulo: "Calificación de exámenes",
      tiempo: "Hoy, 14:00",
      estado: "pending",
      etiquetaEstado: "Pendiente",
    },
    {
      icono: "👥",
      titulo: "Reunión departamental",
      tiempo: "Hoy, 15:00",
      estado: "urgent",
      etiquetaEstado: "Urgente",
    },
    {
      icono: "📊",
      titulo: "Entrega de notas finales",
      tiempo: "Mañana, 12:00",
      estado: "pending",
      etiquetaEstado: "Pendiente",
    },
    {
      icono: "✅",
      titulo: "Revisión de proyectos",
      tiempo: "Ayer, 16:30",
      estado: "completed",
      etiquetaEstado: "Completado",
    },
  ],
  proximasClases: [
    { nombre: "Matemáticas Avanzadas", hora: "10:00 - 11:30", aula: "A-201" },
    { nombre: "Estadística", hora: "13:30 - 15:00", aula: "B-105" },
    { nombre: "Tutoría", hora: "16:00 - 17:00", aula: "Sala de Profesores" },
  ],
  calendario: {
    mes: "Noviembre 2023",
    diasSemana: ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"],
    dias: [
      { dia: 29, esOtroMes: true, tieneEvento: false, esCorriente: false },
      { dia: 30, esOtroMes: true, tieneEvento: false, esCorriente: false },
      { dia: 31, esOtroMes: true, tieneEvento: false, esCorriente: false },
      { dia: 1, esOtroMes: false, tieneEvento: false, esCorriente: false },
      { dia: 2, esOtroMes: false, tieneEvento: true, esCorriente: false },
      { dia: 3, esOtroMes: false, tieneEvento: false, esCorriente: false },
      { dia: 4, esOtroMes: false, tieneEvento: false, esCorriente: false },
      { dia: 5, esOtroMes: false, tieneEvento: false, esCorriente: false },
      { dia: 6, esOtroMes: false, tieneEvento: false, esCorriente: false },
      { dia: 7, esOtroMes: false, tieneEvento: true, esCorriente: false },
      { dia: 8, esOtroMes: false, tieneEvento: false, esCorriente: false },
      { dia: 9, esOtroMes: false, tieneEvento: false, esCorriente: false },
      { dia: 10, esOtroMes: false, tieneEvento: true, esCorriente: false },
      { dia: 11, esOtroMes: false, tieneEvento: false, esCorriente: false },
      { dia: 12, esOtroMes: false, tieneEvento: false, esCorriente: false },
      { dia: 13, esOtroMes: false, tieneEvento: false, esCorriente: false },
      { dia: 14, esOtroMes: false, tieneEvento: false, esCorriente: false },
      { dia: 15, esOtroMes: false, tieneEvento: true, esCorriente: true },
      { dia: 16, esOtroMes: false, tieneEvento: false, esCorriente: false },
      { dia: 17, esOtroMes: false, tieneEvento: false, esCorriente: false },
      { dia: 18, esOtroMes: false, tieneEvento: false, esCorriente: false },
      { dia: 19, esOtroMes: false, tieneEvento: false, esCorriente: false },
      { dia: 20, esOtroMes: false, tieneEvento: true, esCorriente: false },
      { dia: 21, esOtroMes: false, tieneEvento: false, esCorriente: false },
      { dia: 22, esOtroMes: false, tieneEvento: false, esCorriente: false },
      { dia: 23, esOtroMes: false, tieneEvento: false, esCorriente: false },
      { dia: 24, esOtroMes: false, tieneEvento: false, esCorriente: false },
      { dia: 25, esOtroMes: false, tieneEvento: true, esCorriente: false },
      { dia: 26, esOtroMes: false, tieneEvento: false, esCorriente: false },
      { dia: 27, esOtroMes: false, tieneEvento: false, esCorriente: false },
      { dia: 28, esOtroMes: false, tieneEvento: false, esCorriente: false },
      { dia: 29, esOtroMes: false, tieneEvento: false, esCorriente: false },
      { dia: 30, esOtroMes: false, tieneEvento: false, esCorriente: false },
      { dia: 1, esOtroMes: true, tieneEvento: false, esCorriente: false },
      { dia: 2, esOtroMes: true, tieneEvento: false, esCorriente: false },
    ],
  },
};

function generarDashboard() {
  return `
    <div class="dashboard-container">
      <!-- Tarjeta de Estadísticas -->
      <div class="dashboard-card">
        <h3><span class="card-icon">📊</span> Estadísticas Generales</h3>
        <div class="stat-grid">
          ${dashboardData.estadisticas
            .map(
              (stat) => `
            <div class="stat-item">
              <p class="stat-value">${stat.valor}</p>
              <p class="stat-label">${stat.etiqueta}</p>
            </div>
          `
            )
            .join("")}
        </div>
      </div>
      <!-- Tarjeta de Actividades -->
      <div class="dashboard-card">
        <h3><span class="card-icon">📋</span> Actividades Recientes</h3>
        <ul class="activity-list">
          ${dashboardData.actividades
            .map(
              (actividad) => `
            <li class="activity-item">
              <div class="activity-icon">${actividad.icono}</div>
              <div class="activity-content">
                <p class="activity-title">${actividad.titulo}</p>
                <p class="activity-time">${actividad.tiempo}</p>
              </div>
              <span class="activity-status status-${actividad.estado}">${actividad.etiquetaEstado}</span>
            </li>
          `
            )
            .join("")}
        </ul>
      </div>
      <!-- Tarjeta de Progreso de Cursos -->
      <div class="dashboard-card">
        <h3><span class="card-icon">📚</span> Progreso de Cursos</h3>
        ${dashboardData.cursos
          .map(
            (curso) => `
          <div style="margin-bottom: 15px;">
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <span>${curso.nombre}</span>
              <span>${curso.progreso}%</span>
            </div>
            <div class="progress-bar">
              <div class="progress-fill" style="width: ${curso.progreso}%; background-color: ${curso.color};"></div>
            </div>
            <small style="color: #b0b0b0;">${curso.codigo}</small>
          </div>
        `
          )
          .join("")}
      </div>
      <!-- Tarjeta de Próximas Clases -->
      <div class="dashboard-card">
        <h3><span class="card-icon">🕒</span> Próximas Clases</h3>
        <ul class="activity-list">
          ${dashboardData.proximasClases
            .map(
              (clase) => `
            <li class="activity-item">
              <div class="activity-icon">📖</div>
              <div class="activity-content">
                <p class="activity-title">${clase.nombre}</p>
                <p class="activity-time">${clase.hora} | ${clase.aula}</p>
              </div>
            </li>
          `
            )
            .join("")}
        </ul>
      </div>
      <!-- Tarjeta de Calendario -->
      <div class="dashboard-card">
        <h3><span class="card-icon">📅</span> Calendario</h3>
        <p style="text-align: center; margin: 0 0 10px 0; font-weight: 500;">${
          dashboardData.calendario.mes
        }</p>
        <div class="calendar-grid">
          ${dashboardData.calendario.diasSemana
            .map(
              (dia) => `
            <div class="calendar-header">${dia}</div>
          `
            )
            .join("")}
          ${dashboardData.calendario.dias
            .map(
              (dia) => `
            <div class="calendar-day ${dia.esCorriente ? "current" : ""} ${
                dia.tieneEvento ? "has-event" : ""
              } ${dia.esOtroMes ? "other-month" : ""}">${dia.dia}</div>
          `
            )
            .join("")}
        </div>
      </div>
      <!-- Tarjeta de Mensajes Recientes -->
      <div class="dashboard-card">
        <h3><span class="card-icon">✉️</span> Mensajes Recientes <span class="notification-dot"></span></h3>
        <ul class="activity-list">
          <li class="activity-item">
            <div class="activity-icon" style="background: rgba(131, 56, 236, 0.15);">👨‍🎓</div>
            <div class="activity-content">
              <p class="activity-title">Carlos Pérez</p>
              <p class="activity-time">Consulta sobre el examen final</p>
            </div>
            <span style="font-size: 11px; color: #b0b0b0;">10:30</span>
          </li>
          <li class="activity-item">
            <div class="activity-icon" style="background: rgba(131, 56, 236, 0.15);">👩‍🎓</div>
            <div class="activity-content">
              <p class="activity-title">Ana García</p>
              <p class="activity-time">Entrega de proyecto</p>
            </div>
            <span style="font-size: 11px; color: #b0b0b0;">Ayer</span>
          </li>
          <li class="activity-item">
            <div class="activity-icon" style="background: rgba(131, 56, 236, 0.15);">👨‍💼</div>
            <div class="activity-content">
              <p class="activity-title">Director Académico</p>
              <p class="activity-time">Reunión departamental</p>
            </div>
            <span style="font-size: 11px; color: #b0b0b0;">Ayer</span>
          </li>
        </ul>
      </div>
    </div>
    <div class="dashboard-footer">
      <div class="dashboard-actions">
        <button class="dashboard-btn"><span class="btn-icon">📊</span> Exportar Reporte</button>
        <button class="dashboard-btn"><span class="btn-icon">🔄</span> Actualizar</button>
      </div>
      <p style="font-size: 12px; color: #b0b0b0;">Última actualización: Hoy, 12:45</p>
    </div>
  `;
}

function inicializarDashboard() {
  setTimeout(() => {
    document.querySelectorAll(".progress-fill").forEach((bar) => {
      const width = bar.style.width;
      bar.style.width = "0";
      setTimeout(() => {
        bar.style.width = width;
      }, 300);
    });
    document.querySelectorAll(".calendar-day").forEach((day) => {
      day.addEventListener("click", () => {
        document
          .querySelectorAll(".calendar-day")
          .forEach((d) => d.classList.remove("current"));
        day.classList.add("current");
        if (day.classList.contains("has-event")) {
          alert(
            `Eventos para el día ${day.textContent}:\n- Reunión académica\n- Entrega de calificaciones`
          );
        }
      });
    });
    // Botones dashboard ("Pendiente API para la generacion")
    document.querySelectorAll(".dashboard-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const action = e.currentTarget.textContent.includes("Exportar")
          ? "exportar"
          : "actualizar";
        if (action === "exportar") {
          alert(
            "Generando reporte PDF. El archivo estará disponible en breve."
          );
        } else {
          alert("Actualizando datos del dashboard...");
          setTimeout(() => {
            alert("¡Datos actualizados correctamente!");
          }, 1000);
        }
      });
    });
  }, 500);
}

async function cargarContenido(id) {
  const mainContent = document.getElementById("mainContent");

  if (id === "cursos") {
    await cargarContenidoCursos();
    return;
  }

  if (id === "dashboard") {
    const profesorId = document.body.dataset.userid;
    // 1. Cargar estadísticas reales
    let estadisticas = [
      { valor: 0, etiqueta: "Cursos Activos" },
      { valor: 0, etiqueta: "Estudiantes" },
      { valor: 0, etiqueta: "Pendientes" },
      { valor: 0, etiqueta: "% Asistencia" },
    ];
    if (profesorId) {
      try {
        const stats = await cargarEstadisticasDashboard(profesorId);
        estadisticas = [
          { valor: stats.activecourses || 0, etiqueta: "Cursos Activos" },
          { valor: stats.totalstudents || 0, etiqueta: "Estudiantes" },
          { valor: 0, etiqueta: "Pendientes" },
          {
            valor: stats.attendancepercentage
              ? Math.round(stats.attendancepercentage)
              : 0,
            etiqueta: "% Asistencia",
          },
        ];
      } catch (e) {
        // Si falla, deja los valores en 0
      }
    }
    dashboardData.estadisticas = estadisticas;

    // 2. Cargar cursos para la tarjeta de progreso
    if (profesorId) {
      const cursos = await cargarCursosDesdeAPI(profesorId);
      if (cursos.length > 0) {
        dashboardData.cursos = cursos.map((c) => ({
          nombre: c.title,
          codigo: c.code,
          progreso: c.progreso || 0,
          color: "#3a86ff",
        }));
      } else {
        dashboardData.cursos = [];
      }
    }

    mainContent.innerHTML = `
      <div class="glass-effect">
        <h1>Dashboard Docente</h1>
        <p>Bienvenido al panel de control. Aquí puede ver un resumen de su actividad académica.</p>
        ${generarDashboard()}
      </div>
    `;
    inicializarDashboard();
    return;
  }

  if (id === "calendario") {
    const profesorId = document.body.dataset.userid;
    let eventos = [];
    if (profesorId) {
      try {
        eventos = await cargarEventosUsuario(profesorId);
      } catch (e) {
        eventos = [];
      }
    }
    let eventosHTML = `
      <div class="glass-effect">
        <h1>Calendario de Eventos</h1>
        <ul>
          ${eventos.map(ev => `
            <li>
              <strong>${ev.title}</strong> (${ev.event_type})<br>
              Curso: ${ev.course_title} (${ev.course_code})<br>
              Fecha: ${new Date(ev.due_date).toLocaleString()}<br>
              Descripción: ${ev.description}
            </li>
          `).join('')}
        </ul>
      </div>
    `;
    mainContent.innerHTML = eventosHTML;
    return;
  }
  const contenidos = {
    cursos: "",
    calificaciones: `
      <div class="glass-effect">
        <h1>Calificaciones</h1>
        <p>Gestione las calificaciones de sus estudiantes por curso.</p>
        <div style="overflow-x: auto; margin-top: 20px;">
          <table style="width: 100%; border-collapse: collapse; min-width: 600px;">
            <thead>
              <tr style="background: rgba(255,255,255,0.1);">
                <th style="padding: 12px; text-align: left; border-bottom: 1px solid rgba(255,255,255,0.1);">Estudiante</th>
                <th style="padding: 12px; text-align: center; border-bottom: 1px solid rgba(255,255,255,0.1);">Parcial 1</th>
                <th style="padding: 12px; text-align: center; border-bottom: 1px solid rgba(255,255,255,0.1);">Parcial 2</th>
                <th style="padding: 12px; text-align: center; border-bottom: 1px solid rgba(255,255,255,0.1);">Proyecto</th>
                <th style="padding: 12px; text-align: center; border-bottom: 1px solid rgba(255,255,255,0.1);">Final</th>
                <th style="padding: 12px; text-align: center; border-bottom: 1px solid rgba(255,255,255,0.1);">Promedio</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style="padding: 12px; border-bottom: 1px solid rgba(255,255,255,0.05);">Ana García</td>
                <td style="padding: 12px; text-align: center; border-bottom: 1px solid rgba(255,255,255,0.05);">85</td>
                <td style="padding: 12px; text-align: center; border-bottom: 1px solid rgba(255,255,255,0.05);">90</td>
                <td style="padding: 12px; text-align: center; border-bottom: 1px solid rgba(255,255,255,0.05);">95</td>
                <td style="padding: 12px; text-align: center; border-bottom: 1px solid rgba(255,255,255,0.05);">88</td>
                <td style="padding: 12px; text-align: center; border-bottom: 1px solid rgba(255,255,255,0.05); color: var(--primary-color); font-weight: bold;">89.5</td>
              </tr>
              <tr>
                <td style="padding: 12px; border-bottom: 1px solid rgba(255,255,255,0.05);">Carlos Pérez</td>
                <td style="padding: 12px; text-align: center; border-bottom: 1px solid rgba(255,255,255,0.05);">78</td>
                <td style="padding: 12px; text-align: center; border-bottom: 1px solid rgba(255,255,255,0.05);">82</td>
                <td style="padding: 12px; text-align: center; border-bottom: 1px solid rgba(255,255,255,0.05);">80</td>
                <td style="padding: 12px; text-align: center; border-bottom: 1px solid rgba(255,255,255,0.05);">85</td>
                <td style="padding: 12px; text-align: center; border-bottom: 1px solid rgba(255,255,255,0.05); color: var(--primary-color); font-weight: bold;">81.3</td>
              </tr>
              <tr>
                <td style="padding: 12px; border-bottom: 1px solid rgba(255,255,255,0.05);">Laura Martínez</td>
                <td style="padding: 12px; text-align: center; border-bottom: 1px solid rgba(255,255,255,0.05);">92</td>
                <td style="padding: 12px; text-align: center; border-bottom: 1px solid rgba(255,255,255,0.05);">88</td>
                <td style="padding: 12px; text-align: center; border-bottom: 1px solid rgba(255,255,255,0.05);">94</td>
                <td style="padding: 12px; text-align: center; border-bottom: 1px solid rgba(255,255,255,0.05);">96</td>
                <td style="padding: 12px; text-align: center; border-bottom: 1px solid rgba(255,255,255,0.05); color: var(--primary-color); font-weight: bold;">92.5</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    `,
  };

  mainContent.innerHTML =
    contenidos[id] ||
    `
    <div class="glass-effect">
      <h1>${id.charAt(0).toUpperCase() + id.slice(1)}</h1>
      <p>Contenido de la sección ${id} en desarrollo.</p>
    </div>
  `;
}

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const info = await cargarInfoProfesor();
    sidebarData.usuario.nombre = info.nombre;
    sidebarData.usuario.rol = info.rol;
  } catch (e) {
  }
  generarSidebar();
  configurarSidebarToggle();
  configurarNavegacion();
  cargarContenido("dashboard");
});

// Implementaciones desde la Base de Datos //

async function cargarContenidoCursos() {
  const mainContent = document.getElementById("mainContent");
  const profesorId = document.body.dataset.userid;
  console.log("ID del profesor obtenido del DOM:", profesorId); // <-- LOG 1

  let cursos = [];
  if (profesorId) {
    cursos = await cargarCursosDesdeAPI(profesorId);
    console.log("Cursos recibidos desde la API:", cursos); // <-- LOG 2
  } else {
    console.warn("No se encontró el ID del profesor en el DOM");
  }

  let cursosHTML = `
    <div class="glass-effect">
      <h1>Mis Cursos</h1>
      <p>Administre sus cursos actuales y revise el progreso de sus estudiantes.</p>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; margin-top: 20px;">
  `;
  if (cursos.length > 0) {
    cursosHTML += cursos
      .map(
        (curso) => `
      <div class="glass-effect" style="margin-bottom: 0;">
        <h3>${curso.title}</h3>
        <p>Código: ${curso.code}</p>
        <p>Estudiantes: ${curso.estudiantes || "-"}</p>
        <p>Progreso: ${curso.progreso || 0}%</p>
        <button style="background: var(--primary-color); border: none; color: white; padding: 8px 15px; border-radius: 4px; cursor: pointer;">Ver Detalles</button>
      </div>
    `
      )
      .join("");
  } else {
    cursosHTML += `<p>No tienes cursos asignados.</p>`;
  }
  cursosHTML += `</div></div>`;
  mainContent.innerHTML = cursosHTML;
}

// --- Funcion para cargar tarjeta de estadisticas dashboard

async function cargarEstadisticasDashboard(profesorId) {
  const response = await fetch(
    `/api/profesor/estadisticas?profesorId=${profesorId}`
  );
  if (!response.ok) throw new Error("No se pudo cargar las estadísticas");
  return await response.json();
}

// --- Funcion para cargar eventos de usuario

async function cargarEventosUsuario(userId) {
  const response = await fetch(`/api/eventos/usuario/${userId}`);
  if (!response.ok) throw new Error("No se pudo cargar los eventos");
  return await response.json();
}