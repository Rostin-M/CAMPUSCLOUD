package CampusCloud.controller;

import CampusCloud.model.User;
import CampusCloud.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.GetMapping;

import java.security.Principal;

@Controller
@RequestMapping
public class ProfesorController {

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/dashboard_profesor")
    public String dashboardProfesor(Model model, Principal principal) {
        User user = userRepository.findByEmail(principal.getName()).orElseThrow();
        model.addAttribute("nombreUsuario", user.getFirstName() + " " + user.getLastName());
        model.addAttribute("userId", user.getId());
        return "Profesor/dashboard_profesor";
    }
}