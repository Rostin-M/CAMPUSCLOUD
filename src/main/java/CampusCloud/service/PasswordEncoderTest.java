package CampusCloud.service;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class PasswordEncoderTest {
    public static void main(String[] args) {

        // Verificar version de el encriptador

        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        String rawPassword = "123456";
        String encodedPassword = encoder.encode(rawPassword);
        System.out.println(encodedPassword);
    }
}