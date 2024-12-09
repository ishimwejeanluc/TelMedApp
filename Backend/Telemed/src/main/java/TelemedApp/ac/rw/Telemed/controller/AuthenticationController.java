package TelemedApp.ac.rw.Telemed.controller;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import TelemedApp.ac.rw.Telemed.modal.User;
import TelemedApp.ac.rw.Telemed.service.AuthenticationService;
import TelemedApp.ac.rw.Telemed.service.TwoFactorAuthService;
import jakarta.mail.MessagingException;

import java.io.UnsupportedEncodingException;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthenticationController {

    private final AuthenticationService authenticationService;
    private final TwoFactorAuthService twoFactorAuthService;

    public AuthenticationController(AuthenticationService authenticationService, TwoFactorAuthService twoFactorAuthService) {
        this.authenticationService = authenticationService;
        this.twoFactorAuthService = twoFactorAuthService;
    }

    @PostMapping(value = "/login", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Map<String, Object>> login(@RequestBody Map<String, String> request) throws UnsupportedEncodingException, MessagingException {
        Map<String, Object> response = new HashMap<>();

        String email = request.get("email");
        String password = request.get("password");

        User user = authenticationService.getUserByEmail(email);
        if (user == null || !authenticationService.checkPassword(user, password)) {
            response.put("error", "Invalid email or password");
            return ResponseEntity.badRequest().body(response);
        }

        // Generate and send OTP
        String otp = twoFactorAuthService.generateOTP(email);
        twoFactorAuthService.sendOtpEmail(email, otp);

        response.put("message", "OTP sent to your email");
        return ResponseEntity.ok(response);
    }

    @PostMapping(value = "/verify-otp", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Map<String, Object>> verifyOtp(@RequestBody Map<String, String> request) {
        Map<String, Object> response = new HashMap<>();

        String email = request.get("email");
        String otp = request.get("otp");

        if (!twoFactorAuthService.verifyOTP(email, otp)) {
            response.put("error", "Invalid OTP");
            return ResponseEntity.badRequest().body(response);
        }

        // Retrieve user data and send as JSON
        User user = authenticationService.getUserByEmail(email);
        response.put("user", user); // Assuming User has a proper toJSON method or similar
        response.put("message", "Login successful");
        return ResponseEntity.ok(response);
    }

    @PostMapping(value = "/request-otp", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Map<String, Object>> requestOtp(@RequestBody Map<String, String> request) {
        Map<String, Object> response = new HashMap<>();

        String email = request.get("email");
        User user = authenticationService.getUserByEmail(email);
        if (user == null) {
            response.put("error", "User not found");
            return ResponseEntity.badRequest().body(response);
        }

        String otp = twoFactorAuthService.generateOTP(email);
        response.put("otp", otp); // For demonstration purposes, we return it in the response
        return ResponseEntity.ok(response);
    }
}
