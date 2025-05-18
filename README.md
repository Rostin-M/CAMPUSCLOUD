# 🌩️ CampusCloud

**CampusCloud** es una plataforma web para la gestión académica universitaria, desarrollada con **Java 21**, **Spring Boot**, **Spring Security** y **PostgreSQL** en un proyecto Maven. Su objetivo es facilitar la administración de cursos, usuarios, tareas, calificaciones y otros procesos académicos.

---

## 📁 Estructura del Proyecto

```plaintext
CampusCloud/
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── CampusCloud/
│   │   │       ├── config/        # Configuración y beans de Spring
│   │   │       ├── controller/    # Controladores REST y MVC
│   │   │       ├── model/         # Entidades JPA y clases de dominio
│   │   │       ├── repository/    # Repositorios Spring Data JPA
│   │   │       ├── security/      # Configuración y utilidades de seguridad
│   │   │       └── service/       # Lógica de negocio y servicios
│   │   └── resources/
│   │       ├── db/
│   │       │   └── init/          # Scripts SQL de inicialización
│   │       ├── static/
│   │       │   ├── css/           # Hojas de estilo
│   │       │   ├── images/        # Recursos gráficos
│   │       │   └── js/            # Scripts JavaScript
│   │       └── templates/
│   │           └── Profesor/      # Vistas Thymeleaf del panel docente
│   └── test/
│       └── java/
│           └── CampusCloud/       # Pruebas unitarias e integración
```

---

## ⚙️ Tecnologías y Dependencias

- **Backend:** Spring Boot 3, Spring Security, Spring Data JPA, Flyway, DevTools
- **Base de Datos:** PostgreSQL
- **Autenticación:** Bcrypt, gestión de roles (Admin, Profesor, Estudiante)
- **Frontend:** HTML5, CSS3, JavaScript, Thymeleaf
- **Documentación API:** Swagger
- **Build & Run:** Maven Wrapper, Java 21+

---

## 🚀 Puesta en Marcha

1. **Configura la base de datos** en `src/main/resources/application.properties`:

    ```properties
    spring.datasource.url=jdbc:postgresql://<host>:5432/<db>?sslmode=require
    spring.datasource.username=<user>
    spring.datasource.password=<pass>
    ```

2. **Inicializa los esquemas** con `src/main/resources/db/init/init.sql`.

3. **Instala y compila** el proyecto:

    ```bash
    ./mvnw clean install
    ```

4. **Ejecuta** la aplicación:

    ```bash
    ./mvnw spring-boot:run
    ```

---

## 🎯 Funcionalidades Destacadas

- **Login y roles:** Redirección automática según rol (Admin, Profesor, Estudiante).
- **Dashboard de Profesor:** Sidebar dinámico, gestión de cursos, calendario académico, maquetas de calificaciones y asistencia.
- **API REST:** Endpoints para cursos, usuarios y eventos; documentación con Swagger.
- **UI moderna:** Diseño minimalista, efecto glass, responsive; carga dinámica vía JS.

---

## 🔒 Licencia y Uso

**Queda estrictamente prohibida** su copia, distribución, modificación o uso comercial sin autorización previa y por escrito.

2025 © Rostin Santiago Alzate Montoya
