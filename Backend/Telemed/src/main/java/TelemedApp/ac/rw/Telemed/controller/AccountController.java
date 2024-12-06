package TelemedApp.ac.rw.Telemed.controller;

import java.util.HashMap;
import java.util.Map;


import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import TelemedApp.ac.rw.Telemed.modal.AccountCreationRequest;
import TelemedApp.ac.rw.Telemed.modal.Gender;
import TelemedApp.ac.rw.Telemed.modal.Patient;
import TelemedApp.ac.rw.Telemed.modal.User;
import TelemedApp.ac.rw.Telemed.service.PatientService;
import TelemedApp.ac.rw.Telemed.service.UserService;

@RestController
@RequestMapping("/api/accounts")
public class AccountController {

    private final UserService userService;
    private final PatientService patientService;

    public AccountController(UserService userService, PatientService patientService) {
        this.userService = userService;
        this.patientService = patientService;
    }

    @PostMapping(value ="/createAccount" ,consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Map<String, Object>> createAccount(@RequestBody AccountCreationRequest request) {
        Map<String, Object> response = new HashMap<>();

        try {
            if (userService.getUserByEmail(request.getEmail()) != null) {
                response.put("error", "Email already exists");
                return ResponseEntity.badRequest().body(response);
            }
            User userObj = new User();
            userObj.setEmail(request.getEmail());
            userObj.setUsername(request.getUsername());
            userObj.setPassword(request.getPassword());
            userObj.setRole(request.getRole());

            User user = userService.saveUser(userObj);


            // 2. Create Patient with user ID as foreign key
            Patient patient = new Patient();
            patient.setName(request.getName());
            patient.setEmail(request.getEmail());
            patient.setPhone(request.getPhone());
            patient.setDateOfBirth(request.getDateOfBirth());
            patient.setGender(Gender.valueOf(request.getGender().toUpperCase()));
            patient.setAddress(request.getAddress());
            patient.setUser(user);

            patientService.savePatient(patient);

            response.put("message", "Account created successfully!");
            return ResponseEntity.ok(response);

        } catch (Exception e) {
            response.put("error", "An error occurred while creating the account.");
            return ResponseEntity.badRequest().body(response);
        }
    }
}
