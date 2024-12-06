package TelemedApp.ac.rw.Telemed.controller;

import TelemedApp.ac.rw.Telemed.modal.Appointment;
import TelemedApp.ac.rw.Telemed.modal.Doctor;
import TelemedApp.ac.rw.Telemed.modal.Patient;
import TelemedApp.ac.rw.Telemed.service.AppointmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping(value = "/api/appointments", produces = MediaType.APPLICATION_JSON_VALUE)
@CrossOrigin
public class AppointmentController {

    @Autowired
    private AppointmentService appointmentService;

    @GetMapping
    public List<Appointment> getAllAppointments() {
        return appointmentService.getAllAppointments();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Appointment> getAppointmentById(@PathVariable UUID id) {
        Appointment appointment = appointmentService.getAppointmentById(id);
        return appointment != null ? ResponseEntity.ok(appointment) : ResponseEntity.notFound().build();
    }

    @GetMapping("/patient/{patientId}")
    public List<Appointment> getAppointmentsByPatient(@PathVariable UUID patientId) {
        Patient patient = new Patient();
        patient.setId(patientId);
        return appointmentService.getAppointmentsByPatient(patient);
    }

    @GetMapping("/doctor/{doctorId}")
    public List<Appointment> getAppointmentsByDoctor(@PathVariable UUID doctorId) {
        Doctor doctor = new Doctor();
        doctor.setId(doctorId);
        return appointmentService.getAppointmentsByDoctor(doctor);
    }

    @GetMapping("/date/{date}")
    public List<Appointment> getAppointmentsByDate(@PathVariable String date) {
        return appointmentService.getAppointmentsByDate(date);
    }

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    public Appointment createAppointment(@RequestBody Appointment appointment) {
        return appointmentService.saveAppointment(appointment);
    }

    @PutMapping(value = "/{id}", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Appointment> updateAppointment(@PathVariable UUID id, @RequestBody Appointment appointment) {
        Appointment existingAppointment = appointmentService.getAppointmentById(id);
        if (existingAppointment == null) {
            return ResponseEntity.notFound().build();
        }
        appointment.setId(id);
        return ResponseEntity.ok(appointmentService.saveAppointment(appointment));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAppointment(@PathVariable UUID id) {
        Appointment existingAppointment = appointmentService.getAppointmentById(id);
        if (existingAppointment == null) {
            return ResponseEntity.notFound().build();
        }
        appointmentService.deleteAppointment(id);
        return ResponseEntity.ok().build();
    }
}
