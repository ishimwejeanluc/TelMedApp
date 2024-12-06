package TelemedApp.ac.rw.Telemed.repository;

import TelemedApp.ac.rw.Telemed.modal.TestResult;
import TelemedApp.ac.rw.Telemed.modal.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.UUID;

public interface TestResultRepository extends JpaRepository<TestResult, UUID> {
    List<TestResult> findByAppointment(Appointment appointment);
}
