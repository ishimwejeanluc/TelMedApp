package TelemedApp.ac.rw.Telemed.modal;

import jakarta.persistence.*;
import java.util.UUID;

@Entity(name = "users")
public class User {
    @Id
    private UUID id = UUID.randomUUID();  // Generate a random UUID for each instance
    private String username;
    private String password;
    private String role;
    private String email;

    // Getters and Setters
    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
