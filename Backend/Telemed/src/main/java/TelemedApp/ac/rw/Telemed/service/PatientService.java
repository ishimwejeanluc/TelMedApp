package TelemedApp.ac.rw.Telemed.service;

import TelemedApp.ac.rw.Telemed.modal.Patient;
import TelemedApp.ac.rw.Telemed.repository.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.UUID;

@Service
public class PatientService {
    
    @Autowired
    private PatientRepository patientRepository;

    public List<Patient> getAllPatients() {
        return patientRepository.findAll();
    }

    public Patient getPatientById(UUID id) {
        return patientRepository.findById(id).orElse(null);
    }

    public Patient getPatientByEmail(String email) {
        return patientRepository.findByEmail(email);
    }

    public Patient savePatient(Patient patient) {
        return patientRepository.save(patient);
    }

    public void deletePatient(UUID id) {
        patientRepository.deleteById(id);
    }
}
