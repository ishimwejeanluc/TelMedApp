package TelemedApp.ac.rw.Telemed.controller;

import TelemedApp.ac.rw.Telemed.modal.Patient;
import TelemedApp.ac.rw.Telemed.service.PatientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping(value = "/api/patients", produces = MediaType.APPLICATION_JSON_VALUE)
@CrossOrigin
public class PatientController {

    @Autowired
    private PatientService patientService;

    @GetMapping
    public List<Patient> getAllPatients() {
        return patientService.getAllPatients();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Patient> getPatientById(@PathVariable UUID id) {
        Patient patient = patientService.getPatientById(id);
        return patient != null ? ResponseEntity.ok(patient) : ResponseEntity.notFound().build();
    }

    @GetMapping("/email/{email}" )
    public ResponseEntity<?> getPatientByEmail(@PathVariable String email) {
        Patient patient = patientService.getPatientByEmail(email);
        if (patient != null) {
            return ResponseEntity.ok(patient);
        } else {
            return ResponseEntity.notFound().build();
        }

    }

    @PostMapping(value="/savePatients", produces = MediaType.APPLICATION_JSON_VALUE ,consumes = MediaType.APPLICATION_JSON_VALUE)
    public Patient createPatient(@RequestBody Patient patient) {
        return patientService.savePatient(patient);
    }

    @PutMapping(value = "/{id}", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Patient> updatePatient(@PathVariable UUID id, @RequestBody Patient patient) {
        Patient existingPatient = patientService.getPatientById(id);
        if (existingPatient == null) {
            return ResponseEntity.notFound().build();
        }
        patient.setId(id);
        return ResponseEntity.ok(patientService.savePatient(patient));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePatient(@PathVariable UUID id) {
        Patient existingPatient = patientService.getPatientById(id);
        if (existingPatient == null) {
            return ResponseEntity.notFound().build();
        }
        patientService.deletePatient(id);
        return ResponseEntity.ok().build();
    }
}
