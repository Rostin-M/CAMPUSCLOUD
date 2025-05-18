package CampusCloud.controller;

import CampusCloud.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/login")
    public String login(@RequestParam("username") String email,
                        @RequestParam("password") String password,
                        Model model) {
        boolean isAuthenticated = authService.authenticate(email, password);

        if (isAuthenticated) {
            return "redirect:/dashboard";
        } else {
            model.addAttribute("error", "Credenciales incorrectas. Por favor, inténtalo de nuevo.");
            return "login";
        }
    }

    @GetMapping("/login")
    public String loginPage() {
        return "login";
    }

}