package TelemedApp.ac.rw.Telemed.modal;

import java.util.List;
import java.util.ArrayList;

public class SearchResult {
    private List<Patient> patients = new ArrayList<>();
    private List<Doctor> doctors = new ArrayList<>();
    private List<MedicalRecord> medicalRecords = new ArrayList<>();
    private List<Appointment> appointments = new ArrayList<>();

    // Getters and Setters
    public List<Patient> getPatients() {
        return patients;
    }

    public void setPatients(List<Patient> patients) {
        this.patients = patients;
    }

    public List<Doctor> getDoctors() {
        return doctors;
    }

    public void setDoctors(List<Doctor> doctors) {
        this.doctors = doctors;
    }

    public List<MedicalRecord> getMedicalRecords() {
        return medicalRecords;
    }

    public void setMedicalRecords(List<MedicalRecord> medicalRecords) {
        this.medicalRecords = medicalRecords;
    }

    public List<Appointment> getAppointments() {
        return appointments;
    }

    public void setAppointments(List<Appointment> appointments) {
        this.appointments = appointments;
    }
}
