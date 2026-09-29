# CampusCloud

**CampusCloud** es una plataforma web para la gestión académica universitaria, desarrollada con **Java 21**, **Spring Boot 3**, **Spring Security** y **PostgreSQL** en un proyecto Maven. Su objetivo es facilitar la administración de cursos, usuarios, tareas, calificaciones y otros procesos críticos en la Universidad de Medellín, con especial foco en mejorar la experiencia del docente.

---

## Introducción

En la Universidad de Medellín, el sistema basado en Moodle ha cumplido su función, pero presenta fallas que afectan principalmente al rol del docente:

- Dificultad para registrar asistencias de forma rápida y confiable.
- Gestión desorganizada de tareas, eventos y calificaciones.
- Interfaz anticuada poco intuitiva y no adaptada a la dinámica docente.
- Seguridad mínima al iniciar sesión, con CAPTCHAs invasivos que bloquean accesos legítimos.
- Falta de automatización en notificaciones y recordatorios académicos.

**CampusCloud** propone una solución moderna y segura que:

1. Integra un **login con reCAPTCHA menos invasivo** y control de roles (Admin, Profesor, Estudiante).
2. Ofrece un **dashboard docente** donde se visualiza en un solo lugar el resumen de cursos, tareas, eventos, calificaciones y asistencias.
3. Automatiza la **toma de asistencia** y la **gestión de calificaciones**.
4. Incluye un **calendario académico** con eventos personalizables y notificaciones por correo.
5. Permite a los desarrolladores y administradores extraer reportes de manera centralizada y confiable.

---

## Estructura del Proyecto

```plaintext
CampusCloud/
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── CampusCloud/
│   │   │       ├── config/        # Configuración de Spring Security (SecurityConfig)
│   │   │       ├── controller/    # Controladores MVC y REST (Admin, Auth, Course, Dashboard, Estudiante, Profesor, ProfesorRest, Role, UserEventsRest)
│   │   │       ├── model/         # Entidades JPA (User, Role, Course, AcademicEvent, Attendance, UserEvent)
│   │   │       ├── repository/    # Repositorios Spring Data JPA
│   │   │       ├── security/      # CustomUserDetails y RecaptchaFilter
│   │   │       └── service/       # Lógica de negocio (Auth, User, Role, Course) y envío de correo (email/)
│   │   └── resources/
│   │       ├── db/init/           # Script SQL de inicialización (init.sql)
│   │       ├── static/            # CSS, JavaScript e imágenes
│   │       ├── templates/         # Vistas Thymeleaf (login, dashboards y panel Profesor/)
│   │       ├── application.properties
│   │       └── logback-spring.xml
│   └── test/java/CampusCloud/     # Prueba de carga del contexto de Spring
├── k8s/                           # Manifiestos de Kubernetes (deployment.yaml, service.yaml)
├── Dockerfile                     # Build multi-etapa (Maven + JRE 21)
├── docker-compose.yaml            # PostgreSQL + ELK para entorno local
├── logstash.conf                  # Configuración de Logstash
├── .env.example                   # Plantilla de variables de entorno
└── pom.xml                        # Configuración de Maven
```

---

## Tecnologías y Dependencias

**Lenguaje y Build:**

- Java 21
- Maven 3.9+

**Backend:**

- Spring Boot 3
- Spring Security
- Spring Data JPA
- Spring Boot Starters (Web, Thymeleaf, Validation, Quartz, OAuth2 Resource Server, Mail, Actuator, Data JPA, OAuth2 Client, OAuth2 Authorization Server)
- Swagger / Springdoc OpenAPI (documentación API)
- BCrypt (hash de contraseñas)
- Jakarta Mail (envío de correos)
- Logback + Logstash Encoder (logging)
- Lombok (solo en desarrollo)
- DevTools (solo en desarrollo)

**Base de Datos:**

- PostgreSQL (Neon en producción, driver JDBC)
- Esquema inicial con `db/init/init.sql` (Flyway está desactivado)

**Frontend:**

- HTML5
- CSS3
- JavaScript (ES6+)
- Thymeleaf (motor de plantillas)
- Google reCAPTCHA v2 (protección de formularios)

**Integraciones y APIs:**

- Google API Client
- Google OAuth Client

**Contenedores y Orquestación:**

- Docker (Dockerfile, construcción de imágenes)
- Docker Compose (docker-compose.yaml)
- Kubernetes (manifiestos en k8s/)
- Minikube (entorno local Kubernetes)
- Docker Hub (registro de imágenes)
- Render (hosting en producción)

**Control de Versiones y CI/CD:**

- Git
- GitHub
- Docker Hub

**Testing y Logging:**

- JUnit + Spring Security Test
- Logstash (configuración para logs)

---

## Puesta en Marcha (local)

Requisitos: Java 21, Maven 3.9+ y PostgreSQL (o Docker).

1. **Variables de entorno.** Copia `.env.example` a `.env` y ajusta los valores. La aplicación lee:

    | Variable | Descripción | Valor por defecto |
    |---|---|---|
    | `SPRING_DATASOURCE_URL` | URL JDBC de PostgreSQL | `jdbc:postgresql://localhost:5432/campuscloud` |
    | `SPRING_DATASOURCE_USERNAME` | Usuario de la base de datos | (obligatoria) |
    | `SPRING_DATASOURCE_PASSWORD` | Contraseña de la base de datos | (obligatoria) |
    | `RECAPTCHA_SECRET` | Clave secreta de Google reCAPTCHA v2 | (vacío) |
    | `PORT` | Puerto HTTP | `8080` |

2. **Base de datos.** Levanta PostgreSQL con Docker Compose (ejecuta `init.sql` automáticamente):

    ```bash
    docker compose up -d db
    ```

    Si usas otra instancia, ejecuta manualmente `src/main/resources/db/init/init.sql`.

3. **Ejecuta** la aplicación:

    ```bash
    mvn spring-boot:run
    ```

    O genera el JAR y córrelo:

    ```bash
    mvn clean package
    java -jar target/CampusCloud-0.0.1-SNAPSHOT.jar
    ```

4. **(Opcional) Kubernetes con Minikube:**

    ```bash
    minikube start
    kubectl apply -f k8s/
    ```

---

## Despliegue en producción (Render + Neon)

1. **Neon:** crea un proyecto PostgreSQL y ejecuta `src/main/resources/db/init/init.sql` en el SQL Editor.
2. **Render:** crea un *Web Service* conectado a este repositorio con runtime **Docker** (usa el `Dockerfile` de la raíz).
3. Configura las variables de entorno en Render:

    ```properties
    SPRING_DATASOURCE_URL=jdbc:postgresql://<host-neon>/<db>?sslmode=require
    SPRING_DATASOURCE_USERNAME=<usuario-neon>
    SPRING_DATASOURCE_PASSWORD=<password-neon>
    RECAPTCHA_SECRET=<clave-secreta-recaptcha>
    ```

4. Agrega el dominio `*.onrender.com` a los dominios permitidos de la clave de reCAPTCHA en la consola de Google.

Render asigna el puerto mediante la variable `PORT`, que la aplicación ya respeta.

---

## Funcionalidades Destacadas

### Login y roles

- Autenticación con reCAPTCHA de Google y redirección según rol (Admin, Profesor, Estudiante).
- Gestión de sesiones segura con Spring Security.

### Dashboard de Profesor

- Sidebar dinámico con rutas a:
  - Mis Cursos (vista + filtros)
  - Eventos Académicos (calendario interactivo, creación/edición)
  - Calificaciones (listado, filtros, estadísticas, exportación a Excel)
  - Asistencia (toma de asistencia, filtros, exportación, carga al sistema)
- Vista de resumen: entregas recientes de estudiantes, mensajes, próximos eventos.

### API REST Documentada

- Endpoints en `/api/` para gestión de cursos, roles, usuarios y eventos.
- Documentación automática con Swagger UI en `/swagger-ui.html`.

### UI Moderna y Responsive

- Diseño minimalista con efecto glass en paneles.
- Compatible con dispositivos móviles.
- Carga de datos vía JavaScript y fetch (calendario, tablas, filtros).

### Integración de Correo

- Envío de notificaciones automáticas por Gmail API.
- Plantillas con logo institucional y firma.

---

## Conclusiones

1. CampusCloud unifica y mejora la experiencia del docente, centralizando gestión de cursos, eventos, calificaciones y asistencia en un solo lugar.
2. Docker y Minikube facilitaron el despliegue local, simulando entornos de producción y garantizando portabilidad.
3. Git y GitHub me enseñaron la importancia del versionamiento, algo que aunque no era mi parte favorita, ahora sé que es esencial para controlar cambios y colaborar.

---

## Licencia y Uso

Queda estrictamente prohibida la copia, distribución, modificación o uso comercial de este proyecto sin autorización previa y por escrito.

2025 © Rostin Santiago Alzate Montoya
