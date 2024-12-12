package TelemedApp.ac.rw.Telemed.repository;

import TelemedApp.ac.rw.Telemed.modal.Doctor;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.UUID;
import java.util.List;

public interface DoctorRepository extends JpaRepository<Doctor, UUID> {
    Doctor findByEmail(String email);
    Doctor findByLicenseNumber(String licenseNumber);
    List<Doctor> findBySpecialization(String specialization);
}
