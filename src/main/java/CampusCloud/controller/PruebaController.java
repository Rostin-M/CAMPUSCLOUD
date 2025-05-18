package CampusCloud.controller;

import CampusCloud.model.Course;
import CampusCloud.repository.CourseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/prueba")
public class PruebaController {

    @Autowired
    private CourseRepository courseRepository;

    @GetMapping("/cursos")
    public List<Course> getAllCursos() {
        return courseRepository.findAll();
    }

    @GetMapping("/cursos/usuario/{userId}")
    public List<Course> getCursosByUsuario(@PathVariable Long userId) {
        return courseRepository.findByProfesorId(userId);
    }
}