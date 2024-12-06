package TelemedApp.ac.rw.Telemed.repository;

import TelemedApp.ac.rw.Telemed.modal.MedicalRecord;
import TelemedApp.ac.rw.Telemed.modal.Patient;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.UUID;

public interface MedicalRecordRepository extends JpaRepository<MedicalRecord, UUID> {
    List<MedicalRecord> findByPatient(Patient patient);
}
