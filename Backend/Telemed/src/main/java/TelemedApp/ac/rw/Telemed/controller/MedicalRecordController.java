package TelemedApp.ac.rw.Telemed.controller;

import TelemedApp.ac.rw.Telemed.modal.MedicalRecord;
import TelemedApp.ac.rw.Telemed.modal.Patient;
import TelemedApp.ac.rw.Telemed.service.MedicalRecordService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.UUID;

@RestController
@CrossOrigin
@RequestMapping(value = "/api/medical-records", produces = MediaType.APPLICATION_JSON_VALUE)
public class MedicalRecordController {

    @Autowired
    private MedicalRecordService medicalRecordService;

    @GetMapping
    public List<MedicalRecord> getAllMedicalRecords() {
        return medicalRecordService.getAllMedicalRecords();
    }

    @GetMapping("/{id}")
    public ResponseEntity<MedicalRecord> getMedicalRecordById(@PathVariable UUID id) {
        MedicalRecord medicalRecord = medicalRecordService.getMedicalRecordById(id);
        return medicalRecord != null ? ResponseEntity.ok(medicalRecord) : ResponseEntity.notFound().build();
    }

    @GetMapping("/patient/{patientId}")
    public List<MedicalRecord> getMedicalRecordsByPatient(@PathVariable UUID patientId) {
        Patient patient = new Patient();
        patient.setId(patientId);
        return medicalRecordService.getMedicalRecordsByPatient(patient);
    }

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    public MedicalRecord createMedicalRecord(@RequestBody MedicalRecord medicalRecord) {
        return medicalRecordService.saveMedicalRecord(medicalRecord);
    }

    @PutMapping(value = "/{id}", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<MedicalRecord> updateMedicalRecord(@PathVariable UUID id, @RequestBody MedicalRecord medicalRecord) {
        MedicalRecord existingRecord = medicalRecordService.getMedicalRecordById(id);
        if (existingRecord == null) {
            return ResponseEntity.notFound().build();
        }
        medicalRecord.setId(id);
        return ResponseEntity.ok(medicalRecordService.saveMedicalRecord(medicalRecord));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMedicalRecord(@PathVariable UUID id) {
        MedicalRecord existingRecord = medicalRecordService.getMedicalRecordById(id);
        if (existingRecord == null) {
            return ResponseEntity.notFound().build();
        }
        medicalRecordService.deleteMedicalRecord(id);
        return ResponseEntity.ok().build();
    }
}
