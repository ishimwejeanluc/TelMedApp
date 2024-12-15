package TelemedApp.ac.rw.Telemed.controller;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import TelemedApp.ac.rw.Telemed.modal.User;
import TelemedApp.ac.rw.Telemed.service.AuthenticationService;
import TelemedApp.ac.rw.Telemed.service.TwoFactorAuthService;
import TelemedApp.ac.rw.Telemed.service.PatientService;
import TelemedApp.ac.rw.Telemed.modal.Patient;
import jakarta.mail.MessagingException;

import java.io.UnsupportedEncodingException;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin
public class AuthenticationController {

    private final AuthenticationService authenticationService;
    private final TwoFactorAuthService twoFactorAuthService;
    private final PatientService patientService;

    public AuthenticationController(AuthenticationService authenticationService, TwoFactorAuthService twoFactorAuthService, PatientService patientService) {
        this.authenticationService = authenticationService;
        this.twoFactorAuthService = twoFactorAuthService;
        this.patientService = patientService;
    }

    @PostMapping(value = "/login", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Map<String, Object>> login(@RequestBody Map<String, String> request) throws UnsupportedEncodingException, MessagingException {
        Map<String, Object> response = new HashMap<>();

        String email = request.get("email");
        String password = request.get("password");

        // Validate input
        if (email == null || email.trim().isEmpty() || password == null || password.trim().isEmpty()) {
            response.put("error", "Email and password are required");
            return ResponseEntity.badRequest().body(response);
        }

        try {
            User user = authenticationService.getUserByEmail(email);
            if (user == null || !authenticationService.checkPassword(user, password)) {
                response.put("error", "Invalid email or password");
                return ResponseEntity.badRequest().body(response);
            }

            // Generate and send OTP
            String otp = twoFactorAuthService.generateOTP(email);
            twoFactorAuthService.sendOtpEmail(email, otp);

            response.put("message", "OTP sent to your email");
            response.put("email", email); // Include email in response for OTP verification
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            response.put("error", "An error occurred during login: " + e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }

    @PostMapping(value = "/verify-otp", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Map<String, Object>> verifyOtp(@RequestBody Map<String, String> request) {
        Map<String, Object> response = new HashMap<>();

        String email = request.get("email");
        String otp = request.get("otp");

        // Validate input
        if (email == null || email.trim().isEmpty() || otp == null || otp.trim().isEmpty()) {
            response.put("error", "Email and OTP are required");
            return ResponseEntity.badRequest().body(response);
        }

        try {
            if (!twoFactorAuthService.verifyOTP(email, otp)) {
                response.put("error", "Invalid or expired OTP");
                return ResponseEntity.badRequest().body(response);
            }

            // Get user data
            User user = authenticationService.getUserByEmail(email);
            if (user == null) {
                response.put("error", "User not found");
                return ResponseEntity.badRequest().body(response);
            }
            
            // Create a map with only the user fields we want to send
            Map<String, Object> userResponse = new HashMap<>();
            userResponse.put("id", user.getId());
            userResponse.put("username", user.getUsername());
            userResponse.put("email", user.getEmail());
            userResponse.put("role", user.getRole());
            
            // Get associated patient data if user is a patient
            if ("PATIENT".equals(user.getRole())) {
                Patient patient = patientService.getPatientByUserId(user.getId());
                if (patient != null) {
                    response.put("patient", patient);
                    response.put("patientId", patient.getId());
                }
            }

            response.put("user", userResponse);
            response.put("message", "Login successful");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            response.put("error", "An error occurred during OTP verification: " + e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
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
