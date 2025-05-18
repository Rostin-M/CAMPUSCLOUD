package CampusCloud.controller;

import CampusCloud.model.User;
import CampusCloud.model.Role;
import CampusCloud.repository.CourseRepository;
import CampusCloud.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/profesor")
public class ProfesorRestController {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private CourseRepository courseRepository;

    @GetMapping("/info")
    public Map<String, Object> getProfesorInfo(Principal principal) {
        Map<String, Object> data = new HashMap<>();
        if (principal == null) {
            data.put("nombre", "Desconocido");
            data.put("rol", "Desconocido");
            return data;
        }
        User user = userRepository.findByEmail(principal.getName()).orElse(null);
        if (user == null) {
            data.put("nombre", "Desconocido");
            data.put("rol", "Desconocido");
            return data;
        }
        data.put("nombre", user.getFirstName() + " " + user.getLastName());
        String roles = user.getRoles().stream()
                .map(Role::getName)
                .collect(Collectors.joining(", "));
        data.put("rol", roles);
        return data;
    }

    @GetMapping("/estadisticas")
    public Map<String, Object> getEstadisticasDashboard(@RequestParam Long profesorId) {
        return courseRepository.getDashboardStatsByProfesorId(profesorId);
    }
}