package TelemedApp.ac.rw.Telemed.Configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import TelemedApp.ac.rw.Telemed.security.SHA256PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    
   @Bean
   public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
       http
           .csrf(csrf -> csrf.disable())
           .authorizeHttpRequests(authorize -> authorize
               .anyRequest().permitAll()  // Allow all requests
           )
           .formLogin(form -> form
               .loginPage("/api/login")
               .permitAll()
           )
           .logout(logout -> logout
               .permitAll()
           );
       return http.build();
   }

    @Bean
    public SHA256PasswordEncoder passwordEncoder() {
        return new SHA256PasswordEncoder();
    }
}
