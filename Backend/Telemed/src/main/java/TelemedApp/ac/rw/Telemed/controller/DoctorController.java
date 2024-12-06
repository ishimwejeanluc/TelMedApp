package TelemedApp.ac.rw.Telemed.controller;

import TelemedApp.ac.rw.Telemed.modal.Doctor;
import TelemedApp.ac.rw.Telemed.service.DoctorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping(value = "/api/doctors")
@CrossOrigin
public class DoctorController {

    @Autowired
    private DoctorService doctorService;

    @GetMapping
    public List<Doctor> getAllDoctors() {
        return doctorService.getAllDoctors();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Doctor> getDoctorById(@PathVariable UUID id) {
        Doctor doctor = doctorService.getDoctorById(id);
        return doctor != null ? ResponseEntity.ok(doctor) : ResponseEntity.notFound().build();
    }

    @GetMapping("/email/{email}")
    public ResponseEntity<Doctor> getDoctorByEmail(@PathVariable String email) {
        Doctor doctor = doctorService.getDoctorByEmail(email);
        return doctor != null ? ResponseEntity.ok(doctor) : ResponseEntity.notFound().build();
    }

    @GetMapping("/license/{licenseNumber}")
    public ResponseEntity<Doctor> getDoctorByLicenseNumber(@PathVariable String licenseNumber) {
        Doctor doctor = doctorService.getDoctorByLicenseNumber(licenseNumber);
        return doctor != null ? ResponseEntity.ok(doctor) : ResponseEntity.notFound().build();
    }

    @PostMapping(value="/registerDoctor", produces= MediaType.APPLICATION_JSON_VALUE , consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> createDoctor(@RequestBody Doctor doctor) {
        if (doctorService.getDoctorByEmail(doctor.getEmail()) != null) {
            return ResponseEntity.badRequest().body("Doctor Already exists");
        }
        return ResponseEntity.ok(doctorService.saveDoctor(doctor));
    }

    @PutMapping(value = "/{id}", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Doctor> updateDoctor(@PathVariable UUID id, @RequestBody Doctor doctor) {
        Doctor existingDoctor = doctorService.getDoctorById(id);
        if (existingDoctor == null) {
            return ResponseEntity.notFound().build();
        }
        doctor.setId(id);
        return ResponseEntity.ok(doctorService.saveDoctor(doctor));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDoctor(@PathVariable UUID id) {
        Doctor existingDoctor = doctorService.getDoctorById(id);
        if (existingDoctor == null) {
            return ResponseEntity.notFound().build();
        }
        doctorService.deleteDoctor(id);
        return ResponseEntity.ok().build();
    }
}
